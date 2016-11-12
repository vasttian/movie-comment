var InvitationCode = require("../models/invitation-code");

//检查待注册的邀请码是否正确
exports.checkInvitationCode = function(req, res) {
  var _user = req.body.user;
  console.log("检查待注册的邀请码是否正确");
	// console.log('_user',_user);

  InvitationCode.findOne({code: _user.invitationCode}, function(err, code) {
	  if (err) {
	    console.log('err');
	  };
	  if (code) {
	    console.log('邀请码填写正确!');
	    return res.json({"valid": true});
	  } else {
	    console.log('邀请码不正确!');
	    return res.json({"valid": false});
	  }
  });
};