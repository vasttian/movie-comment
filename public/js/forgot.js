$(function() {

	$('#forgotPassword').bootstrapValidator({
		message: '这个值没有被验证',
		feedbackIcons: {
	  	valid: 'glyphicon glyphicon-ok',
	  	invalid: 'glyphicon glyphicon-remove',
	  	validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			'user[password]': {
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
						message: '密码长度在6至16之间'
	  		  },
	  		  identical: {
						field: 'user[password]',
						message: '两次密码不一致,请重新输入'
	  		  }
				}
	  	},
	  }
	});

  $("#findPassword").click(function() {
    var data = {
      name: $("#userName").val(),
      problem: $("#problem").val(),
      problemAnswer: $("#problemAnswer").val(),
      password: $("#userPass").val()
    };
    $.ajax({
      type: 'POST',
      data:　data,
      url: "/forgot/password",
      async: true,
      success: function(data, status) {
        // console.log("status::",status);
        if (data.status == "error") {
          $("#findPasswordErrorTips").modal();
        } else if (data.status == "ok") {
          window.location.href = "/";
        }
      }
    });
  });
});