var express = require("express");
var bodyParser = require('body-parser');
var path = require("path");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var session = require("express-session");
var mongoStore = require('connect-mongo')(session);
var dbUrl = "mongodb://localhost:27017/movies";
mongoose.connect(dbUrl);

mongoose.connection.on('open', function() {
	console.log('数据库连接成功!');
});

var routes = require("./config/routes");

var port = process.env.PORT || 3000;
var app = express();

app.set("views", "./app/views");
app.set("view engine", "ejs");
// app.use(cookieParser());
app.use(session({
  secret: 'ethan',
  /*cookie:{
  	maxAge: 1000 * 60 * 60 * 24 * 1, //默认1天
  	domain:'/'
  },*/
  store: new mongoStore({
    url: dbUrl,
    collection: 'sessions'
  }),
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



routes(app);//传入路由
app.listen(port);
console.log('服务成功启动，端口：',port);
