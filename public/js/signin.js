$(function() {
  $('#signin').click(function() {
    var userName = $("#userName").val();
    var userPass = $("#userPass").val();
    var data = {
      name: userName,
      password: userPass,
    };

  //   // 获取cookie的值
  // 　var username = getCookie('username');
  // 　var password = getCookie('password');

  // 　// 将获取的值填充入输入框中
  // 　$('#userName').val(username);
  // 　$('#userPass').val(password);

    function setCookie(cname,cvalue,exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = 'expires='+d.toGMTString();
      document.cookie = cname + '=' + cvalue + '; ' + expires;
    }

    function getCookie(cname) {
      var name = cname + '=';
      var ca = document.cookie.split(';');

      for(var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }

      return '';
    }

    var remember = document.getElementById('savePassword').checked;
    if (remember) {
      setCookie("username", userName, 365);
      setCookie("password", userPass, 365);
      alert(getCookie('username'));
    }

    $.ajax({
      type: 'POST',
      data:　data,
      url: '/user/signin',
      async: true,
      success: function(data, status) {
        // console.log("status::",status);
        if (data.status == 'error') {
          $("#signinErrorTips").modal();
        } else if (data.status == 'ok') {
          window.location.href = '/';
        }
      }
    });
  });
});
