var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var SALT_STRNGTH = 10;//加密计算强度(1 - 10)

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  nickname: String,
  email: String,
  avatar: {
    type: String,
    default: '/images/avatar/default/default.png'
  },
  // 0 woman
  // 1 man
  sex: {
    type: Number,
    default: 1
  },
  // 0-10 normal user
  // 11-20 movie admin
  // 21-30 user admin and movie admin
  // > 30 super admin,this role has the highest power
  role: {
    type: Number,
    default: 0
  },
  password: String,
  tel: String,
  born: {
    type: String
    // type: Date,
    // default: Date.now()
  },
  problem: String,
  problemAnswer: String,
  meta: {
    createdAt: {
  	type: Date,
  	default: Date.now()
    },
    updateAt: {
  	type: Date,
  	default: Date.now()
    }
  },
  flag: {
    type: Number,
    default: 1
  },
  others: {}
});

UserSchema.pre('save', function(next) {
  var user = this;
  if (this.isNew) {
    this.meta.createdAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }

  //随机salt及密码加密
  bcrypt.genSalt(SALT_STRNGTH, function(err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});


//实例方法
UserSchema.methods = {
  comparePassword: function(pass, cb) {
    bcrypt.compare(pass, this.password, function(err, isMatch) {
	    if (err) {
		    return cb(err);
	    }
	    cb(null, isMatch);
	  });
  }
};

//静态方法
UserSchema.statics = {
  fetch : function(cb) {
  	return this
  	.find({})
  	.sort('meta.updateAt')
  	.exec(cb);
  },
  findById: function(id, cb){	
	  return this.findOne({_id:id}).exec(cb);
  }
};

module.exports = UserSchema;