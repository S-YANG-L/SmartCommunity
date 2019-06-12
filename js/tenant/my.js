//跳转到我的信息
function goMyInfo() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "myInfo"+t,
		"url" : "html/my/myInfo.html"
	});
}

//跳转到评价列表页面
function goEvaluate() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "evaluateList"+t,
		"url" : "html/tenant/evaluateList.html"
	});
}

//跳转到我的合同
function myHome() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "myHome"+t,
		"url" : "html/my/myHome.html"
	});
}

//跳转到我的房屋信息
function goHouseInfoDtl() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "goHouseInfoDtl"+t,
		"url" : "html/tenant/houseInfoDtl.html"
	});
}

function goLeaveMessage() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "setUp"+t,
		"url" : "html/tenant/leaveMessage.html"
	});
}

//跳转到我的访客
function goMyVisitor() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "myVisitor"+t,
		"url" : "html/my/myVisitor.html"
	});
}

//返回跳转到我的
function goBack() {
	summer.closeWin({});
}

function myLeaveMessage() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "myLeaveMessage"+t,
		"url" : "html/tenant/myLeaveMessage.html"
	});
}

//跳转到个人设置
function goSetUp() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "goBackSu"+t,
		"url" : "html/my/setUp.html"
	});
}

//跳转到我的预约
function myAppoint() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "myAppoint"+t,
		"url" : "html/my/myAppoint.html"
	});
}

//跳转我的合同
function myContract() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "myContract"+t,
		"url" : "html/my/contract.html"
	});
}

//跳转我的收藏
function myCollect() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "myContract"+t,
		"url" : "html/my/myCollect.html"
	});
}

//打电话
function phone() {
	window.PhoneCaller.call("17863900862", function(arg) {
		$alert(arg);
	}, function(arg) {
		$alert(arg);
	})
}

//修改密码，可删除重新输入
$(function() {
	$(".um-input-clear").click(function() {
		$(this).prev("input").val("");
	})
})

function openTab(type) {
	var header = $summer.byId('re-head');
	var headerPos = $summer.offset(header);
	var width = $summer.winWidth();
	var height = $summer.winHeight() - headerPos.h;
	//gct:计算frame的高
	summer.openFrame({
		name : type,
		url : 'html/my/' + type + '.html',
		rect : {
			x : 0,
			y : headerPos.h,
			w : width,
			h : height
		},
	});
}
//修改密码
function updatePass(){
	UM.confirm({
		text : '您确定要修改密码吗？',
		btnText : ["取消", "确定"],
		overlay : true,
		ok : function() {			
			var phone = summer.getAppStorage("userPhone");
			var oldPass = $("#old").val();
			var newPass = $("#new").val()+"";
			var newsPass = $("#news").val()+"";
			if(oldPass == "" || newPass == "" || newsPass == ""){
				UM.toast({
				    text: '请输入密码'
				});
			}
			else if(newPass !== newsPass){
				UM.toast({
				    text: '新密码输入不一致'
				});
			}else{
				summer.post(summer.getAppStorage("url")+"/MyInfo/updatePass", {
					"token":summer.getAppStorage("tokenEntity").token,
			   		"phone":phone,
					"oldPassword":oldPass,
					"newPassword":newPass
				}, {
				    Authorization : "OAuth2:token"
				}, function(response) {
					if("Token已过期，请重新登录" == response.data){
						UM.toast({
					  	  text: '登录已失效，请重新登录'
						});
						summer.setAppStorage("tokenEntity","");
						var t = (new Date()).valueOf();
						summer.openWin({
							"id" : "signin"+t,
							"url" : "html/signin.html"
						});
					}
			        response.data = JSON.parse(response.data);
			        var code = response.data.code;
					if(code == 200){
						UM.toast({
						    text: '修改密码成功'
						});
						var user = response.data.user;
				        var userId = user.id;
			        	var userName = user.customerName;
			        	var userPhone = user.contactNumber;
			        	var tenantid = user.tenantid;
			        	var userPassword = user.customerPassword;
			        	var tokenEntity = response.data.tokenEntity;
			        	//保存到localServer
					    summer.setAppStorage("userId",userId);
			        	summer.setAppStorage("userName",userName);
			        	summer.setAppStorage("userPhone",userPhone);
			        	summer.setAppStorage("tenantid",tenantid);
			        	summer.setAppStorage("tokenEntity",tokenEntity);
						summer.setAppStorage("tokenEntity","");
						var t = (new Date()).valueOf();
						summer.openWin({
							"id" : "repairDtl"+t,
							"url" : "html/signin.html"
						});
					}else if(202 == code){
						UM.toast({
						    text: '旧密码错误'
						});
					}
				}, function(response) {
				    alert(response.error);
				});
			}
		},
		cancle : function() {
		}
	});
}

summerready = function() {
	var myName = summer.getAppStorage("userName")
	document.getElementById("myName").innerHTML = myName;
	openTab('unAppoint');
}

function closeframe() {
	summer.closeFrame({
		id : 'unAppoint'
	});
	summer.closeFrame({
		id : 'appointing'
	});
}


