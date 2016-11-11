var Movie = require("../models/movie");
var Comment = require("../models/comment");
var _ = require("underscore");
var Categories = require("../models/categories");
var fs = require("fs");
var path = require("path");

exports.detail = function(req,res) {//详情页
  var id = req.params.id;

  //加统计量
  Movie.update({_id:id},{$inc:{pv:1}}, function(err) {
	if (err) {
	  console.log(err);
	};
  });
	
  Movie.findById(id,function(err, movie) {
	if (err) {
	  console.log(err);
	};

  Comment
	.find({movie: id})
	.populate("from","name")
	.populate("reply.from reply.to","name")
	.exec(function(err, comment) {
	  if (err) {
		console.log(err);
	  };
	  res.render("pages/movie-detail", {
		title:"imooc 详情页",
		movie:movie,
		comment:comment
	  });
	});	
  });
};

exports.movieManage = function (req, res) {
  console.log('runing movieManage');
  res.render("includes/movie-manage-right-nav", {

  });
};

exports.addMovie = function (req, res) {
  Categories.find({}, function(err, categories) {
	res.render("pages/add-movie", {
	  title: "添加电影",
	  categories: categories,
	  movie: {}
	});
  });	
};

//更新操作
exports.update = function(req, res) {
  var id = req.params.id;
  if (id) {
	Movie.findById(id, function(err, movie) {
	  Categories.find({}, function(err,categories) {
		res.render("pages/admin", {
		  title: "更新操作",
		  movie: movie,
		  categories: categories
		});
	  });
	});
  };
};

exports.savePoster = function(req, res, next) {
  // console.log('req.files:',req.files);//打印文件的信息
  var posterData = req.files.uploadPoster;

  var filePath = posterData.path;//文件的路径
  var originalFilename = posterData.originalFilename;//拿到文件的名字
  if (originalFilename) {
	fs.readFile(filePath, function(err,data) {
	  var timestamp = Date.now();//时间戳
	  var type = posterData.type.split("/")[1];
	  var poster = timestamp+"."+type;
	  var newPath = path.join(__dirname,"../../","public/images/poster/"+poster);//设置新的存储的路径。
	  fs.writeFile(newPath,data,function(err) {
		req.poster = poster;
		next();
	  });
	});
  } else {
	next();
  }	
};

//后台录入存储
exports.save = function(req, res) {
  // console.log('movie_req123------------:',req.body);
  var id = req.body.movie._id;
  var movieObj = req.body.movie;
  var _movie;
  var categoryId = movieObj.categories;

  if (req.poster) {
	movieObj.poster = req.poster; 
  }

  if (id) {
	Movie.findById(id, function(err,movie) {
	  if(err) {
		console.log(err);
	  }
	  Categories.update({_id:movie.categories}, {$pullAll:{"movies":[id]}}, function(err) {
		_movie = _.extend(movie, movieObj);
		_movie.save(function(err, movie) {
		  if(err) {
			console.log(err);
		  }
		  Categories.update({_id:categoryId}, {$addToSet:{"movies":id}}, function(err) {
		  	res.redirect("/movie/"+movie._id);
		  });
		});
	  });
	});
  } else {
	_movie = new Movie(movieObj);
	var categoriesName = movieObj.categoriesName;
	_movie.save(function(err, movie) {
	  if (err) {
		console.log("新数据保存",err);
	  }
	  if (categoryId) {
		Categories.findById(categoryId,function(err,categories) {
		  if (err) {
			console,log(err);
		  };
		  categories.movies.push(movie._id);
		  categories.save(function(err,categories) {
			if (err) {
			  console,log(err);
			};
			res.redirect("/movie/"+ movie._id);
		  });
		});
	  } else if (categoriesName) {
		var category = new Categories({
		  name:categoriesName,
		  movies:[movie._id]
		});
		category.save(function(err,category) {
		  if (err) {
			console.log(err);
		  };
		  movie.categories = category._id;
		  movie.save(function(err,movie) {
			if (err) {
			  console.log(err);
			};
			res.redirect("/movie/"+ movie._id);
		  });
		});
	  };	
	});
  };
};

//电影列表
exports.list = function(req, res) {
  Movie.fetch(function(err,movies) {
	if (err) {
	  console.log(err);
	}
	res.render("pages/movie-list", {
	  title: "查看电影",
	  movies: movies
	});
  });	
};

//删除
exports.del = function(req, res) {
  console.log("del-movie");
  var id = req.query.id;
  if (id) {
	Movie.remove({_id:id}, function(err, movie) {
	  if (err) {
		console.log(err);
	  } else {
		res.json({success: 1});
	  }
	});
  }
};
