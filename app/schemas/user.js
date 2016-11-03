var mongoose = require('mongoose');

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
  // 0-5 normal user
  // 6-10 user admin
  // 11-15 user admin and movie admin
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

//实例方法
UserSchema.methods = {
  comparePass: function(pass, cb) {
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