var Index = require("../app/controllers/index");
var User = require('../app/controllers/user');

module.exports = function (app) {
	//pre handle user
	app.use(function (req, res, next) {
		var _user = req.session.user;
		app.locals.user = _user;
		next();
	});

	//首页
	app.get('/', Index.index);
	
	//用户
	app.post('/user/checkname', User.checkUserName);
	app.post('/user/signup', User.signup);
	app.post('/user/signin', User.signin);
	app.get('/signup', User.showSignup);
	app.get('/signin', User.showSignin);
	app.get('/logout', User.logout);
	// app.get()
	
};