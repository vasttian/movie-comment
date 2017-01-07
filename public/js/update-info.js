$(function() {
	$('#datetimepicker').datetimepicker({  
		format: 'YYYY-MM-DD',  
		locale: moment.locale('zh-cn')  
  });

	$('#updateInfoForm').bootstrapValidator({
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
	});

  $('[type=file]').change(function(e) {
    var file = e.target.files[0];
    preview1(file);
  })

  function preview1(file) {
    var img = new Image(), url = img.src = URL.createObjectURL(file);
    var $img = $(img);
    img.onload = function() {
      URL.revokeObjectURL(url);
      $('#userAvatar').empty().append($img);
      $img.addClass("img-circle");
    }
  }
  function preview2(file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var $img = $('<img>').attr("src", e.target.result);
      $('#userAvatar').empty().append($img);
      $img.addClass("img-circle");
    }
    reader.readAsDataURL(file)
  }
});