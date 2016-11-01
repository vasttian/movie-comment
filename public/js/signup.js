$(function() {
	$('#datetimepicker').datetimepicker({  
		format: 'YYYY-MM-DD',  
		locale: moment.locale('zh-cn')  
	});

	$('#signupForm').bootstrapValidator({
		message: '这个值没有被验证',
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			'user[name]': {
				message: '用户名还没有验证',
				validators: {
					notEmpty: {
						message: '用户名不能为空'
					},
					regexp: {
						regexp: /^[a-zA-Z0-9_\.]+$/,
						message: '只能由数字下划线或字母组成'
					},
					stringLength: {
						min: 3,
						max: 16,
						message: '用户名只能是3至16个字符'
					},
					threshold: 3, //3个字符以上才发送ajax请求
	        remote: {	// result:{"valid",true or false} 
	          url: '/user/checkname',
	          message: '用户名已存在，请重新输入',
	          delay:  2000,//2秒发送一次请求
	          type: 'POST'
	        },
				}
			},
			'user[email]': {
				message: 'email还没有验证',
				validators: {
					notEmpty: {
						message: '邮箱不能为空'
					},
					emailAddress: {
						message: '邮箱格式不正确'
					}
				}
			},
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
			'user[tel]': {
				message: '电话号码还没有验证',
				validators: {
					notEmpty: {
						message: '电话号码不能为空'
					},
					stringLength: {
						min: 11,
						max: 11,
						message: '电话号码只能是11位'
					},
					regexp: {
            regexp: /^1[3|5|8]{1}[0-9]{9}$/,
            message: '请输入正确的手机号码'
          }
				}
			}
		}
	}).on('success.form.bv', function (e) {
    // Prevent form submission
    e.preventDefault();
    // Get the form instance
    var $form = $(e.target);
    // Get the BootstrapValidator instance
    var bv = $form.data('bootstrapValidator');
    // Use Ajax to submit form data
    $.post("/user/signup", $form.serialize(), function (data) {
    	console.log(data)
    	if (data.status == "ok") {
    		window.location.href = "/index";
    	}
    	else if (data.status == "error") {
    		window.location.href = "/signup";
    		alert(data.Message);
    	}
    	else {
    		alert("未知错误");
    	}
    });
  });	
});