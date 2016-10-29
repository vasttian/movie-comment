var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: {
		type: String
	},
	password: String,
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