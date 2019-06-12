summerready = function() {
	getNumber1();
	getNumber2();
}

function getNumber1() {
	var userId = summer.getAppStorage("userId");
	summer.post(summer.getAppStorage("url") + "/community/getNum", {
		"token" : summer.getAppStorage("tokenEntity").token,
		"userId" : userId,
		"stype" : 1,
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
		var i = response.data.list;
		if (i != 0) {
			$("#s1").html(i);
			document.getElementById("s1").style.display = "block";
		} 
	}, function(response) {
		alert(response.error);
	});
};

function getNumber2() {
	var userId = summer.getAppStorage("userId");
	summer.post(summer.getAppStorage("url") + "/community/getNum", {
		"token" : summer.getAppStorage("tokenEntity").token,
		"userId" : userId,
		"stype" : 2,
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
		var i = response.data.list;
		if (i != 0) {
			$("#s2").html(i);
			document.getElementById("s2").style.display = "block";
		} 
	}, function(response) {
		alert(response.error);
	});
}

//跳转到通知
function notice() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : 'noticeList'+t,
		url : 'html/center/noticeList.html',
	    "addBackListener":"true"
	});
}

//跳转到反馈
function tickling() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : 'newsList'+t,
		url : 'html/center/newsList.html'
	});
}
