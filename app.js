var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require("path");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var session = require("express-session");
var app = express();
var mongoStore = require('connect-mongo')(session);
var fs = require('fs');
var dbUrl = "mongodb://localhost:27017/movies";
mongoose.connect(dbUrl);

mongoose.connection.on('open', function() {
	console.log('数据库连接成功!');
});


var port = process.env.PORT || 3000;
app.set("views", "./app/views");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: true}));
app.locals.moment = require('moment');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'vasttian',
  cookie:{
    // maxAge: 1000 * 60 * 60 * 24 * 1, //默认1天
  	maxAge: 1000 * 60 * 60,
  },
  store: new mongoStore({
    url: dbUrl,
    collection: 'sessions'
  }),
  resave: true,
  saveUninitialized: true
}));



//引入路由模块
require('./config/routes')(app);
app.listen(port);
console.log('服务成功启动，端口：',port);
