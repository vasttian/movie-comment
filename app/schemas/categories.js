var mongoose = require("mongoose");

var CategoriesSchema = new mongoose.Schema({
  name: String,
  movies: [
  	{
  	  type: mongoose.Schema.Types.ObjectId, 
  	  ref: "Movie"
  	}
  ],
  meta: {
	createAt: {
	  type: Date,
	  default: Date.now()
	},
	updateAt: {
	  type: Date,
	  default: Date.now()
	}
  }
});

CategoriesSchema.statics = {//静态方法
	fetch: function(cb) {
		return this
		.find({})
		.sort("meta.updateAt")
		.exec(cb)
	},
	findById: function(id, cb) {
		return this
		.findOne({_id: id})
		.exec(cb)
	},
	findByName: function(name, cb) {
		return this
		.findOne({name: name})
		.exec(cb)
	}
}

CategoriesSchema.pre("save", function (next) {//中间件
  if (this.isNew) {
	this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
	this.meta.updateAt = Date.now();
  }
  next();
});


module.exports = CategoriesSchema;
















