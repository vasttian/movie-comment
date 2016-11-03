var mongoose = require("mongoose");
var CategoriesSchema=require("../schemas/categories");
var Categories=mongoose.model("Categories",CategoriesSchema);//创建model，并注册(发布)到mongoose里面。(Movie这里是否等同于获取一下model？待验证)

module.exports=Categories;