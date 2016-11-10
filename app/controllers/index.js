var Movie = require("../models/movie");
var Categories=require("../models/categories");

exports.index = function(req, res){
	Categories
	.find({})
	.populate({path:"movies"})
	.exec(function(err,categories){
		if(err){
			console.log(err);
		}
		res.render("pages/index",{
			title:"一萌电影",
			categories:categories
		});
	});
};

exports.search = function(req, res){
	var catId = req.query.cat;//分类
	var page = parseInt(req.query.page,10)||0;//页码
	var cuunt =2;//每页展示多少个？
	var index = page * cuunt;//跨多少条查询？
	var allcate;

	var q = req.query.q;//搜索

	if(catId){
		Categories
		.findOne({_id:catId})
		.exec(function(err,categories){
			allcate=categories.movies;
		});

		Categories
		.findOne({_id:catId})
		.populate({
			path:"movies",
			select:"title poster",
			options:{limit:cuunt,skip: index}
		})
		.exec(function(err,categories){
			if(err){
				console.log(err);
			}
			var category = categories||{};
			var movies = allcate||[];

			res.render("pages/results",{
				title:"结果列表页面",
				keyword:category.name,//分类名
				currentPage:(page+1),//当前页
				query:"cat="+catId,
				totalPage:Math.ceil(movies.length/cuunt),//共有多少页
				categories:category.movies
			});
		});
	}else{
		Movie
			.find({title:new RegExp(q+".*","i")})
			.exec(function(err,movies){
				allcate=movies;
			});
		Movie
			.find({title:new RegExp(q+".*","i")})
			.limit(cuunt)
			.skip(index)
			.exec(function(err,movies){
				if(err){
					console.log(err);
				}
				console.log(movies)

				res.render("pages/results",{
					title:"搜索列表页面",
					keyword: q,//分类名
					currentPage:(page+1),//当前页
					query:"q="+q,
					totalPage:Math.ceil(allcate.length/cuunt),//共有多少页
					categories:movies
				});

			});


	}	
};
