$(function() {

	$(".del").click(function(e) {
		var target = $(e.target);
		var id = target.data("id");
		var tr = $(".item-id-" + id);;
		var data = {
			id: id
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

	$(".updatePower").click(function(e) {
		var num = $("#role").val();
		var id = $("#userId").val();
		var data = {
			id: id,
			role: num
		};
		$.ajax({
			type: "POST",
			data: data,
			url: "/admin/update/role",
			async: true,
			success: function(data) {
				if (data.status == 1) {
					$("#updateUserPower").modal('hide');
				}
			},
			error: function() {
				console.log("更新用户权限失败!");
			}
		});
	});

	$(".update").click(function(e) {
		var target = $(e.target);
		var id = target.data("id");
		$("#userId").val(id);
	});
});