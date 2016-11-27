var User = require("../models/user");
var _ = require("underscore");
var fs = require('fs');
var path = require('path');
//注册
exports.showSignup = function(req, res) {
  res.render("pages/signup", {
    title: '注册一萌'
  });
};

//上传头像
exports.saveAvatar = function(req, res, next) {
  // console.log('>>>>>req.body>>>>>>:',req.body);

  // console.log('req.files::',req.files);//打印文件的信息
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

//检查待注册的用户名是否可用
exports.checkUserName = function(req, res) {
  // console.log('req.body::',req.body);
  var _user = req.body.user;

  // console.log("_user.name",_user.name);
  User.findOne({name: _user.name}, function(err, name) {
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
};

//检验原密码
exports.checkOriginPassword = function(req, res) {
  var _user = req.session.user;
  var _name = _user.name;
  var password = req.body.user.password;
  console.log("_user::", _user);
  User.findById(_user._id, function(err, user) {
    if (err) {
      console.log("检验原密码时查找用户错误:",err);
    };
    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        console.log('err');
      };
      if (!isMatch) {
        console.log('原密码错误!');
        return res.json({"valid": false});
      } else {
        console.log('原密码正确!');
        return res.json({"valid": true});
      };
    });
  });
};

//注册
exports.signup = function(req, res) {
  // console.log('>>>>>req.body::',req.body);
  var _user = req.body.user;
  if (req.avatar) {
    _user.avatar = req.avatar;
  }
  console.log('---user:', _user);
  if (_user.invitationCode == 'movieadmin') {
    _user.role = 20;
  } else if (_user.invitationCode == 'useradminmovieadmin') {
    _user.role = 30;
  } else if (_user.invitationCode == 'superadmin') {
    _user.role = 32;
  } else {
    _user.role = 0;
  }

  if (!_user.nickname) {
  	_user.nickname = _user.name;
  }
  User.findOne({name:_user.name}, function(err, name) {
    if (err) {
      console.log('err');
    };
    if (name) {
      console.log('用户名已存在!');
	    // return res.json({"status":"error"});
	    res.redirect('/use/signup');
	  } else {
      var user = new User(_user);
      user.save(function(err, user) {
        if (err) {
          console.log('用户名密码保存失败!');
        } else {
          req.session.user = user;
        }
		    // return res.json({"status":"ok"});
		    res.redirect('/');
      });
    };
  });
};

//登录页面
exports.showSignin = function(req, res) {
  res.render("pages/signin", {
    title:'登录一萌'
  });
};

//登录
exports.signin = function(req, res) {
  console.log("reqerq::",req.body);
  var _user = req.body;
  var name = _user.name;
  var pass = _user.password;
  User.findOne({name: name}, function(err, user) {
    if (err) {
      console.log(err);
    };
    if (!user) {
      console.log('用户名不存在!');
      // return res.redirect("/signup");
      return res.json({"status":"error"});
    };
    console.log('user', user);
  	user.comparePassword(pass, function (err, isMatch) {
  		if (err) {
  		  console.log(err);
  		};
  		if (isMatch) {
  		  console.log('登录成功!');
  		  req.session.user = user;
        return res.json({"status":"ok"});
  		  // return res.redirect("/");
  		}else {
  		  console.log('密码错误!');
  		  // return res.redirect("/signin");
        return res.json({"status":"error"});
  		}
  	});
  });
};

//快捷登录
exports.simpleSignin = function(req, res) {
  // console.log("req.body::",req.body);
  var _user = req.body.user;
  var name = _user.name;
  var pass = _user.password;
  User.findOne({name: name}, function(err, user) {
    if (err) {
      console.log(err);
    };
    if (!user) {
      console.log('用户名不存在!');
      return res.redirect("/signin");
      // return res.json({"status":"error"});
    };
    // console.log('user', user);
    user.comparePassword(pass, function (err, isMatch) {
      if (err) {
        console.log(err);
      };
      if (isMatch) {
        console.log('登录成功!');
        req.session.user = user;
        // return res.json({"status":"ok"});
        return res.redirect("/");
      }else {
        console.log('密码错误!');
        return res.redirect("/signin");
        // return res.json({"status":"error"});
      }
    });
  });
};

//管理员页面
exports.showAdmin = function(req, res) {
  res.render("pages/admin-manage", {
   title: '管理页面'
 });
};

//发送用户信息
exports.sendUser = function(req, res) {
  // console.log('session:',req.session);
  var user = req.session.user;
  res.json({user: user});
};

//个人资料
exports.sendPersonalInfo = function(req, res) {
  var user = req.session.user;
  console.log('个人资料:', user);
  res.render("pages/show-personal-info", {
    title: '个人资料',
    user: user
  });
};

//返回待更改资料
exports.showPersonalInfo = function(req, res) {
  var user = req.session.user;
  console.log('更改资料:', user);
  res.render("pages/update-personal-info", {
    title: '更改资料',
    user: user
  });
};

//修改资料
exports.updatePersonalInfo = function(req, res) {
  var userObj = req.body.user;
  console.log("修改资料");
  if (req.avatar) {
    userObj.avatar = req.avatar;
  }
  // console.log("userObj:", userObj);
  var id = userObj._id;
  User.findById(id, function(err, user) {
    var _user =  _.extend(user, userObj);
    // console.log("_user::", _user);
    var user = new User(_user);
    user.save(function(err, user) {
      if (err) {
        console.log('修改资料失败:', err);
      } else {
        req.session.user = user;
      }
      res.redirect('/');
    });
  });
};

//返回修改密码页面
exports.showUpdatePass = function(req, res) {
  var user = req.session.user;
  res.render("pages/update-password", {
    title: "修改密码",
    user: user
  });
};

//修改密码
exports.updatePass = function(req, res) {
  var userObj = req.body.user;
  // console.log("userObj-before:: ",userObj);
  userObj.password = userObj.newPass;
  // console.log("userObj-after:: ",userObj);
  User.findOne({name: userObj.name}, function(err, user) {
    var _user = _.extend(user, userObj);
    var user = new User(_user);
    user.save(function(err, user) {
      if (err) {
        console.log('修改密码失败:', err);
        // res.redirect('/update/user/password');
      } else {
        req.session.user = user;
      }
      res.redirect('/');
    });
  });
}

//找回密码页面
exports.sendForgotPage = function(req, res) {
  res.render("pages/forgot.ejs", {
    title: "找回密码"
  });
};

//找回密码
exports.setNewPassword = function(req, res) {
  var userObj = req.body;
  // console.log("找回密码：",userObj);
  User.findOne({name: userObj.name}, function(err, user) {
    if (err) {
      console.log(err);
    }
    if (!user) {
      return res.json({"status": "error"});
    }
    if (user.problem == userObj.problem && user.problemAnswer == userObj.problemAnswer) {
      console.log("密保问题填写正确!");
      var _user = _.extend(user, userObj);
      // console.log("_user:",_user);
      _user.save(function(err, user) {
        if (err) {
          console.log("找回密码失败!");
          return res.json({"status":"error"});
        } else {
          req.session.user = user;
        }
        // redirect("/");
        return res.json({"status":"ok"});
      });
    } else {
      return res.json({"status":"error"});
    }
  });
};

//用户列表
exports.list = function(req, res) {
  User.find({role: 2}, function(err, user) {
  // console.log("user:",user);
  });
};

//是否登录
exports.signinRequired = function(req, res, next) {
  console.log("验证是否登录");
  var user = req.session.user;
  if (!user) {
    console.log("没有登录");
    return res.redirect("/signin");
  }
  next();
};

//是否有对电影进行CRUD的权限
exports.movieAdminRequired = function(req, res, next){
  console.log("验证是否有对电影进行CRUD的权限");
  var user = req.session.user;
  if (user.role <= 10) {
   console.log("对不起,你还没有获得对电影进行CRUD的权限!");
   return res.redirect("/signin");
 }
 next();
};

//是否有对用户进行CRUD的权限
exports.user_movieAdminRequired = function(req, res, next){
  console.log("验证是否有对用户进行CRUD的权限");
  var user = req.session.user;
  console.log("user:", user);
  if (user.role <= 20) {
   console.log("对不起,你还没有获得对用户进行CRUD的权限!");
   return res.redirect("/signin");
 }
 next();
};

//是否有超级管理员的权限
exports.superAdminRequired = function(req, res, next){
  console.log("验证是否有超级管理员的权限");
  var user = req.session.user;
  console.log("user:", ser);
  if(user.role <= 30) {
   console.log("对不起,你还没有获得超级管理员的权限!");
   return res.redirect("/signin");
 }
 next();
};

//登出
exports.logout = function(req, res) {
	req.session.destroy();
	res.redirect("/");
};