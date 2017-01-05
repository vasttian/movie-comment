var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var MovieSchema = new mongoose.Schema({
  title: String,
  doctor: String,
  protagonist: String,
  movieTime: {
    type: Number,
    default: 0
  },
  language: String,
  country: String,
  summary: String,
  flash: String,
  poster: String,
  date: String,
  pv: {
	  type: Number,
	  default: 0
  },
  categories: {
	  type: ObjectId,
	  ref: "Categories"
  },
  meta: {
	  createAt: {
	    type: Date,
	    default: Date.now()
  	},
  	updateAt: {
	    type: Date,
	    default: Date.now()
  	}
  },
  scoreUsers: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
      },
      score: {
        type: Number,
        default: 0
      }
    }
  ],
  score: {
    type: Number,
    default: 0
  },
  others: {
    type: String
  }
});

MovieSchema.pre("save",function (next) {	//中间件
  if (this.isNew) {
	  this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
	  this.meta.updateAt = Date.now();
  }
  next();
});

MovieSchema.statics = {		//添加静态方法，静态方法在模型上调用 
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
  pvRanking: function(cb) {
    return this
    .find({})
    .sort("-pv")
    .exec(cb)
  }, 
  movieTimeRanking: function(cb) {
    return this
    .find({})
    .sort("movieTime")
    .exec(cb)
  },
  dateRanking: function(cb) {
    return this
    .find({})
    .sort("date")
    .exec(cb)
  }
}

module.exports = MovieSchema;
