function getQueryString(name) { 
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
var r = window.location.search.substr(1).match(reg); 
if (r != null) return decodeURI(r[2]); return null; 
} 

//新增预约服务
function addService(){
	UM.confirm({
		text : '您确定要提交此预约吗？',
		btnText : ["取消", "确定"],
		overlay : true,
		ok : function() {
				var handleNum = getRandomNumber();
				var userId = summer.getAppStorage("userId");
				var tenantid = summer.getAppStorage("tenantid");
				var userPhone = summer.getAppStorage("userPhone");
				var userName = summer.getAppStorage("userName");
				
				var title = getQueryString("title");
				var sphone = getQueryString("sphone");
				var content =  $("#content").val();
				var remark = $("#remark").val();
				var houseName =  $("#room").val();
				var address =  $("#address").val();
				var time =  $("#time").val();
				var nowDate = new Date().Format("yyyy-MM-dd hh:mm");
				var objectDate1 = new Date(time.replace(/-/g,"\/"));
				var objectDate2 = new Date(nowDate.replace(/-/g,"\/"));
				if(time == ''){
					UM.alert({
						title : '请输入预约时间 ！',
						btnText : ["取消", "确定"],
						overlay : true,
						ok : function() {
						}		
					});
				}else if(objectDate1 < objectDate2){
					UM.alert({
							title : '服务时间应大于当前时间 ！',
							btnText : ["取消", "确定"],
							overlay : true,
							ok : function() {
							}
					});	
				}else{
					summer.post(summer.getAppStorage("url")+"/serviceCenterController/addRepairServer", {
					 		"token":summer.getAppStorage("tokenEntity").token,
					 		"userId":userId,
					 		"tenantid":tenantid,
					 		"title":title,
					 		"userPhone":userPhone,
					 		"userName":userName,
					 		"sphone":sphone,
					 		"houseName":houseName,
					 		"serviceAddress":address,
					 		"content":content,
					 		"remark":remark,
					 		"date":time,
					 		"handleNum":handleNum,
					}, {
					    Authorization : "OAuth2:token"
					}, function(response) {
						if("Token已过期，请重新登录" == response.data){
							UM.toast({
						  	  text: '登录已失效，请重新登录'
							});
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
						  	  text: '预约成功!!!'
							});
							var t = (new Date()).valueOf();
							summer.openWin({
								"id" : "serverList"+t,
								"url" : "html/tenant/serverList.html"
							});
						}
					});
				}
		},
		cancle : function() {
			
		}
	});
};

//获取小区名、房间号
summerready = function(){
	var userName = summer.getAppStorage("userName");
	var userId = summer.getAppStorage("userId");
	var phone = summer.getAppStorage("userPhone");
	var title = getQueryString("title");
	var sphone = getQueryString("sphone");
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
		    	$("#title").val(title);
			    $("#address").val(villageName+buildingName+houseName);
			    $("#people").val(userName);
			    $("#phone").val(phone);
			    $("#room").val(houseName);
			    $("#title").attr("readonly", "readonly");
			    $("#address").attr("readonly", "readonly");
			    $("#people").attr("readonly", "readonly");
			    $("#phone").attr("readonly", "readonly");
			    $("#room").attr("readonly", "readonly");
			    $("#add").remove();
			}
		}
		else{
			document.getElementById("all").style.display="none";
			document.getElementById("record").style.display="none";
			var str = '<div style="text-align: center;margin: auto;"  id="add">'
					  +'		<span id=""  >请先成为小区住户</span>'
					  +' </div>';
			$("#serverAdd").append(str);
		}
	}, function(response) {
	    alert(response.error);
	});
};

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

Date.prototype.Format = function (fmt) { 
                        var o = {
                            "M+": this.getMonth() + 1, //Month
                            "d+": this.getDate(), //Day
                            "h+": this.getHours(), //Hour
                            "m+": this.getMinutes(), //Minute
                            "s+": this.getSeconds(), //Second
                            "q+": Math.floor((this.getMonth() + 3) / 3), //Season
                            "S": this.getMilliseconds() //millesecond
                        };
                        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + 

"").substr(4 - RegExp.$1.length));
                        for (var k in o)
                            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, 

(RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                        return fmt;
};

//跳转到服务记录
function goServerList() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "serverList"+t,
		"url" : "html/tenant/serverList.html"
	});
}

//返回到上一页（home页）
function goHome(){
	 summer.closeWin({});
}
