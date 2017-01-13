$(function() {
	$("#all-users").click(function () {
		$.get('/admin/user/list', function(data, status) {
	  	$("#users-windows").html(data);
		});
  });
  $("#general-users").click(function () {
		$.get('/admin/user/general/list', function(data, status) {
	  	$("#users-windows").html(data);
		});
  });
  $("#admin-users").click(function () {
		$.get('/admin/user/admin/list', function(data, status) {
	  	$("#users-windows").html(data);
		});
  });
});