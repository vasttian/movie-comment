angular.module("adminApp", ["ngRoute"])
.factory('adminWelcomeFactory', ['$http', '$q', function ($http, $q) {
  var service = {};
  service.callUser = function() {
  	var defered = $q.defer();
  	var config = {
  	  method: 'GET',
  	  url: '/admin/user'
  	};

  	$http(config).success(function(data) {
  	  defered.resolve(data);
  	}).error(function(error) {
  	  defered.reject(error);
  	});

  	return defered.promise;
  };
  return service;
}])
.controller('adminHomeCtrl', ['$scope', '$route', 'adminWelcomeFactory', function($scope, $route, adminWelcomeFactory) {
  $scope.user = {
  	nickName: ''
  };
  var fillUser = function() {
  	adminWelcomeFactory.callUser()
  	.then(function(data) {
	  // console.log('data123',data.user.nickname);
	  $scope.user.nickName = data.user.nickname;
  	}, function(error) {
	  console.log('adminWelcomeFactory.callUser:',error);
  	});
  };
  $scope.$watch('$viewContentLoaded',function(event) {
  	fillUser(); 
  });
}])
.controller('movieCtrl', function($scope, $route) {

})
.controller('userCtrl', function($scope, $route) {

})
.controller('activeCtrl', function($scope, $route) {

})
.controller('accountCtrl', function($scope, $route) {

})
.controller('adminCtrl', function($scope, $route) {

})
.config(function($routeProvider, $locationProvider) {
  $routeProvider
  	.when('/', {
  	  template: '<div class="row library_title"><h2>Hi: <br>&nbsp;&nbsp&nbsp;&nbsp亲爱的管理员 {{user.nickName}}，<br>&nbsp;&nbsp&nbsp;&nbsp欢迎您!</h2></div>',
  	  controller: 'adminHomeCtrl'
  	})
  	.when('/movie-manage', {
  	  // templateUrl: 'public/admin/movie-index.html',
  	  template: '<div class="row library_title" ng-controller="movieCtrl"><div class="col-md-12 col-md-offset-1"><ul class="nav nav-tabs"><li ng-click="libState=0;" ng-class="{active:libState==0}" role="presentation"><a href="javascript:void(0)" id="add-movie">添加电影</a></li><li ng-click="libState=1;" ng-class="{active:libState==1}" role="presentation"><a href="javascript:void(0)" id="add-category">添加分类</a></li><li ng-click="libState=1;" ng-class="{active:libState==1}" role="presentation"><a href="javascript:void(0)" id="show-movie">查看电影</a></li><li ng-click="libState=1;" ng-class="{active:libState==1}" role="presentation"><a href="javascript:void(0)" id="show-category">查看分类</a></li></ul></div></div>',
  	  controller: 'movieCtrl'
  	})
  	.when('/user-manage', {
  		// tempalteUrl: 
  	})
  	.when('/view-active', {

  	})
  	.when('/account-set', {

  	})
  	.otherwise({
  	  redirectTo: '/'
  	});
});


$(function() {
 //  $("#movie-manage").click(function() {
	// $.get('/admin/movie-manage', function(data, status) {
	//   console.log("runing here!");
	//   $("#admin-module").html(data);
	// });
 //  });

 //  $("#add-movie").click(function () {
 //  	console.log('2345dd');
	// 	$.get('/admin/movie/new', function(data, status) {
	// 		$(".row.library_title").html(data);
	// 	});
	// });

	// $("#add-category").click(function () {
	// 	$.get('/admin/movie/category/add', function(data, status) {
	// 		$("#move-windows").html(data);
	// 	});
	// });

	// $("#show-movie").click(function () {
	// 	$.get('/admin/movie/list', function(data, status) {
	// 		$("#move-windows").html(data);
	// 	});
	// });

	// $("#show-category").click(function () {
	// 	$.get('/admin/movie/category/list', function(data, status) {
	// 		$("#move-windows").html(data);
	// 	});
	// });
});