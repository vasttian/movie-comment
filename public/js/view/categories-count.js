$(function() {
	var myChart = echarts.init(document.getElementById('active-view'), 'macarons');
  var option = {};
  var seriesData = [];
  var xAxisData = [];
  var lengthData = [];

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
          }

          option = {
            title: {
              text: '分类电影数量',
              x: 'center',
            },
            tooltip: {},
            legend: {
              zlevel: 1,
              data: ['分类数量'],
              x: 'left',
            },
            xAxis: {
              data: xAxisData,
            },
            yAxis: {},
            series: [{
              name: '分类数量',
              type: 'bar',
              data: seriesData,
            }],
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
            lengthData.push(tname);
            seriesData.push({value: tdata[i].countPv, name: tdata[i].name});
          }

          option = {
            title: {
              text: '分类点击量',
              x: 'center',
            },
            tooltip: {},
            legend: {
              zlevel: 1,
              data: lengthData,
              x: 'left',
            },
            calculable : true,
            series: [{
              name: '点击量',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data: seriesData,
            }],
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
          }

          option = {
            title: {
              text: '分类平均分',
              x: 'center',
            },
            tooltip: {},
            legend: {
              zlevel: 1,
              data: ['平均分'],
              x: 'left'
            },
            xAxis: {
              data: xAxisData,
            },
            yAxis: {},
            series: [{
              name: '平均分',
              type: 'bar',
              data: seriesData,
              itemStyle: {
                normal: {
                  color: "#87CEEB",
                }
              },
            }],
          };

          myChart.setOption(option);
        }
      }
    });
  } else if ($("#movieAverageSourceTop10").hasClass('active')) {
    console.log("电影得分Top10");
    $.ajax({
      type: 'GET',
      url: '/active/view/movie/averagescore/top10/data',
      success: function(data) {
        console.log('data:', data);
        if (data.status == 1) {
          var tdata = data.data;
          console.log("电影得分Top10成功!");
          var len = tdata.length;

          for (var i = 0; i < len; ++i) {
            var tname = tdata[i].title;
            xAxisData.push(tname);
            seriesData.push(tdata[i].score.average);
          }

          option = {
            title: {
              text: '电影得分Top10',
              x: 'center',
            },
            tooltip: {},
            legend: {
              zlevel: 1,
              data: ['电影得分'],
              x: 'left',
            },
            grid: {
              y2: 100,
            },
            xAxis: {
              data: xAxisData,
              axisLabel : {
                show:true,
                interval: 0,
                rotate: 45,
                // margin: 18,
                // formatter: '{value} ml',    // Template formatter!
                textStyle: {
                  // color: '#1e90ff',
                  fontFamily: 'verdana',
                  // fontSize: 10,
                  fontStyle: 'normal',
                  // fontWeight: 'bold'
                }
              },
            },
            yAxis: {},
            series: [{
              name: '电影得分',
              type: 'bar',
              data: seriesData,
              itemStyle: {
                normal: {
                  color: "#00CED1",
                  label: {
                    show: true,
                    position: 'top',
                    formatter: function (params) {
                      return parseFloat(params.value.toFixed(2));
                    },
                    textStyle: {
                      color: 'Blue',
                      fontSize: 15,
                    }
                  }
                }
              },
            }],
          };

          myChart.setOption(option);
        }
      }
    });
  }
  // myChart.setOption('shine')
});
