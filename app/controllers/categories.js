var Categories = require('../models/categories');
var Comment = require('../models/comment');
var Movie = require('../models/movie');
var _ = require('underscore');
var async = require('async');

// 添加分类页
exports.add = function(req, res) {
  res.render('pages/add-category', {
		title: '添加分类',
		categories: {},
  });
};

// 存储分类
exports.save = function(req, res) {
	var id = req.body._id;
  var _category = req.body;
  var category = new Categories(_category);

  // console.log("category::",category);
  if (id) {
  	console.log('更新分类!');
  	Categories.findById(id, function(err, categories) {
  		if(err) {
				console.log(err);
	 		}

	 		var _categories = _.extend(categories, _category);

	 		_categories.save(function(err, category) {
	 			if (err) {
		  		console.log(err);
				}

				res.json({ "status": true, });
	 		});
  	});
  } else {
  	console.log('新增分类!');
	  category.save(function(err, category) {
			if (err) {
			  console.log(err);
			}

			res.json({ "status": true, });
			// res.redirect("/admin/#/movie-manage");
	  });
  }
};

// 分类列表
exports.list = function(req, res) {
  Categories.fetch(function(err, categories) {
		if (err) {
		  console.log(err);
		}

		res.render('pages/category-list', {
		  title: '电影分类',
		  categories: categories,
		});
  });
};

// 分类数据
exports.categoriesCountData = function(req, res) {
	// console.log("req.body:", req.body);
	Categories.fetch(function(err, categories) {
		if (err) {
		  console.log(err);
		}

		// console.log("categories:", categories);
		res.json({ "data": categories, "status": 1, });
  });
};

// 分类点击量
exports.categoriesClickData = function(req, res) {
	// console.log("req.body:", req.body);
  Categories.find({})
  .populate({ path: 'movies' })
  .exec(function(err, categories) {
  	var lenCat = categories.length;
  	var clickNum = [];

  	for (var i = 0; i < lenCat; ++i) {
	  	// console.log('categories.movies:', categories[i].movies);
	  	var lenMovie = categories[i].movies.length;
	  	var singleCat = {};
			var countPv = 0;

			singleCat.name = categories[i].name;
	  	for (var j = 0; j < lenMovie; ++j) {
	  		var movie = categories[i].movies[j];

	  		if (movie && movie.pv) {
					countPv += movie.pv;
				}
	  	}

	  	singleCat.countPv = countPv;
	  	clickNum.push(singleCat);
  	};
  	// console.log(clickNum);
  	res.json({ "data": clickNum, "status": 1, });
  });
};

// 分类平均分
exports.categoriesAverageScoreData = function(req, res) {
	Categories.find({})
  .populate({ path: 'movies' })
  .exec(function(err, categories) {
  	var lenCat = categories.length;
  	var catAveScore = [];

  	for (var i = 0; i < lenCat; ++i) {
	  	// console.log('categories.movies:', categories[i].movies);
	  	var lenMovie = categories[i].movies.length;
	  	var singleCat = {};
	  	var sumScore = 0;

			singleCat.name = categories[i].name;
	  	for (var j = 0; j < lenMovie; ++j) {
	  		var movie = categories[i].movies[j];

	  		if (movie.score.average) {
	  			sumScore += movie.score.average;
	  		}
	  	}

	  	singleCat.sumScore = sumScore;
	  	catAveScore.push(singleCat);
	  }
	  // console.log(catAveScore);
  	res.json({ "data": catAveScore, "status": 1, });
  });
};

// 分类评论量
exports.categoriesCommentCountData = function(req, res) {
	Categories.find({})
  .populate({ path: 'movies', })
  .exec(function(err, categories) {
  	var lenCat = categories.length;
  	var catCommentCount = [];
  	// console.log(categories);
  	async.mapSeries(categories, function(item, callback) {
  		// if (item.name == '战争')
	  	// console.log('categories.movies:', item);
	  	var lenMovie = item.movies.length;
	  	console.log("lenMovie", lenMovie);
	  	var singleCat = {};
	  	var commentCount = 0;

			singleCat.name = item.name;
	  	async.mapSeries(item.movies, function(movie, callback) {
	  		Comment
		  	.find({ movie: movie.id })
		  	.exec(function(err, comment) {
		  		console.log("comment",comment);
		  		if (err) {
		  			console.log(err);
		  		}

		  		if (comment.length) {
		  			commentCount++;
		  		}

			  	callback(null, commentCount);
		  	});
	  	}, function(err, results) {
	  		// console.log('results', results);
	  		if (err) {
		  		console.log('movie', err);
	  		}

	  		var maxx = 0;
	  		for (var i = 0; i < results.length; ++i) {
	  			if (results[i] > maxx) {
	  				maxx = results[i];
	  			}
	  		}

		  	singleCat.commentCount = maxx;
		  	catCommentCount.push(singleCat);
		  	// console.log("catCommentCount", results);
		  	callback(null, catCommentCount);
  		});

	  }, function(err, results) {
	  	if (err) {
	  		console.log('item', err);
  		}

  		var categoriesCount = [];
  		var len = results.length
  		// console.log("results",results[len-1]);
	  	res.json({ "data": results[len-1], "status": 1, });
	  });
  });
};

// 删除分类
exports.del = function(req, res) {
  var id = req.query.id;

  console.log("delete-categroy id:", id);

  if (id) {
  	Movie.remove({categories:id}, function(err, movie) {
	  	if (err) {
				console.log(err);
	  	}
		});

		Categories.remove({_id: id}, function(err, movie) {
	  	if (err) {
				console.log(err);
	  	} else {
				res.json({ "success": 1, });
	  	}
		});
  }
};

// 更新操作
exports.update = function(req, res) {
  var id = req.params.id;

  if (id) {
		Categories.findById(id, function(err, categories) {
			// console.log("categories",categories);
			res.render('pages/add-category', {
		  	title: '更新分类',
		  	categories: categories,
			});
	  });
  }
};

// 电影分类
exports.allCategories = function(req, res) {
	Categories.find({}, function(err, categories) {
		res.json({ "status": 1, "data": categories, });
	});
};
