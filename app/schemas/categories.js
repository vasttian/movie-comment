var mongoose = require("mongoose");

var CategoriesSchema = new mongoose.Schema({
  name: String,
  movies: [
  	{
  	  type: mongoose.Schema.Types.ObjectId,
  	  ref: "Movie",
  	},
  ],
  meta: {
		createAt: {
		  type: Date,
		  default: Date.now(),
		},
		updateAt: {
		  type: Date,
		  default: Date.now(),
		},
  },
});

// 静态方法
CategoriesSchema.statics = {
	fetch: function(cb) {
		return this
		.find({})
		.sort("meta.updateAt")
		.exec(cb);
	},

	findById: function(id, cb) {
		return this
		.findOne({_id: id})
		.exec(cb);
	},

	findByName: function(name, cb) {
		return this
		.findOne({name: name})
		.exec(cb);
	},
}

// 中间件
CategoriesSchema.pre("save", function (next) {
  if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
		this.meta.updateAt = Date.now();
  }

  next();
});

module.exports = CategoriesSchema;
















