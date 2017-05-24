var Movie = require('../models/movie');
var Categories=require('../models/categories');

// 首页
exports.index = function(req, res) {
	Categories
	.find({})
	.populate({path:"movies"})
	.exec(function(err, categories) {
		if (err) {
			console.log(err);
		}

		res.render('pages/index', {
			title: '一萌电影',
			categories: categories,
		});
	});
};

// 搜索
exports.search = function(req, res) {
	// 点击分类
	var categoryId = req.query.cat;

	// 搜索传入
	var searchWord = req.query.searchWord;

	// 页码
	var page = parseInt(req.query.page, 10) || 1;

	// 每页展示数量
	var count = 4;

	// 跳过数量
	var skipNum = (page-1) * count;
	var totalMovies;
	console.log("page:", page);

	// 分类
	if (categoryId) {
		Categories
		.findOne({_id: categoryId})
		.exec(function(err, categories) {
			totalMovies = categories.movies;
		});
		Categories
		.findOne({ _id: categoryId })
		.populate({
			path: 'movies',
			select: 'title poster',
			options: {
				limit: count,
				skip: skipNum
			}
		})
		.exec(function(err, categories) {
			if (err) {
				console.log(err);
			}

			var category = categories || {};
			var movies = totalMovies || [];

			res.render('pages/movie-results', {
				title: '当前分类',

				// 分类名
				keyword: category.name,

				// 当前页
				currentPage: page,

				// 把当前分类的ID传回，便于翻页时再次传入
				query: 'cat=' + categoryId,

				// 共有多少页
				totalPage: Math.ceil(movies.length / count),
				movies: category.movies
			});
		});
	} else {
		// 搜索
		Movie
		.find({ title: new RegExp(searchWord + '.*', 'i') })
		.exec(function(err, movies) {
			totalMovies = movies;

			Movie
			.find({ title: new RegExp(searchWord + '.*', 'ig') })
			.limit(count)
			.skip(skipNum)
			.exec(function(err, movies) {
				if (err) {
					console.log(err);
				}

				var moviesLength = totalMovies ? totalMovies.length : count;

				res.render('pages/movie-results', {
					title: '搜索结果',

					// 搜索关键字
					keyword: searchWord ? searchWord: '全部电影',

					// 当前页
					currentPage: page,
					query: 'searchWord=' + searchWord,

					// 共有多少页
					totalPage: Math.ceil(moviesLength / count),
					movies: movies
				});
			});
		});
	}
};

