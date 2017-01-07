$(function() {
	var myChart = echarts.init(document.getElementById('active-view'), 'macarons');
  var option = {};
  if ($("#categoriesCount").hasClass('active')) {
    var seriesData = [];
    var xAxisData = [];
    console.log("请求分类数据");
    $.ajax({
      type: 'GET',
      url: '/active/view/categories/data',
      success: function(data) {
        console.log('data:', data);
        if (data.status == 1) {
          var tdata = data.data;
          console.log("请求分类数据成功!");
          var len = tdata.length;
          for (var i = 0; i < len; ++i) {
            var tname = tdata[i].name;
            xAxisData.push(tname);
          };
          for (var i = 0; i < len; ++i) {
            seriesData.push(tdata[i].movies.length);
          };
          option = {
            title: {
              text: '各分类下的电影数量',
              x: 'center'
            },
            tooltip: {},
            legend: {
              zlevel: 1,
              data: ['分类数量'],
              x: 'left'
            },
            xAxis: {
              data: xAxisData
            },
            yAxis: {},
            series: [{
              name: '分类数量',
              type: 'bar',
              data: seriesData
            }]
          };
          // option.xAxis.data = xAxisData;
          // option.series[0].data = seriesData;
          myChart.setOption(option);
        }
      }
    });
  } else if ($("#categoriesClick").hasClass('active')) {

  } else if ($("#categoriesAverageSource").hasClass('active')) {

  }
});