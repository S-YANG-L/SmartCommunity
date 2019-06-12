var ViewModel = function() {

};
var viewModel = new ViewModel();
var start = 0;
var starts = 0;
//页面加载
summerready = function() {
	datesourse();
	viewModel.data = ko.observableArray([]);
	viewModel.cont = ko.observableArray([]);
ko.applyBindings(viewModel);
	var listview1 = UM.listview("#listview1");
	//行点击事件，获取未完成当前行数据
	listview1.on("itemClick", function(sender, args1) {
		var info1 = viewModel.data()[args1.rowIndex];
		summer.setStorage("info1", info1);
	})
	listview1.on("pullUp", function(sender) {
		start += 10;
		//这是可以编写列表上拉加载逻辑，参数sender即为当前列表实例对象
		summer.ajax({
			"header" : {
				Authorization : "OAuth2: token"
			},
			"type" : "POST",
			"url" : summer.getAppStorage('url') + "/aboutAppointmentController/list",
			"param" : {
				"token" : summer.getAppStorage("tokenEntity").token,
				"tenantId" : summer.getAppStorage("tenantid"),
				"applicantId" : summer.getAppStorage("userId"),
				"billStatus" : 0,
				"start" : start
			},
		}, function(response) {//成功回调
			var data = JSON.parse(response.data);
			if (data.code == "200") {
				var jsonArray = data.list;
				if (jsonArray.length > 0) {
					for (var i = 0; i < jsonArray.length; i++) {
						var entity = jsonArray[i];
						viewModel.data.push(entity)
						sender.refresh();
					}
				} else {
					viewModel.data.push()
					sender.refresh();
					summer.toast({
						"msg" : "数据已加载完毕"
					})
				}
			}
		}, function(response) {//失败回调
			alert("系统开小差了,请联系管理员！");
		});
	});

	var listview2 = UM.listview("#listview2");
	//行点击事件，获取已完成当前行数据
	listview2.on("itemClick", function(sender, args2) {
		var info2 = viewModel.cont()[args2.rowIndex];
		summer.setStorage("info2", info2);
	})
	listview2.on("pullUp", function(sender) {
		start += 10;
		//这是可以编写列表上拉加载逻辑，参数sender即为当前列表实例对象
		summer.ajax({
			"header" : {
				Authorization : "OAuth2: token"
			},
			"type" : "POST",
			"url" : summer.getAppStorage('url') + "/aboutAppointmentController/list",
			"param" : {
				"token" : summer.getAppStorage("tokenEntity").token,
				"tenantId" : summer.getAppStorage("tenantid"),
				"applicantId" : summer.getAppStorage("userId"),
				"billStatus" : 1,
				"start" : start
			},
		}, function(response) {//成功回调
			var data = JSON.parse(response.data);
			if (data.code == "200") {
				var jsonArray1 = data.list;
				if (jsonArray1.length > 0) {
					for (var k = 0; k < jsonArray1.length; k++) {
						var entity = jsonArray1[k];
						viewModel.cont.push(entity)
						sender.refresh();
					}
				} else {
					viewModel.cont.push()
					sender.refresh();
					summer.toast({
						"msg" : "数据已加载完毕"
					})
				}
			}
		}, function(response) {//失败回调
			alert("系统开小差了,请联系管理员！");
		});
	});
}

//页面加载数据调用的方法
function datesourse() {
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage("url") + '/aboutAppointmentController/list',
		param : {
			"token" : summer.getAppStorage("tokenEntity").token,
			"tenantId" : summer.getAppStorage("tenantid"),
			"applicantId" : summer.getAppStorage("userId"),
			"billStatus" : 0,
			"start" : starts
		},
		header : {
			Authorization : "OAuth2: token",
		}
	}, function(response) {
		var data = JSON.parse(response.data);
		var jsonArray = data.list;
		for (var i = 0; i < jsonArray.length; i++) {
			var entity = jsonArray[i];
			viewModel.data.push(entity)
		}
		if (jsonArray.length == 0) {
			UM.toast({
				title : '温馨提示',
				text : '暂无未完成约看记录!',
				duration : 1200
			});
		}
	});
}

//页面加载数据调用的方法
function datesourses() {
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage("url") + '/aboutAppointmentController/list',
		param : {
			"token" : summer.getAppStorage("tokenEntity").token,
			"tenantId" : summer.getAppStorage("tenantid"),
			"applicantId" : summer.getAppStorage("userId"),
			"billStatus" : 1,
			"start" : starts
		},
		header : {
			Authorization : "OAuth2: token",
		}
	}, function(response) {
		var data = JSON.parse(response.data);
		var jsonArray1 = data.list;
		for (var k = 0; k < jsonArray1.length; k++) {
			var entity = jsonArray1[k];
			viewModel.cont.push(entity)
		}
		if (jsonArray1.length == 0) {
			UM.toast({
				title : '温馨提示',
				text : '暂无已完成约看记录!',
				duration : 1200
			});
		}
	});
}

//关闭当前页返回上一页
function goBack() {
	summer.closeWin({});
}

//跳转未完成页面
function goDetail1() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "unfinishedAD" + t,
		"url" : "html/my/unfinishedAD.html"
	});
}

//跳转已完成页面
function goDetail2() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "finishedAD" + t,
		"url" : "html/my/finishedAD.html"
	});
}

