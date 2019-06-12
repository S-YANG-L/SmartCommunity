summerready = function() {
	var imgSrcTwo = summer.getStorage("imgSrc");
	if(imgSrcTwo == "../img/fw3.png" ||imgSrcTwo == null){
		$("#imgUrl").attr("src","../../img/fw3.png");
	}else{
		$("#imgUrl").attr("src",imgSrcTwo);
	}
	var houseId = summer.getStorage("theHouseId")
	document.getElementById("houseId").innerHTML = houseId;
	
	var homeName = summer.getStorage("topInfo");
	document.getElementById("houseName").innerHTML = homeName;
	
	var areaAndType = summer.getStorage("centerInfo");
	document.getElementById("areaAndType").innerHTML = areaAndType;
	
	var roomCharge = summer.getStorage("bottomInfo");
	document.getElementById("roomCharge").innerHTML = roomCharge;
}

$(function() {
	     $('.lease-sex a').click(function(){
            $(this).siblings().removeClass('sex-active');
            $(this).addClass('sex-active');

        })
}); 

function tiJiaoYy(){
	UM.confirm({
		text : '您确定要提交此预约吗？',
		btnText : ["取消", "确定"],
		overlay : true,
		ok : function() {
			var houseId = $("#houseId").text(); 
			var houseNames = $("#houseName").text();
			var yyNames = $("#yyName").val();
			var yyPhones = $("#yyPhone").val();
			var yyTimes = $("#yyTime").val();
			var yyMessage = $("#yyMessage").val();
			var applicantId = summer.getAppStorage("userId");
			var oneSex = $("#oneSex").val();	
			var nowDate = new Date().Format("yyyy-MM-dd hh:mm");
			var objectDate1 = new Date(yyTimes.replace(/-/g,"\/"));
			var objectDate2 = new Date(nowDate.replace(/-/g,"\/"));
			var dateNum =(objectDate1-objectDate2)/(1000 * 60 * 60 * 24);
			
			if(yyNames == ''){
					UM.alert({
							title : '请输入预约者姓名 ！',
							btnText : ["取消", "确定"],
							overlay : true,
							ok : function() {
							}
					});
				}else if(oneSex == ''){
					UM.alert({
							title : '请选择性别 ！',
							btnText : ["取消", "确定"],
							overlay : true,
							ok : function() {
							}
					});				
				}else if(yyPhones == ''){
					UM.alert({
							title : '请输入预约者手机号 ！',
							btnText : ["取消", "确定"],
							overlay : true,
							ok : function() {
							}
					});	
				}else if(yyTimes == ''){
					UM.alert({
							title : '请选择预期看房时间 ！',
							btnText : ["取消", "确定"],
							overlay : true,
							ok : function() {
							}
					});	
				}else if(objectDate1 < objectDate2){
					UM.alert({
							title : '预期看房时间应大于当前时间 ！',
							btnText : ["取消", "确定"],
							overlay : true,
							ok : function() {
							}
					});	
				}else if(dateNum>7){
					UM.alert({
							title : '请选择预期看房时间在一周之内 ！',
							btnText : ["取消", "确定"],
							overlay : true,
							ok : function() {
							}
					});	
				}else if(!(/^1[3|4|5|7|8]\d{9}$/.test(yyPhones))){ 
				//手机号码11位数字，目前支持前两位13、14、15、16、17、18手机号码
				  	UM.alert({
						title : '请正确输入预约者手机号码 ！',
						btnText : ["取消", "确定"],
						overlay : true,
						ok : function() {
						}
					});
				}else{
				summer.post(summer.getAppStorage("url")+"/houseLeasingController/appointLookHouse", {
				 		"token":summer.getAppStorage("tokenEntity").token,
				 		"houseId":houseId,
				   		"houseName":houseNames,
				   		"applicantId":applicantId,
						"applicantName":yyNames,
						"applicantPhone":yyPhones,
						"applicantDate":yyTimes,
						"leavingMessage":yyMessage,
						"applicantSex":oneSex			
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
						UM.alert({
					    	title: '您的预约已提交！',
					    	btnText: ["取消", "确定"],
					    	overlay: true,
					    	ok: function () {
					        	summer.closeWin({});
					   		}
						});	
					}
				});
			}
		},
		cancle : function() {
			
		}
	});
}

//返回上一页
function goBack() {
	summer.rmStorage('imgSrc');
	summer.closeWin({});
	
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
