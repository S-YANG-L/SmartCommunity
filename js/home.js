function openPay() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : 'pay'+t,
		url : 'html/payment.html',
	});
}

function openhouse() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : 'houseInfo'+t,
		url : 'html/houseInfo.html',
	});
}

function openRepair() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : 'repair'+t,
		url : 'html/repair.html',
	});
}

function openDoor() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : 'door'+t,
		url : 'html/door.html',
	});
}

function openLease() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : 'lease'+t,
		url : 'html/lease.html',
	});
}

function openPark() {
	var t = (new Date()).valueOf();
	summer.openWin({
		//id : 'parking'+t,
		url : 'https://dsf.etcp.cn/currencyAlipay/login',
	});
}

function goMessage() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : 'message'+t,
		url : 'html/message.html',
	});
}

function goMyDoors() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : 'myDoors'+t,
		url : 'html/doors.html',
	});
}

//跳转到社区公告
function goNotice() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : 'noticeList'+t,
		url : 'html/communityNotice.html',
	});
}

//跳转到社区黄页
function goMails() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : 'noticeList'+t,
		url : 'html/communityMailList.html',
	});
}

//跳转到社区商圈
function goTradingArea() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : 'noticeList'+t,
		url : 'html/communityShopping.html',
	});
}

//首页跳转到服务中心
function goMore() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : 'serverCenter'+t,
		url : 'html/serverCenter.html',
	});
}

summerready = function() {
	getServer();
	loadPicture();
}
function getServer() {
	$("#server").empty();
	summer.post(summer.getAppStorage("url") + "/serviceCenterController/list", {
		"token" : summer.getAppStorage("tokenEntity").token,
		"tenantId":summer.getAppStorage("tenantid")
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
			var list = response.data.list;
			for (var i = 0; i < 2; i++) {
				var str =  '<div class="um-servicelist">'
				+ '	<div class="um-servicelistzt">' 
				+ '		<div class="um-servicemsg">'
				+ '		<p class="servicep1" id="p1">'+list[i].serviceTitle+'</p>' 
				+ '		<p class="servicep2" id="p2"><span><img src="../img/phoneicon.png"></span>'+list[i].serviceContactInformation+'</p>'
				+ '		<p class="servicep3"><img src="../img/service03.png" onclick="addService(this)"></p>'
				+ '		</div>' 
				+ '		<div class="um-serviceimg">' 
				+ '		<img src="'+list[i].imgUrl+'">'
				+ '		</div>'
				+ '		</div>'
				+ '		</div>';
				$("#server").append(str);
			}
		}
	}, function(response) {
		alert("系统开小差了，请联系管理员!");
	});
};

//新增预约服务
function addService(s) {
	var userId = summer.getAppStorage("userId");
	var tenantid = summer.getAppStorage("tenantid");
	var userPhone = summer.getAppStorage("userPhone");
	var userName = summer.getAppStorage("userName");

	var title = $(s).parent().parent().find("#p1").text();
	var sphone = $(s).parent().parent().find("#p2").text();

	var houseName = $("#room").text();
	var address = $("#address").text();
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "serverAdd"+t,
		"url" : "html/tenant/serverAdd.html?title=" + title + "&sphone=" + sphone
	});
};

var ViewModel = function() {

};
var viewModel = new ViewModel();
var jsonArray = '';
function datesourse() {
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage("url") + '/serviceCenterController/homeList',
		param : {
			"token" : summer.getAppStorage("tokenEntity").token,
			"tenantId" : summer.getStorage("tenantid")
		},
		header : {
			Authorization : "OAuth2: token",
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		jsonArray = response.data.homeList;
		viewModel.data = ko.observableArray(jsonArray);
		ko.applyBindings(viewModel);
	});
}

//获取轮播图
function loadPicture() {
	summer.ajax({
		"header" : {
			Authorization : "OAuth2: token",
		},
		"type" : "POST",
		"url" : summer.getAppStorage('imgurl')+"/uploadfile/getfileinfo",
		"async" : "false",
		"param" : {
			token : summer.getAppStorage("tokenEntity").token,
			batchno : summer.getStorage("bannerNum"),
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

