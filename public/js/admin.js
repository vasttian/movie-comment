$(function() {

	$(".del").click(function(e) {
		var target = $(e.target);
		var id = target.data("id");
		var tr = $(".item-id-"+id);
		$.ajax({
			type: 'DELETE',
			url: "/admin/movie/list?id=" +id,
			async: true,
			success: function(req) {
				if (tr.length > 0) {
					tr.remove();
				}
			},
			error: function() {
				alert("出错");
			}
		})
	});

	$("#douban").blur(function() {
		var douban = $(this);
		var id = douban.val();
		if (id) {
			$.ajax({
				url:"https://api.douban.com/v2/movie/subject/" + id,
				cache:true,
				type:"get",
				dataType:"jsonp",
				crossDomain:true,
				jsonp:"callback",
				success: function(data) {
					$("#inputTitle").val(data.title);
					$("#inputDoctor").val(data.directors[0].name);
					$("#inputCountry").val(data.countries[0]);
					$("#inputPoster").val(data.images.large);
					$("#inputDate").val(data.year);
					$("#inputSummary").val(data.summary);
				}
			});
		}
	});

	$(".updateMovie").click(function(e) {
		var target = $(e.target);
		var id = target.data("id");
		 $.ajax({
      type: 'GET',
      url: "/admin/movie/update/"+id,
      async: true,
      success: function(data, status) {
      	$("#move-windows").html(data);
				// $("#add-movie").trigger("click");
      }
    });
	});

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