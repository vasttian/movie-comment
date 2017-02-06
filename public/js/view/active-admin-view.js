$(function() {
	var myChart = echarts.init(document.getElementById('users-windows'), 'macarons');
	var option = {};

	var showAge = function() {
		var seriesData = [];
		console.log('查看用户年龄段');
		$.ajax({
			type: 'GET',
			url: '/active/admin/view/age/data',
			success: function(data) {
				// console.log('data:', data);
				if (data.status == 1) {
					var tdata = data.data;
					// console.log("请求数据成功");
					var len = tdata.length;
					var nowData = moment(moment().format("YYYY-MM-DD"));
					var ageSegment = [];
					for (var i = 0; i < len; ++i) {
						var born = moment(tdata[i].born);
						var age = nowData.diff(born, 'years');
						ageSegment[i] = age;
					}

					var legend_data = ['< 20', '[20-30)', '[30-40)', '[40-60)', '>= 60'];
					for (var i = 0; i < legend_data.length; ++i) {
						seriesData[i] = {
							name: legend_data[i],
							value: 0,
						}
					}

					for (var i = 0; i < len; ++i) {
						if (ageSegment[i] < 20) {
							seriesData[0].value += 1;
						} else if (ageSegment[i] < 30) {
							seriesData[1].value += 1;
						} else if (ageSegment[i] < 40) {
							seriesData[2].value += 1;
						} else if (ageSegment[i] < 60) {
							seriesData[3].value += 1;
						} else {
							seriesData[4].value += 1;
						}
					}

					option = {
			      title: {
			        text: '用户年龄分布',
			        x: 'center',
			      },
			      tooltip: {},
			      legend: {
			        // zlevel: 1000,
			        data: legend_data,
			        x: 'left',
			      },
			      series: [{
			        name: '年龄段',
			        type: 'pie',
			        radius : '55%',
			        center: ['50%', '60%'],
			        data: seriesData,
			      }],
			    };

			    // console.log("option", option);
			    myChart.setOption(option);
				}
			}
		});
	};

	if ($("#all-users-age").hasClass('active')) {
		showAge();
	};

	$("#all-users-age").click(function() {
		showAge();
	});

	$("#all-users-sex").click(function() {
		var seriesData = [];
		console.log('查看用户性别');
		$.ajax({
			type: 'GET',
			url: '/active/admin/view/sex/data',
			success: function(data) {
				// console.log('data:', data);
				if (data.status == 1) {
					var tdata = data.data;
					// console.log("请求数据成功");
					var len = tdata.length;

					var legend_data = ['男', '女'];
					for (var i = 0; i < legend_data.length; ++i) {
						seriesData[i] = {
							name: legend_data[i],
							value: 0,
						}
					}

					for (var i = 0; i < len; ++i) {
						if (tdata[i].sex) {
							seriesData[0].value += 1;
						} else {
							seriesData[1].value += 1;
						}
					}

					option = {
			      title: {
			        text: '用户性别分布',
			        x: 'center',
			      },
			      tooltip: {},
			      legend: {
			        // zlevel: 1000,
			        data: legend_data,
			        x: 'left',
			      },
			      series: [{
			        name: '性别',
			        type: 'pie',
			        radius : '55%',
			        center: ['50%', '60%'],
			        data: seriesData,
			      }],
			    };

			    // console.log("option", option);
			    myChart.setOption(option);
				}
			}
		});
	});

	$("#all-movie-categories").click(function() {
		var seriesData = [];
		var xAxisData = [];
		console.log('查看电影分类');
		$.ajax({
			type: 'GET',
			url: '/active/admin/view/movie/categories/data',
			success: function(data) {
				console.log('data:', data);
				if (data.status == 1) {
					var tdata = data.data;
					// console.log("请求数据成功");
					var len = tdata.length;
					for (var i = 0; i < len; ++i) {
						xAxisData.push(tdata[i].name);
						seriesData.push(tdata[i].movies.length);
					}

					option = {
			      title: {
			        text: '电影分类',
			        x: 'center',
			      },
			      tooltip: {},
			      legend: {
			        // zlevel: 1000,
			        data: ['分类数量'],
			        x: 'left',
			      },
			      xAxis: {
              data: xAxisData,
            },
            yAxis: {},
			      series: [{
			        name: '电影分类',
			        type: 'bar',
			        data: seriesData,
			      }],
			    };

			    // console.log("option", option);
			    myChart.setOption(option);
				}
			}
		});
	});
});