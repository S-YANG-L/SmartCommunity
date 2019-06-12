var ViewModel = function() {

};
var viewModel = new ViewModel();
var jsonArray = '';
var start = 0;
summerready = function() {
	datesourse();
	viewModel.data = ko.observableArray([]);
	ko.applyBindings(viewModel);
	var listview = UM.listview("#listview");
	//行点击事件，并获取当前行数据
	listview.on("itemClick", function(sender, args) {
		var oneInfo = viewModel.data()[args.rowIndex];
		summer.setStorage('oneInfo', oneInfo)
	})

	listview.on("pullUp", function(sender) {
		var theId = summer.getAppStorage("userId");
		start += 10;
		//这是可以编写列表上拉加载逻辑，参数sender即为当前列表实例对象
		summer.ajax({
			type : 'post',
			url : summer.getAppStorage("url") + '/myCollectionController/listMyCollection',
			param : {
				"token" : summer.getAppStorage("tokenEntity").token,
				"collectorId" : summer.getAppStorage("userId"),
				"tenantId" : summer.getAppStorage("tenantid"),
				"start" : start,
			},
			header : {
				Authorization : "OAuth2: token",
			}
		}, function(response) {
			var data = JSON.parse(response.data);
			if (data.code == "200") {
				var jsonArray = data.collectionList;
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
						"msg" : "数据已全部加载"
					})
				}
			}
		}, function(response) {//失败回调
			alert("系统开小差了，请联系管理员！");
		});
	})
}
//页面数据循环，展示列表
function datesourse() {
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage("url") + '/myCollectionController/listMyCollection',
		param : {
			"token" : summer.getAppStorage("tokenEntity").token,
			"collectorId" : summer.getAppStorage("userId"),
			"tenantId" : summer.getAppStorage("tenantid"),
			"start" : start,
		},
		header : {
			Authorization : "OAuth2: token",
		}
	}, function(response) {
		var data = JSON.parse(response.data);
		if (data.code == "200") {
			var jsonArray = data.collectionList;
			for (var i = 0; i < jsonArray.length; i++) {
				var entity = jsonArray[i];
				viewModel.data.push(entity)
			}
			if (jsonArray.length == 0) {
				UM.toast({
					title : '温馨提示',
					text : '暂无数据!',
					duration : 1500
				});
			}
		}
	});
}

//关闭当前页返回到上一页
function goBack() {
	summer.closeWin({});
}

//跳转到我的收藏房屋信息
function leaseInfo() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "leaseInfo" + t,
		"url" : "html/my/myCollectInfo.html"
	});
}
