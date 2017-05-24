$(function() {
  console.log("movie-score-by-age: ", movie);
  // for (var val of movie) {
  // 	console.log(val)
  // }
  var myChart = echarts.init(document.getElementById('active-view'), 'macarons');
  var option = {};
  var seriesData = [];
  var statistics = [];
  var xAxisData = [];
  // var lengthData = ['[0, 12]', '(12, 18]', '(18, 30]', '(30, 50]', '(50, 70]'];
  for (var i = 0; i < 5; ++i) {
  	statistics[i] = {
  		cont: 0,
  		sum: 0,
  	};
  	seriesData[i] = 0;
  }

  for (var i = 0, len = movie.length; i < len; ++i) {
    var userAge = movie[i].age;
    var score = movie[i].score;

    if (userAge >= 0 && userAge <= 12) {
    	statistics[0].cont++;
    	statistics[0].sum += score;
    } else if (userAge > 12 && userAge <= 18) {
    	statistics[1].cont++;
    	statistics[1].sum += score;
    } else if (userAge > 18 && userAge <= 30) {
    	statistics[2].cont++;
    	statistics[2].sum += score;
    } else if (userAge > 30 && userAge <= 50) {
    	statistics[3].cont++;
    	statistics[3].sum += score;
    } else if (userAge > 50 && userAge <= 70) {
    	statistics[4].cont++;
    	statistics[4].sum += score;
    }

    for (var i = 0; i < 5; ++i) {
    	if (statistics[i].cont > 0) {
	    	seriesData[i] = parseFloat((statistics[i].sum / statistics[i].cont).toFixed(2));
    	}
    }
  }

  option = {
    title: {
      text: movieTitle,
      x: 'center',
    },
    tooltip: {},
    legend: {
      // zlevel: 1,
      data: ['各年龄段评分'],
      left: 'left',
    },
    xAxis: {
      data: ['[0, 12]', '(12, 18]', '(18, 30]', '(30, 50]', '(50, 70]'],
    },
    yAxis: {
    	type : 'value',
      axisLabel : {
        formatter: '{value} 分',
      },
    },
    series: [
      {
        name: '各年龄段评分',
        type: 'line',
        data: seriesData,
        markPoint : {
        	data : [
        		{ type: 'max', name: '最大值', },
        		{ type: 'min', name: '最小值', },
        	],
        },
        markLine : {
        	data : [
        		{ type: 'average', name: '平均值', },
        	],
        },
      }
    ],
  };

  myChart.setOption(option);
});
