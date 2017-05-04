$(function() {
  $('#signin').click(function() {
    var data = {
      name: $("#userName").val(),
      password: $("#userPass").val(),
    };
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
