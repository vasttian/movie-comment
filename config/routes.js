var Index = require("../app/controllers/index");
var User = require("../app/controllers/user");
var Movie = require("../app/controllers/movie")
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

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
	app.post('/user/signup', multipartMiddleware, User.saveAvatar, User.signup);
	app.post('/user/signin', User.signin);
	app.get('/signup', User.showSignup);
	app.get('/signin', User.showSignin);
	app.get('/logout', User.logout);
	// app.get("/admin/user/list", User.signinRequired, User.adminRequired, User.userlist);

	//movie
	// app.get('/movie/:id', Movie.detail);
	app.get("/admin/movie/new", User.signinRequired, User.adminRequired, Movie.news);
	// app.get("/admin/movie/update/:id", User.signinRequired, User.adminRequired, Movie.update);
	app.post("/admin/movie", User.signinRequired, User.adminRequired, Movie.savePoster, Movie.save);
	// app.get("/admin/movie/list",User.signinRequired, User.adminRequired, Movie.list);
	// app.delete("/admin/movie/list",User.signinRequired, User.adminRequired, Movie.del);
	
};