var mongoose = require("mongoose");
var CategoriesSchema = require("../schemas/categories");
var Categories = mongoose.model("Categories",CategoriesSchema);
module.exports = Categories;