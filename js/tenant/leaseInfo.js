summerready = function() {
	datesourse();
	loadPicture();
}
function loadPicture() {
	summer.ajax({
		"header" : {
			Authorization : "OAuth2:token",
		},
		"type" : "POST",
		"url" : summer.getAppStorage('imgurl')+"/uploadfile/getfileinfo",
		"async" : "false",
		"param" : {
			token : summer.getAppStorage("tokenEntity").token,
			batchno : summer.getStorage("photoContent"),
		},
	}, function(response) {//成功回调
		setTimeout(function() {
			response.data = JSON.parse(response.data);
			var jsonArray2 = $summer.strToJson(response.data.message);
			var list = jsonArray2;
			var islider = new iSlider({
				type : 'pic',
				data : list,
				dom : document.getElementById("iSlider-wrapper"),
				isLooping : true,
				animateType : 'default',
				isAutoplay : true,
				animateTime : 800
			});
			islider.addDot();
		}, 100);
	}, function(response) {//失败回调
		alert("系统开小差了，请联系管理员！");
	});
}

//跳转到预约看房申请
function want() {
	var theHouseId = summer.getStorage("oneHouseId");
	summer.setStorage("theHouseId", theHouseId)

	var topInfo = $("#communityName").text() + $("#villageName").text() + $("#buildingName").text() + $("#unitNumber").text() + $("#houseName").text();
	summer.setStorage("topInfo", topInfo);

	var centerInfo = $("#mianji").text() + 'm²' + '|' + $("#apartmentName").text();
	summer.setStorage("centerInfo", centerInfo);

	var bottomInfo = $("#fangzu").text() + '￥/月';
	summer.setStorage("bottomInfo", bottomInfo);

	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "want"+t,
		"url" : "html/tenant/myLeaseRequest.html"
	});
}

var ViewModel = function() {

};
var viewModel = new ViewModel();
//加载房屋信息
function datesourse() {
	//获取id的缓存
	var theHouseInfoId = summer.getStorage("oneHouseId");
	summer.post(summer.getAppStorage("url") + "/houseLeasingController/list", {
		"token" : summer.getAppStorage("tokenEntity").token,
		"tenantId" : summer.getAppStorage("tenantid"),
		"id" : theHouseInfoId
	}, {
		Authorization : "OAuth2:token",
	}, function(response) {
		//alert(response.data);
		response.data = JSON.parse(response.data);
		var jsonArray = response.data.houseList;
		viewModel.data = ko.observableArray(jsonArray);
		ko.applyBindings(viewModel);
	}, function(response) {
		alert("系统开小差了，请联系管理员！");
	});
}

//房源收藏
function collecting() {
	var pageHouseId = $("#houseId").text();
	var uId = summer.getAppStorage("userId");	
	UM.alert({
	    title: '是否确认收藏此房源',
	    btnText: ["取消", "确定"],
	    overlay: true,
	    ok: function () {
			summer.ajax({
				type : 'post',
				url : summer.getAppStorage("url") + '/myCollectionController/listMyCollection',
				param : {
					"token" : summer.getAppStorage("tokenEntity").token,
					"tenantId" : summer.getAppStorage("tenantid"),
					"houseId" : pageHouseId,
					"collectorId" : uId,
				},
				header : {
					Authorization : "OAuth2: token",
				}
			}, function(response) {
				response.data = JSON.parse(response.data);
				var jsonArray1 = response.data.collectionList;
				for (var i = 0; i <= jsonArray1.length; i++) {
					if (jsonArray1.length > 0) {
						var theHouseId = jsonArray1[i].houseId;
					}
					if (theHouseId == pageHouseId) {
						UM.alert({
							title : '您已收藏过此房源,不可重复收藏 ！',
							btnText : ["取消", "确定"],
							overlay : true,
							ok : function() {
							}
						});
					} else {
						var communityName = $("#communityName").text();
						var villageName = $("#villageName").text();
						var buildingName = $("#buildingName").text();
						var houseName = $("#houseName").text();
						var communityId = $("#communityId").text();
						var villageId = $("#villageId").text();
						var buildingId = $("#buildingId").text();
						var houseId = $("#houseId").text();
						var apartmentId = $("#apartmentId").text();
						var apartmentName = $("#apartmentName").text();
						var collectorId = summer.getAppStorage("userId");
						var collectorName = summer.getAppStorage("userName");
						var tanantId = summer.getAppStorage("tanantid");
						var tablePrice = $("#fangzu").text();
						var houseRemark = $("#fwjj").text();
						var inJacketArea = $("#mianji").text();
						var tablePrice = $("#fangzu").text();
						summer.post(summer.getAppStorage("url") + "/myCollectionController/saveMyCollection", {
							"token" : summer.getAppStorage("tokenEntity").token,
							"houseId" : houseId,
							"houseName" : houseName,
							"communityId" : communityId,
							"communityName" : communityName,
							"villageName" : villageName,
							"villageId" : villageId,
							"buildingName" : buildingName,
							"buildingId" : buildingId,
							"collectorId" : collectorId,
							"collectorName" : collectorName,
							"tanantId" : tanantId,
							"apartmentId" : apartmentId,
							"apartmentName" : apartmentName,
							"tablePrice" : tablePrice,
							"houseRemark" : houseRemark,
							"inJacketArea" : inJacketArea,
							"tablePrice" : tablePrice
						}, {
							Authorization : "OAuth2:token"
						}, function(response) {
							if ("Token已过期，请重新登录" == response.data) {
								UM.toast({
									text : '登录已失效，请重新登录'
								});
								var t = (new Date()).valueOf();
								summer.openWin({
									"id" : "signin"+t,
									"url" : "html/signin.html"
								});
							}
							response.data = JSON.parse(response.data);
							var code = response.data.code;
							if (code == 200) {
								UM.alert({
									title : '您已成功收藏此房源 ！',
									btnText : ["取消", "确定"],
									overlay : true,
									ok : function() {
									}
								});
		
							}
						}, function(response) {
							alert("系统开小差了，请联系管理员！");
						});
					}
				}
		
			});
		}
	});
}

//跳转到签约流程
function seeProcess() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "signingProcess"+t,
		"url" : "html/tenant/signingProcess.html"
	});
}