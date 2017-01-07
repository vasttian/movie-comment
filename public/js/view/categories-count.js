$(function() {
	var myChart = echarts.init(document.getElementById('active-view'), 'macarons');
  var option = {};
  var seriesData = [];
  var xAxisData = [];
  if ($("#categoriesCount").hasClass('active')) {
    console.log("请求分类数据");
    $.ajax({
      type: 'GET',
      url: '/active/view/categories/count/data',
      success: function(data) {
        console.log('data:', data);
        if (data.status == 1) {
          var tdata = data.data;
          console.log("请求分类数据成功!");
          var len = tdata.length;
          for (var i = 0; i < len; ++i) {
            var tname = tdata[i].name;
            xAxisData.push(tname);
            seriesData.push(tdata[i].movies.length);
          };
          option = {
            title: {
              text: '分类电影数量',
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
          myChart.setOption(option);
        }
      }
    });
  } else if ($("#categoriesClick").hasClass('active')) {
    console.log("请求分类点击量");
    $.ajax({
      type: 'GET',
      url: '/active/view/categories/click/data',
      success: function(data) {
        console.log('data:', data);
        if (data.status == 1) {
          var tdata = data.data;
          console.log("请求分类点击量成功!");
          var len = tdata.length;
          for (var i = 0; i < len; ++i) {
            var tname = tdata[i].name;
            xAxisData.push(tname);
            seriesData.push(tdata[i].countPv);
          };
          option = {
            title: {
              text: '分类点击量',
              x: 'center'
            },
            tooltip: {},
            legend: {
              zlevel: 1,
              data: ['点击量'],
              x: 'left'
            },
            xAxis: {
              data: xAxisData
            },
            yAxis: {},
            series: [{
              name: '点击量',
              type: 'bar',
              data: seriesData,
              itemStyle: {
                normal: {
                  color: "#87CEEB"
                }
              }
            }]
          };
          myChart.setOption(option);
        }
      }
    });

  } else if ($("#categoriesAverageSource").hasClass('active')) {
    console.log("请求分类平均分");
    $.ajax({
      type: 'GET',
      url: '/active/view/categories/averagescore/data',
      success: function(data) {
        console.log('data:', data);
        if (data.status == 1) {
          var tdata = data.data;
          console.log("请求分类平均分成功!");
          var len = tdata.length;
          for (var i = 0; i < len; ++i) {
            var tname = tdata[i].name;
            xAxisData.push(tname);
            seriesData.push(tdata[i].sumScore);
          };
          option = {
            title: {
              text: '分类平均分',
              x: 'center'
            },
            tooltip: {},
            legend: {
              zlevel: 1,
              data: ['平均分'],
              x: 'left'
            },
            xAxis: {
              data: xAxisData
            },
            yAxis: {},
            series: [{
              name: '平均分',
              type: 'bar',
              data: seriesData,
              itemStyle: {
                normal: {
                  color: "#A020F0"
                }
              }
            }]
          };
          myChart.setOption(option);
        }
      }
    });
  }
});