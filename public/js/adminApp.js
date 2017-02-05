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
	    $scope.user.nickName = data.user.nickname;
  	}, function(error) {
	    console.log('adminWelcomeFactory.callUser:', error);
  	});
  };
  $scope.$watch('$viewContentLoaded',function(event) {
  	fillUser(); 
  });
}])
.controller('moviesCtrl', function($scope, $route) {
  // $("#add-movie").trigger("click");
  $scope.libState = 0;
  $.get('/admin/movie/add', function(data, status) {
    $("#move-windows").html(data);
  });
})
.controller('usersCtrl', function($scope, $route) {
  $scope.libState = 0;
  $.get('/admin/user/list', function(data, status) {
    $("#users-windows").html(data);
  });
})
.controller('activeCtrl', function($scope, $route) {
  $scope.libState = 0;
})
.controller('accountCtrl', function($scope, $route) {
  $scope.libState = 0;
})
.controller('adminCtrl', function($scope, $route) {
  $scope.libState = 0;
})
.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    template: '<div class="row library_title"><h2>Hi: <br>&nbsp;&nbsp&nbsp;&nbsp亲爱的管理员 {{user.nickName}}，<br>&nbsp;&nbsp&nbsp;&nbsp欢迎您!</h2></div>',
    controller: 'adminHomeCtrl'
  })
  .when('/movie-manage', {
    // templateUrl: 'public/admin/movie-index.html',
    template: '<div class="row library_title"><div class="col-md-12 col-md-offset-1"><ul class="nav nav-tabs"><li ng-click="libState=0;" ng-class="{active:libState==0}" role="presentation"><a href="javascript:void(0)" id="add-movie">添加电影</a></li><li ng-click="libState=1;" ng-class="{active:libState==1}" role="presentation"><a href="javascript:void(0)" id="add-category">添加分类</a></li><li ng-click="libState=2;" ng-class="{active:libState==2}" role="presentation"><a href="javascript:void(0)" id="show-movie">查看电影</a></li><li ng-click="libState=3;" ng-class="{active:libState==3}" role="presentation"><a href="javascript:void(0)" id="show-category">查看分类</a></li></ul></div></div><div id="move-windows"></div><script src="/js/move-windows.js"></script>',
    controller: 'moviesCtrl'
  })
  .when('/user-manage', {
  	// tempalteUrl: 
    template: '<div class="row library_title"><div class="col-md-12 col-md-offset-1"><ul class="nav nav-tabs"><li ng-click="libState=0;" ng-class="{active:libState==0}" role="presentation"><a href="javascript:void(0)" id="all-users">所有用户</a></li><li ng-click="libState=1;" ng-class="{active:libState==1}" role="presentation"><a href="javascript:void(0)" id="ordinary-users">普通用户</a></li><li ng-click="libState=2;" ng-class="{active:libState==2}" role="presentation"><a href="javascript:void(0)" id="admin-users">管理员</a></li></ul></div></div><div id="users-windows"></div><script src="/js/users-windows.js"></script>',
    controller: 'usersCtrl'
  })
  .when('/view-active', {
    // tempalteUrl: 
    template: '<div class="row library_title"><div class="col-md-12 col-md-offset-1"><ul class="nav nav-tabs"><li id="all-users-age" ng-click="libState=0;" ng-class="{active:libState==0}" role="presentation"><a href="javascript:void(0)">用户年龄段</a></li><li id="all-users-sex" ng-click="libState=1;" ng-class="{active:libState==1}" role="presentation"><a href="javascript:void(0)">用户性别</a></li><li id="all-categories" ng-click="libState=2;" ng-class="{active:libState==2}" role="presentation"><a href="javascript:void(0)">电影分类</a></li><li id="categories-average-source" ng-click="libState=3;" ng-class="{active:libState==3}" role="presentation"><a href="javascript:void(0)">分类平均评分</a></li><li id="categories-average-click" ng-click="libState=4;" ng-class="{active:libState==4}" role="presentation"><a href="javascript:void(0)">分类平均点击量</a></li><li id="categories-comment-count" ng-click="libState=5;" ng-class="{active:libState==5}" role="presentation"><a href="javascript:void(0)">分类评论量</a></li></ul></div></div><div id="users-windows" class="admin-view"></div><script src="/js/view/active-admin-view.js"></script>',
    controller: 'activeCtrl'
  })
  .when('/account-set', {

  })
  .otherwise({
    redirectTo: '/'
  });
});
