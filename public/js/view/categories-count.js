$(function() {
	var myChart = echarts.init(document.getElementById('active-view'), 'macarons');
	
  var option = {
      title: {
          text: '各分类下的电影数量'
      },
      tooltip: {},
      legend: {
          data:['销量']
      },
      xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
      }]
  };
  myChart.setOption(option);
});