$(function() {
	$("#all-users").click(function () {
		$.get('/admin/movie/add', function(data, status) {
	  	$("#move-windows").html(data);
		});
  });
  $("#general-users").click(function () {
		$.get('/admin/movie/add', function(data, status) {
	  	$("#move-windows").html(data);
		});
  });
  $("#admin-users").click(function () {
		$.get('/admin/movie/add', function(data, status) {
	  	$("#move-windows").html(data);
		});
  });
});