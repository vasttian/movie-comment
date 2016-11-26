$(function() {
	$("#add-movie").click(function () {
		$.get('/admin/movie/add', function(data, status) {
	  	$("#move-windows").html(data);
		});
  });

  $("#add-category").click(function () {
		$.get('/admin/movie/category/add', function(data, status) {
	  	$("#move-windows").html(data);
		});
  });

  $("#show-movie").click(function () {
		$.get('/admin/movie/list', function(data, status) {
	  	$("#move-windows").html(data);
		});
  });

  $("#show-category").click(function () {
		$.get('/admin/movie/category/list', function(data, status) {
	  	$("#move-windows").html(data);
		});
  });
});