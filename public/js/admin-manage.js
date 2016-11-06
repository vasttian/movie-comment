$(function() {
	$("#movie-manage").click(function() {
		$.get('/admin/movie/new', function(data, status) {
			$("#admin-module").html(data);
		});
	});
});