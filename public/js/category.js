angular.module('categoryApp', [])
.factory('categoryFactory', ['$http', '$q', function($http, $q) {
  var service = {};
  service.callCategory = function() {
  	var defered = $q.defer();
  	var config = {
  	  method: 'POST',
  	  url: '/admin/movie/category',
  	  data: '23'
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
.controller('categoryCtrl', ['$scope', 'categoryFactory', function($scope, categoryFactory) {
  $scope.category = {
  	name: '213'
  };
  console.log("234z34hi:",categoryFactory.callCategory.config);
  $scope.addCategory = function() {
	console.log("234zhi:",categoryFactory.callCategory.config);
  };
}]);