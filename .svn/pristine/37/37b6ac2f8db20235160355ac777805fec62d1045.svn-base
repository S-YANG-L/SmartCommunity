summerready = function() {
	var userName = summer.getAppStorage("userName");
	$("#name").text(userName);
}
//返回上一页
function goBack() {
	summer.closeWin({});
}

//跳转到修改密码
function goNewPw() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "newPassword"+t,
		"url" : "html/my/newPassword.html"
	});
}

function personalInfoChange(){
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "personalInfoChange"+t,
		"url" : "html/my/myInfo.html"
	});
}

function tuichu() {
	UM.confirm({
		text : '您确定要退出登录吗？',
		btnText : ["取消", "确定"],
		overlay : true,
		ok : function() {
			summer.setAppStorage("tokenEntity", "");
			var t = (new Date()).valueOf();
			summer.openWin({
				"id" : "signin" + t,
				"url" : "html/signin.html"
			});
		},
		cancle : function() {
			
		}
	});
}