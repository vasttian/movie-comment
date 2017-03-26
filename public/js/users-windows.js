$(function() {
	$("#all-users").click(function () {
		$.get('/admin/user/list', function(data, status) {
	  	$("#users-windows").html(data);
		});
  });
  $("#ordinary-users").click(function () {
		$.get('/admin/ordinary/user/list', function(data, status) {
	  	$("#users-windows").html(data);
		});
  });
  $("#admin-users").click(function () {
		$.get('/admin/admin/user/list', function(data, status) {
	  	$("#users-windows").html(data);
		});
  });
});