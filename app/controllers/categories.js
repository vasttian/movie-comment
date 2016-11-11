var Categories = require("../models/categories");
var Movie = require("../models/movie");

//添加分类页
exports.add = function(req, res) {
  res.render("pages/add-category", {
	title: "添加分类",
	categories: {}
  });	
};

//存储分类
exports.save = function(req, res) {
  var _category = req.body;
  var category = new Categories(_category);
  category.save(function(err, category) {
	if (err) {
	  console.log(err);
	};
	res.json({status: true});
	// res.redirect("/admin/#/movie-manage");
  });
};

//分类列表
exports.list = function(req,res) {
  Categories.fetch(function(err, categories) {
	if (err) {
	  console.log(err);
	}
	res.render("pages/category-list", {
	  title: "电影分类",
	  categories: categories
	});
  });	
};

//删除分类
exports.del = function(req, res) {
  var id = req.query.id;
  console.log("delete-categroy id:", id);

  if(id) {
  	Movie.remove({categories:id}, function(err, movie) {
	  if (err) {
		console.log(err);
	  }
	});
	Categories.remove({_id: id}, function(err, movie) {
	  if (err) {
		console.log(err);
	  } else {
		res.json({success: 1});
	  }
	});
  }
};
