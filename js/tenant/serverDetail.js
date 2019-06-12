function getQueryString(name) { 
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
var r = window.location.search.substr(1).match(reg); 
if (r != null) return unescape(r[2]); return null; 
} 

summerready = function() {
    //周期的开始
   		var id = getQueryString("id");
        summer.ajax({
            type : 'post',
            url : summer.getAppStorage("url")+'/Repair/queryRepair',
            param : {
            	"token":summer.getAppStorage("tokenEntity").token,
            	"id" : id
            },
            header : {
                Authorization : "OAuth2: token",
            }
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
			var jsonArray = response.data.Repair;
			
			var id = jsonArray.id;
			var bNumber = jsonArray.billNumber;
			var address = jsonArray.serviceAddress;
			var singlePerson = jsonArray.singlePerson;
			var people = jsonArray.repairPeople;
			var phone = jsonArray.contactNumber;
			var houseName = jsonArray.houseName;
			var time = jsonArray.appointmentDate;
			var d = new Date(time).format("yyyy/MM/dd ");
			var content = jsonArray.repairContent;
			var type = jsonArray.repairPosition;
			var orderStatus = jsonArray.orderStatus;
			var userFraction = jsonArray.userFraction;
			var userEvaluate = jsonArray.userEvaluate;
			var orderContent = jsonArray.orderContent;
			var realEstateCustomer = jsonArray.realEstateCustomer;
			var remark = jsonArray.remark;
			var content = jsonArray.serviceContent;
			var handlingSituation = jsonArray.handlingSituation;
			$("#id").text(id);
			$("#bNumber").text(bNumber);
            $("#address").text(address);
			$("#people").text(realEstateCustomer);
			$("#phone").text(phone);
			$("#room").text(houseName);
			$("#time").text(d);
			$("#title").text(orderContent);
			$("#remark").text(remark);
			$("#content").text(content);
			$("#HandleContent").text(handlingSituation);
			if(orderStatus != 5 && orderStatus != 3 && orderStatus != 9){
				$("#s1").css("display","none");
				$("#s2").css("display","none");
				$("#s3").css("display","none");
				$("#s4").css("display","none");
				$("#s5").css("display","none");
			}
			else if(userFraction != null || userEvaluate != null){
				var oDiv=document.getElementById('rank');
				var aLi=oDiv.getElementsByTagName('li');
				for(var i = 0; i < userFraction; i++){
					aLi[i].className='hover';
				}
				
				$(this).nextAll().removeClass("hover");
				$("#userEvaluate").text(userEvaluate);
				$("#userEvaluate").attr("readonly", "readonly");
				$("#s3").css("display","none");
			}else if((userFraction == null && userEvaluate == null)&&(orderStatus == 3)){
			//已完成未评分的
				$("#s1").css("display", "none");
				$("#s2").css("display", "none");
			}else if((userFraction == null && userEvaluate == null)&&(orderStatus == 5)){
				$("#s3").css("display", "none");
			}else{
				$("#s1").css("display","none");
				$("#s2").css("display","none");
				$("#s3").css("display","block");
				$("#s4").css("display","none");
				$("#s5").css("display","none");
			}
        });
        loadPicture();
};

//获取处理图片
function loadPicture(){
	var pPicture = getQueryString("processPicture");
	summer.ajax({
		"header" : {
			Authorization : "OAuth2: token",
		},
		"type" : "POST",
		"url" : summer.getAppStorage('imgurl')+"/uploadfile/getfileinfo",
		"async" : "false",
		"param" : {
			token : summer.getAppStorage("tokenEntity").token,
			batchno : pPicture,
		},
	}, function(response) {//成功回调
		setTimeout(function() {
			response.data = JSON.parse(response.data);
			var jsonArray2 = $summer.strToJson(response.data.message);
			var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>',
			    $gallery = $("#gallery"),
			    $galleryImg = $("#galleryImg"),
			    $uploaderInput = $("#uploaderInput"),
			    $uploaderFiles = $("#uploaderFiles");
			for ( i = 0; i < jsonArray2.length; i++) {
				var imgPathWS = jsonArray2[i].filePath;
				amgId = jsonArray2[i].fileId;
				$uploaderFiles.append($(tmpl.replace('#url#', imgPathWS)));
			}
		}, 100);
	}, function(response) {//失败回调
		alert("系统开小差了,请联系管理员！");
	});
}

function goServerList() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "serverList"+t,
		"url" : "html/tenant/serverList.html"
	});
}

function goRepairEvalute() {
	var id = $("#id").text();
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "repairEvalute"+t,
		"url" : "html/tenant/repairEvalute2.html?id="+id
	});
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

//返回
function goBack(){
	summer.closeWin({});
}