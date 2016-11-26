$(function() {

	$('#updatePassForm').bootstrapValidator({
		message: '这个值没有被验证',
		feedbackIcons: {
	  	valid: 'glyphicon glyphicon-ok',
	  	invalid: 'glyphicon glyphicon-remove',
	  	validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			'user[password]': {
	  		message: '原密码还没验证',
	  		validators: {
	  			notEmpty: {
	  				message: '原密码不能为空'
	  			},
	  			threshold: 3,
	  			remote: {
	  				url: '/check/originpassword',
	  				message: '原密码不正确',
	  				delay:  2000,//2秒发送一次请求
	      	  type: 'POST'
	  			}
	  		}
	  	},
	  	'user[newPass]': {
				message: '密码还没有验证',
				validators: {
		  		notEmpty: {
						message: '密码不能为空'
		  		},
		 			stringLength: {
						min: 6,
						max: 16,
						message: '密码长度在6至16个字符'
		 			},
		  		different: {
						field: 'user[name]',
						message: '密码不能和用户名相同'
		  		}
				}
	  	},
	  	'user[confirmPass]': {
				message: '密码确认还没有验证',
				validators: {
		  		notEmpty: {
						message: '密码还没有确认'
	  		  },
	  		  stringLength: {
						min: 6,
						max: 16,
						message: '密码长度在6至16个字符'
	  		  },
	  		  identical: {
						field: 'user[newPass]',
						message: '两次密码不一致,请重新输入'
	  		  }
				}
	  	}
	  }
	});
});