var User = require("../models/user");
var fs = require('fs');
var path = require('path');
//注册
exports.showSignup = function (req, res) {
  res.render("pages/signup", {
	title: '注册一萌'
  });
};

//如果用户有上传头像
exports.saveAvatar = function(req, res, next){

  console.log('req.files::',req.files);//打印文件的信息
  var postData = req.files.avatar;
  var filePath = postData.path;
  var fileName = postData.originalFilename;

  if (fileName) {
    fs.readFile(filePath, function(err, data) {
      var timeStamp = Date.now();
      var type = postData.type.split('/')[1];
      var avatar = timeStamp + '.' + type;
      var newPath = path.join(__dirname, '../../','/public/images/avatar/' + avatar);

      fs.writeFile(newPath, data, function(err) {
        req.avatar = avatar;
        next();
      });
    });
  } else {
    next();
  }
};

exports.checkUserName = function (req, res) {
  // console.log('req.body::',req.body);
  var _user = req.body.user;

  User.findOne({name:_user.name}, function(err, name) {
	if (err) {
	  console.log('err');
	};
	if (name) {
	  console.log('用户名已存在!');
	  return res.json({"valid":false});
	} else {
	  console.log('用户名可以注册!');
	  return res.json({"valid":true});
	}
  });
}
exports.signup = function(req, res){
  console.log('req.body::',req.body);
  var _user = req.body.user;
  if (req.avatar) {
    _user.avatar = req.avatar;
  }
  User.findOne({name:_user.name}, function(err, name) {
	if (err) {
	  console.log('err');
	};
	if (name) {
	  console.log('用户名已存在!');
	  // return res.json({"status":"error"});
	  res.redirect('/use/signup');
	}else {
	  var user = new User(_user);
	  user.save(function(err, user) {
		if (err) {
		  console.log('用户名密码保存失败!');
		};
		req.session.user = user;
		// return res.json({"status":"ok"});
		res.redirect('/');
	  });
	};
  });
};

//登录
exports.showSignin = function (req, res) {
  res.render("pages/signin", {
	title:'登录一萌'
  });
};

exports.signin = function (req, res) {
  var _user = req.body.user;
  var name = _user.name;
  var pass = _user.password;
  User.findOne({name: name}, function (err, user) {
	if (err) {
	  console.log(err);
	};
	if (!user) {
	  console.log('用户名不存在!');
	  return res.redirect("/signup");
	};
	req.session.user = user;
	return res.redirect("/");
	// user.comparePassword(pass, function (err, isMatch) {
	// 	if (err) {
	// 	  console.log(err);
	// 	};
	// 	if (isMatch) {
	// 	  cosole.log('登录成功!');
	// 	  req.session.user = user;
	// 	  return res.redirect("/");
	// 	}else {
	// 	  console.log('密码错误!');
	// 	  return res.redirect("/signin");
	// 	}
	// });
  });
};


//登出
exports.logout = function (req, res) {
	req.session.destroy();
	res.redirect("/");
};