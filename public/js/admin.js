$(function() {

	$('#addMovieForm').bootstrapValidator({
		message: '这个值没有被验证',
		feedbackIcons: {
	  	valid: 'glyphicon glyphicon-ok',
	  	invalid: 'glyphicon glyphicon-remove',
	  	validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
	  	'movie[title]': {
				message: '电影名字还没有验证',
				validators: {
		 			notEmpty: {
						message: '电影名字不能为空'
		  		}
				}
			}
		}
	});

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
				url: "https://api.douban.com/v2/movie/subject/" + id,
				cache: true,
				type: "get",
				dataType: "jsonp",
				crossDomain: true,
				jsonp: "callback",
				success: function(data) {
					// console.log(data);
					// https://developers.douban.com/wiki/?title=movie_v2#get_book
					$("#inputCategories").val(data.genres[0]);
					$("#inputTitle").val(data.title);
					$("#inputDoctor").val(data.directors[0].name);
					$("#inputProtagonist").val(data.casts[0].name);
					$("#inputCountry").val(data.countries[0]);
					if (data.languages) {
						$("#inputLanguage").val(data.languages[0]);
					}
					$("#inputPoster").val(data.images.large);
					if (data.trailer_urls) {
						$("#inputFlash").val(data.trailer_urls[0]);
					}
					if (data.pubdates) {
						$("#inputDate").val(data.pubdates[0]);
					}
					if (data.durations) {
						$("#inputMovieTime").val(data.durations);
					}
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
});