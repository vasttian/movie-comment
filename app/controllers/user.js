var User = require("../models/user");

//注册
exports.showSignup = function (req, res) {
	res.render("pages/signup", {
		title: '注册页面'
	});
};

exports.signup = function(req, res){
	var _user = req.body.user;
	User.findOne({name:_user.name}, function(err, name) {
		if (err) {
			console.log('err');
		};
		if (name) {
			console.log('用户名已存在!');
			return res.redirect('/signin');
		}else {
			var user = new User(_user);
			user.save(function(err, user) {
				if (err) {
					console.log('用户名密码保存失败!');
				};
				req.session.user = user;
				res.redirect('back');
			});
		};
	});
};

//登录
exports.showSignin = function (req, res) {
	res.render("pages/signin", {
		title:'登录页面'
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
		// 		console.log(err);
		// 	};
		// 	if (isMatch) {
		// 		cosole.log('登录成功!');
		// 		req.session.user = user;
		// 		return res.redirect("/");
		// 	}else {
		// 		console.log('密码错误!');
		// 		return res.redirect("/signin");
		// 	}
		// });
	});
};


//登出
exports.logout = function (req, res) {
	req.session.destroy();
	res.redirect("/");
};