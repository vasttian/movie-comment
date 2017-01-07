$(function() {
  $('.comment').click(function(e) {
    var target = $(this)
    var toId = target.data('tid')
    var commentId = target.data('cid')

    if ($('#toId').length > 0) {
      $('#toId').val(toId)
    }
    else {
      $('<input>').attr({
        type: 'hidden',
        id: 'toId',
        name: 'comment[tid]',
        value: toId
      }).appendTo('#commentForm')
    }

    if ($('#commentId').length > 0) {
      $('#commentId').val(commentId)
    }
    else {
      $('<input>').attr({
        type: 'hidden',
        id: 'commentId',
        name: 'comment[cid]',
        value: commentId
      }).appendTo('#commentForm')
    }
  });
  $("#submitMovieGrade").click(function() {
    var grade = {
      movieId: $("#movieId").val(),
      userId: $("#userId").val(),
      score: $("#movieGrade").val()
    }
    if (grade.score > 10 || grade.score < 3) {
      console.log("这是一个恶意评分!");
      document.getElementById("tips").style.display = "block";
    } else {
      if (document.getElementById("tips")) {
        document.getElementById("tips").style.display = "none";
      }
      console.log('grade:',grade);
      $.ajax({
        type: 'POST', 
        data: grade,
        url: "/movie/grade",
        async: true,
        success: function(data) {
          // console.log('data from grade:', data);
          // console.log('status from grade:', status);
          if (data.status == 1) {
            $("#movieGrade").attr("readOnly", "readOnly");
            $("#submitMovieGrade").css({"display": "none"});
          } else {
            window.location.href = '/signin';
          }
        },
        error: function() {
          console.log('请求出错!')
        }
      });
    }
  });
});