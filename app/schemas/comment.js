var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CommentSchema = new Schema({
  from: {
  	type: ObjectId,
  	ref: 'User'  //关联
  },
  movie: {
  	type: ObjectId,
  	ref: 'Movie'
  },
  reply: [{     //回复
    from: {     //回复人
      type: ObjectId,
      ref: 'User'
  	},
    to: {       //被回复人
      type: ObjectId,
      ref: 'User'
  	},
    content: String
  }],
  content: String,  //回复内容
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

CommentSchema.pre('save', function(next) {
  if (this.isNew) {
	  this.meta.createdAt = this.meta.updateAt = Date.now();
  } else {
	  this.meta.updateAt = Date.now();
  }
  next();
});

//静态方法
CommentSchema.statics = {
  fetch : function(cb) {
    return this
    .find({})
    .sort('meta.updateAt')
    .exec(cb);
  },
  findById: function(id, cb) {	
    return this.findOne({_id:id}).exec(cb);
  }
};

module.exports = CommentSchema;