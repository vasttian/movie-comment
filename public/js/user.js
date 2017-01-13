$(function() {

	$(".del").click(function(e) {
		var target = $(e.target);
		var id = target.data("id");
		console.log('id', id);
		var tr = $(".item-id-" + id);;
		var data = {
			id : id
		};
		$.ajax({
			type: "POST",
			data: data,
			url: "/admin/del/user",
			async: true,
			success: function(data) {
				if (data.status == 1) {
					if (tr.length) {
						tr.remove();
					}
				}
			},
			error: function() {
				console.log("删除用户失败!");
			}
		});
	});
});