var mongoose = require("mongoose");

// 多种权限控制
// 单独为邀请码建立一个模型，
// 为以后可以在注册时实现不同权限控制做准备
var InvitationCodeSchema = new mongoose.Schema({
	//normal user, 不需要填邀请码
	//movie admin, code: movieadmin
	//user admin and movie admin, code: useradminmovieadmin
	//super admin, code: superadmin
	code: {
		type: String,
		default: 'useradminmovieadmin'
	}
});

module.exports = InvitationCodeSchema;