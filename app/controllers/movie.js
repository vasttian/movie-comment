var Movie = require("../models/movie");
var Comment = require("../models/comment");
var Categories = require("../models/categories");
var _ = require("underscore");
var fs = require("fs");
var path = require("path");
var moment = require('moment');

// 电影详情页
exports.detail = function(req, res) {
	console.log('电影详情!');
	var id = req.params.id;
	var user = req.session.user;
	console.log('req::', req.body);
	console.log('user::', req.session.user);

  // 加入统计量
  Movie.update({ _id: id, }, { $inc:{ pv: 1, } }, function(err) {
  	if (err) {
  		console.log(err);
  	}
  });

  Movie.findById(id, function(err, movie) {
  	if (err) {
  		console.log(err);
  	}

  	// from、reply.from、reply.to 指定要填充的关联字段 (schemas中ref)
  	// name avatar 指定要填充（新增Comment.from.name Comment.from.avatar Comment.reply.to.name
  	// Comment.reply.to.avatar）Comment.from、Comment.reply.from、Comment.reply.to的name avatar字段
  	// 评论和回复只有两层，避免层次嵌套。默认按照评论和回复时间排序
  	Comment
  	.find({ movie: id, })
  	.populate({ path: 'from', select: 'name avatar', })
  	.populate({ path: 'reply.from reply.to', select: 'name avatar', })
  	.exec(function(err, comment) {
  		if (err) {
  			console.log(err);
  		}

  	  // console.log('movie_movie',movie);
  	  // console.log('comment_comment',comment);
  	  var len = movie.scoreUsers.length;
  	 	var score = '';

  	  if (user) {
	  	  for (var i = 0; i < len; ++i) {
	  	  	if (movie.scoreUsers[i].userId == user._id) {
	  	  		score = movie.scoreUsers[i].score;
	  	  		break;
	  	  	}
	  	  };
  	  }
  	  // console.log("comment",comment);
  	  // console.log("comment[0].reply",comment[0].reply);
  	  res.render('pages/movie-detail', {
  	  	title: '电影详情',
  	  	movie: movie,
  	  	comment: comment,
  	  	score: score,
  	  });
  	});
  });
};

// 电影管理右侧操作栏
exports.movieManage = function (req, res) {
  console.log('runing movieManage');
  res.render('includes/movie-manage-right-nav', {
  });
};

// 添加电影页
exports.addMovie = function (req, res) {
  Categories.find({}, function(err, categories) {
		res.render('pages/add-movie', {
	  	title: '添加电影',
	  	categories: categories,
	  	movie: {}
		});
  });
};

// 更新操作
exports.update = function(req, res) {
  var id = req.params.id;

  if (id) {
		Movie.findById(id, function(err, movie) {
	  	Categories.find({}, function(err, categories) {
				res.render('pages/add-movie', {
		  		title: '更新电影',
		  		movie: movie,
		  		categories: categories,
				});
	  	});
		});
  } else {
  	res.redirect('/');
  }
};

// 上传海报
exports.savePoster = function(req, res, next) {
	// 打印文件的信息
  // console.log('req.files:',req.files);
  console.log('存储海报!');
  var posterData = req.files.uploadPoster;

  // 文件的路径
  var filePath = posterData.path;

  // 文件名
  var originalFilename = posterData.originalFilename;
  if (originalFilename) {
		fs.readFile(filePath, function(err, data) {
			// 时间戳
	  	var timestamp = Date.now();
	  	var type = posterData.type.split('/')[1];
		  var poster = timestamp + '.' + type;

		  // 设置新的存储的路径。
		  var newPath = path.join(__dirname, '../../', 'public/images/poster/' + poster);
	 		fs.writeFile(newPath,data,function(err) {
				req.poster = poster;
				next();
		  });
		});
  } else {
		next();
  }
};

// 后台录入存储
exports.save = function(req, res) {
  var id = req.body.movie._id;
  var movieObj = req.body.movie;
  var categoryId = movieObj.categories;
  var _movie;

  if (req.poster) {
		movieObj.poster = req.poster;
  }

  if (id) {
  	console.log('更新电影!');
		Movie.findById(id, function(err, movie) {
		  if(err) {
				console.log(err);
	 		}

	  	Categories.update({ _id: movie.categories, }, { $pullAll: { 'movies': [id], }}, function(err) {
				_movie = _.extend(movie, movieObj);
				_movie.save(function(err, movie) {
				  if(err) {
						console.log(err);
				  }

				  Categories.update({ _id: categoryId }, { $addToSet: { 'movies': id}}, function(err) {
			 		 	res.redirect('/movie/' + movie._id);
			 		});
				});
	  	});
		});
  } else {
  	console.log('新增电影!');
		var categoriesName = movieObj.categoriesName;

		_movie = new Movie(movieObj);
		_movie.save(function(err, movie) {
	 		if (err) {
				console.log('新增电影失败', err);
		  }

	 		if (categoryId) {
				Categories.findById(categoryId, function(err, categories) {
		  		if (err) {
						console.log(err);
		  		}

		  		categories.movies.push(movie._id);
		  		categories.save(function(err, categories) {
						if (err) {
			  			console.log(err);
						}

						res.redirect('/movie/' + movie._id);
		  		});
				});
	  	} else if (categoriesName) {
	  		Categories.findByName(categoriesName, function(err, categoriesValue) {
	  			if (err) {
	  				console.log('err:', err);
	  			}

	  			console.log('categoriesValue:', categoriesValue);
	  			if (categoriesValue) {
  					categoriesValue.movies.push(movie._id);
  					categoriesValue.save(function(err, categoriesNewValue) {
	  					movie.categories = categoriesNewValue._id;
	  					movie.save(function(err, movie) {
	  						if (err) {
	  							console.log(err);
	  						}

	  						res.redirect('/movie/' + movie._id);
	  					});
  					});
	  			} else {
	  				var category = new Categories({
	  					name: categoriesName,
	  					movies: [movie._id]
	  				});

	  				category.save(function(err, category) {
	  					if (err) {
	  						console.log(err);
	  					}

	  					movie.categories = category._id;
	  					movie.save(function(err, movie) {
	  						if (err) {
	  							console.log(err);
	  						}

	  						res.redirect('/movie/' + movie._id);
	  					});
	  				});
	  			}
	  		});
	  	};
	  	// res.redirect("/movie/"+ movie._id);
		});
  };
};

// 电影列表
exports.list = function(req, res) {
	console.log('获取电影列表!');
	Movie.fetch(function(err, movies) {
		if (err) {
			console.log(err);
		}

		res.render('pages/movie-list', {
			title: '查看电影',
			movies: movies,
		});
	});
};

// 电影点击率排行榜
exports.pvRanking = function(req, res) {
	console.log('获取电影点击率排行榜!');
	Movie.pvRanking(function(err, movies) {
		if (err) {
			console.log('获取电影点击率排行榜失败:', err);
		}

		res.render('pages/movie-ranking', {
			title: '点击排行',
			movies: movies,
			ranking: 'pvRanking',
		});
	});
};

// 电影片长排行榜
exports.movieTimeRanking = function(req, res) {
	console.log('获取电影片长排行榜!');
	Movie.movieTimeRanking(function(err, movies) {
		if (err) {
			console.log('获取电影片长排行榜失败:', err);
		}

		res.render('pages/movie-ranking', {
			title: '片长排行',
			movies: movies,
			ranking: 'movieTimeRanking',
		});
	});
};

// 电影上映日期排行榜
exports.dateRanking = function(req, res) {
	console.log('获取电影上映日期排行榜!');
	Movie.dateRanking(function(err, movies) {
		if (err) {
			console.log('获取电影上映日期排行榜失败:', err);
		}

		res.render('pages/movie-ranking', {
			title: '上映排行',
			movies: movies,
			ranking: 'dateRanking',
		});
	});
};

// 电影评分
exports.grade = function(req, res) {
	console.log("当前评分：", req.body);
	console.log("新增评分");
	var score = req.body.score;
	var movieId = req.body.movieId;
	var userId = req.body.userId;
	var user = req.session.user;

	moment.locale('zh-cn', {
		relativeTime: {
			yy: '%d',
		}
	});
	var userAge = parseInt(moment([moment(user.born).format('YYYY, MM, DD')]).fromNow(true), 10);
	// console.log("userAge: ", userAge);

	//暂改为提交时判断
	// if (score > 10 || score < 3) {
	// 	console.log("这是一个恶意评分,自动忽略!");
	// }
	Movie.findById(movieId, function(err, movie) {
		if (err) {
			console.log(err);
		}

		// console.log('movie before',movie);
		var scoreUsers = {
			userId: userId,
			score: score,
			age: userAge,
		};

		movie.scoreUsers.push(scoreUsers);
		console.log("movie::", movie);
		movie.save(function(err, movie) {
			if (err) {
				console.log(err);
			}

			console.log('评分成功');
			// console.log('movie after',movie);

			score = parseFloat(score);

			// 已评分
			movie.score.flag = 1;
			movie.score.sum += score;
			movie.score.count += 1;

			//第一次初始化
			if (movie.score.count == 1) {
				movie.score.max = score;
				movie.score.min = score;
			}

			if (score > movie.score.max) {
				movie.score.max = score;
			}

			if (score < movie.score.min) {
				movie.score.min = score;
			}

			//去除一个最低分和一最高分
			if (movie.score.count > 2) {
				movie.score.average = (movie.score.sum - movie.score.max - movie.score.min) / (movie.score.count - 2);
				movie.score.average = parseFloat(movie.score.average.toFixed(2));
			}

			movie.save(function(err, movie) {
				if (err) {
					console.error("电影的score更新失败!");
				} else {
					console.log("电影的score已更新:", movie);
				}

				res.json({"status": 1})
			});
		});
	});
};

exports.categoriesCount = function(req, res) {
	res.render('pages/active-view', {
		title: '分类数量',
		view: 'categoriesCount',
	});
};

exports.categoriesClick = function(req, res) {
	res.render('pages/active-view', {
		title: '分类点击量',
		view: 'categoriesClick',
	});
};

exports.categoriesAverageScore = function(req, res) {
	res.render('pages/active-view', {
		title: '分类平均分',
		view: 'categoriesAverageSource',
	});
};

exports.movieAverageScoreTop10 = function(req, res) {
	res.render('pages/active-view', {
		title: '电影得分Top10',
		view: 'movieAverageSourceTop10',
	});
};

exports.movieAverageScoreTop10Data = function(req, res) {
	console.log('获取电影得分Top10!');
	Movie.averageScoreTop10(function(err, movies) {

		var top10 = [];
		for (var i = 0, len = movies.length; i < len; i++) {
			top10.push(movies[i]);
			if (top10.length >= 10) {
				break;
			}
		}

		if (err) {
			console.log('获取获取电影得分Top10失败:', err);
		}

		res.json({ "data": top10, "status": 1, });
	});
};

exports.scoreByAge = function(req, res) {
	// console.log('req', req.params);
	console.log('分年龄段展示评分!');
	var movieId = req.params.id;
	if (movieId) {
		Movie.findById(movieId, function(err, movie) {
			console.log(movie.title);
			// var thisMovie = {
			// 	title: movie.title,
			// 	scoreUsers: movie.scoreUsers,
			// };
			var movieScore = movie.scoreUsers;
			console.log("movieScore", movieScore);
			res.render('pages/movie-score-by-age', {
	  		title: movie.title,
	  		movie: movieScore,
			});
		});
  } else {
  	res.redirect('/');
  }
};

// 删除
exports.del = function(req, res) {
	console.log("删除电影!");
	var id = req.query.id;
	if (id) {
		Movie.remove({_id:id}, function(err, movie) {
			if (err) {
				console.log(err);
			} else {
				res.json({ "success": 1, });
			}
		});
	}
};
