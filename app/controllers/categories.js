var Categories = require("../models/categories");

exports.add = function(req, res){
  res.render("pages/category_admin", {
	title: "增加电影分类",
	categories: {}
  });	
};

exports.save = function(req, res) {
  var _category = req.body.categories;
  var category = new Categories(_category);
  category.save(function(err,category) {
	if(err) {
	  console.log(err);
	};
	res.redirect("/admin/category/list");
  });
};

//userlist
exports.list = function(req,res) {
	Categories.fetch(function(err,categories) {
		if(err) {
			console.log(err);
		}
		res.render("pages/categorylist", {
			title:"电影分类页面",
			categories:categories
		});
	});	
};
