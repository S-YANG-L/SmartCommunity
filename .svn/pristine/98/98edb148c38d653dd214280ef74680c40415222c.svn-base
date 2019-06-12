function goBack(){
	summer.closeWin({});
}

//新增投诉建议
function addProposal(){
	UM.confirm({
		text : '您确定要提交此单据吗？',
		btnText : ["取消", "确定"],
		overlay : true,
		ok : function() {
			var handleNum = getRandomNumber();
			var userId = summer.getAppStorage("userId");
			var tenantid = summer.getAppStorage("tenantid");
			var address = $("#address").val();
			var uname = $("#uname").val();
			var uphone = $("#uphone").val();
			var uroom = $("#uroom").val();
			var proposal = $("#proposal").val();
			var cont = $("#content").val();
			var remark = $("#remark").val();
			if (proposal == '') {
				UM.alert({
					title : '请填写您的投诉/建议 ！',
					btnText : ["取消", "确定"],
					overlay : true,
					ok : function() {
					}
				});
			} else if(cont == '') {
				UM.alert({
					title : '请对投诉/建议内容进行详细描述！',
					btnText : ["取消", "确定"],
					overlay : true,
					ok : function() {
					}
				});
			}else{
				 summer.post(summer.getAppStorage("url")+"/ComplaintSuggestion/csSave", {
				 		"token":summer.getAppStorage("tokenEntity").token,
				   		"complaintPeople":uname,
						"complaintPhone":uphone,
						"orderContent":proposal,
						"remark":remark,
						"content":cont,
						"houseName":uroom,
						"userId":userId,
						"tenantid":tenantid,
						"address":address,
						"handleNum":handleNum,
				}, {
				    Authorization : "OAuth2:token"
				}, function(response) {
					if("Token已过期，请重新登录" == response.data){
						UM.toast({
					  	  text: '登录已失效，请重新登录'
						});
						summer.openWin({
							"id" : "signin",
							"url" : "html/signin.html"
						});
					}
			        response.data = JSON.parse(response.data);
					var code = response.data.code;
					if(code == 200){
						UM.toast({
					  	  text: '提交成功'
						});
						var t = (new Date()).valueOf();
						summer.openWin({
							"id" : "leaveList"+t,
							"url" : "html/tenant/leaveList.html"
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

function myLeaveMessage() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "myLeaveMessage"+t,
		"url" : "html/tenant/leaveList.html"
	});
}

//获取小区名、房间号
summerready = function(){
	var userName = summer.getAppStorage("userName");
	var userId = summer.getAppStorage("userId");
	var phone = summer.getAppStorage("userPhone");
	summer.ajax({
	    type : "post",
	    url : summer.getAppStorage("url")+"/Repair/getHouseName",
	    param : {
	        "token":summer.getAppStorage("tokenEntity").token,
	   		"userId":userId,
	    },
	    header : {
	        Authorization : "OAuth2:token"
	    }
	}, function(response) {
	    response.data = JSON.parse(response.data);
	    if(200 == response.data.code){
		    var list = response.data.list;
		    var houseName = list[0].HOUSE_NAME;
		    var villageName = list[0].VILLAGE_NAME;
		    var buildingName = list[0].BUILDING_NAME;
		    if(houseName != null){
			    $("#uname").val(userName);
			    $("#uphone").val(phone);
			    $("#uroom").val(houseName);
			    $("#address").val(villageName+buildingName+houseName);
			    $("#uname").css("style","display:none");
			    $("#uphone").css("style","display:none");
			    $("#uroom").css("style","display:none");
			    $("#address").css("style","display:none");
			    $("#add").remove();
			}
		}
		else{
			document.getElementById("all").style.display="none";
			document.getElementById("record").style.display="none";
			var str = '<div style="text-align: center;margin: auto;"  id="add">'
					  +'		<span id=""  >请先成为小区住户</span>'
					  +' </div>';
			$("#leaveMessage").append(str);
		}
	}, function(response) {
	    alert("系统开小差了,请联系管理员!");
	});
}
function goPhone(){
		window.PhoneCaller.call("17863900862", function(arg) {
		$alert(arg);
	}, function(arg) {
		$alert(arg);
	})
}

//生成随机数DOC+15位 7 8
function getRandomNumber(){
	 	var currentdate='DOC';
		var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        date = year + month + strDate;
        //八位随机数
        var finalNum = '';
		for(var i = 0 ; i< 8 ; i++){
		    finalNum += Math.floor(Math.random()*10);
		}
        
        return currentdate+=date+finalNum;
}
