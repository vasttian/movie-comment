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
	
});