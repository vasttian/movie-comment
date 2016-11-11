var User = require("../app/controllers/user");
var Index = require("../app/controllers/index");
var Movie = require("../app/controllers/movie");
var Category = require("../app/controllers/categories");
var Comment = require("../app/controllers/comment");
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

  //管理员
  app.get('/admin', User.signinRequired, User.movieAdminRequired, User.showAdmin);
  app.get('/admin/user', User.signinRequired, User.movieAdminRequired, User.sendUser);
  // app.delete('/admin/user/list', User.signinRequired, User.userAdminRequired,  User.del);
  // app.get('/admin/user/list', User.signinRequired, User.userAdminRequired, User.list);
  
  //电影
  app.get('/movie/:id', Movie.detail);
  app.get("/admin/movie-manage", User.signinRequired, User.movieAdminRequired, Movie.movieManage);
  app.get("/admin/movie/add", User.signinRequired, User.movieAdminRequired, Movie.addMovie);
  // app.get("/admin/movie/update/:id", User.signinRequired, User.movieAdminRequired,  Movie.update);
  app.post("/admin/movie",multipartMiddleware, User.signinRequired, User.movieAdminRequired, Movie.savePoster, Movie.save);
  app.get("/admin/movie/list",User.signinRequired, User.movieAdminRequired, Movie.list);
  app.delete("/admin/movie/list",User.signinRequired, User.movieAdminRequired, Movie.del);

  //电影类别
  app.get("/admin/movie/category/add", User.signinRequired, User.movieAdminRequired, Category.add);
  app.post("/admin/movie/category", User.signinRequired, User.movieAdminRequired, Category.save);
  app.get("/admin/movie/category/list", User.signinRequired, User.movieAdminRequired, Category.list);
  app.delete("/admin/movie/category/list", User.signinRequired, User.movieAdminRequired, Category.del);

  //评论
  app.post("/user/comment", User.signinRequired, Comment.save);

  //搜索
  app.get('/results', Index.search);
  
};