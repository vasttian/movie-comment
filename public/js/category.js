$(function() {
  $(".delCategory").click(function(e) {
	var target = $(e.target);
	var id = target.data("id");
	var tr = $(".item-id-"+id);
	$.ajax({
	  type: 'DELETE',
	  url: "/admin/movie/category/list?id=" +id,
	  async: true,
	  success: function(req) {
		//console.log(req);
		if (tr.length > 0) {
		  tr.remove();
		}
	  },
	  error: function() {
		alert("出错");
	  }
	})
  });
  // $("#add-category").click(function() {
  // 	$("#show-category").trigger("click");
  // });
});