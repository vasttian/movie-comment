var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CommentSchema = new Schema({
  from: {
  	type: ObjectId,

    // 关联
  	ref: 'User',
  },
  movie: {
  	type: ObjectId,
  	ref: 'Movie',
  },

  // 回复
  reply: [{
    // 回复人
    from: {
      type: ObjectId,
      ref: 'User',
  	},

    // 被回复人
    to: {
      type: ObjectId,
      ref: 'User',
  	},
    content: String,
  }],

  // 评论内容
  content: String,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updateAt: {
      type: Date,
      default: Date.now(),
    },
  },
});

CommentSchema.pre('save', function(next) {
  if (this.isNew) {
	  this.meta.createdAt = this.meta.updateAt = Date.now();
  } else {
	  this.meta.updateAt = Date.now();
  }

  next();
});

// 静态方法
CommentSchema.statics = {
  fetch : function(cb) {
    return this
    .find({})
    .sort('meta.updateAt')
    .exec(cb);
  },

  findById: function(id, cb) {
    return this.findOne({_id:id}).exec(cb);
  },
};

module.exports = CommentSchema;
