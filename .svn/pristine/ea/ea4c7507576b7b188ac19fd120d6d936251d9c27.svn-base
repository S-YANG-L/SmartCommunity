function getQueryString(name) { 
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
var r = window.location.search.substr(1).match(reg); 
if (r != null) return unescape(r[2]); return null; 
} 

function goBack(){
	var uname = $("#uname").text();
	var t = (new Date()).valueOf();
	summer.openWin({
	    "id" : "myLeaveMessage"+t,
		"url" : "html/tenant/myLeaveMessage.html?uname="+uname
	});
}

summerready = function() {
    //周期的开始
   		var id = getQueryString("id");
        summer.ajax({
            type : 'post',
            url : summer.getAppStorage("url")+'/ComplaintSuggestion/queryDetail',
             param : {
             	  "token":summer.getAppStorage("tokenEntity").token,
				  "id":id,
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
			var complaintPeople = jsonArray.complaintPeople;
			var complaintPhone = jsonArray.complaintPhone;
			var date = jsonArray.draftDate;
			var orderContent = jsonArray.orderContent;
			var orderStatus = jsonArray.orderStatus;
			var houseName = jsonArray.houseName;
			var remark = jsonArray.remark;
			var content = jsonArray.complaintContent;
			var address = jsonArray.contactAddress;
			var userFraction = jsonArray.userFraction;
			var userEvaluate = jsonArray.userEvaluate;
			var handlingSituation = jsonArray.handlingSituation;
			var time = new Date(date);
			var y = time.getFullYear();
			var m = time.getMonth()+1;
			var d = time.getDate();
			var h = time.getHours();
			var mm = time.getMinutes();
			date =  y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm);
			$("#id").text(id);
			$("#bNumber").text(bNumber);
            $("#uname").text(complaintPeople);
			$("#uphone").text(complaintPhone);
			$("#remark").text(remark);
			$("#content").text(content);
			$("#uroom").text(houseName);
			$("#proposal").text(orderContent);
			$("#udate").text(date);
			$("#address").text(address);
			$("#content").attr("readonly", "readonly");
			$("#HandleContent").text(handlingSituation);
			if(orderStatus != 5 && orderStatus != 3 && orderStatus != 9){
			//未完成的情况下
				$("#s4").css("display","none");
				$("#s2").css("display","none");
				$("#s3").css("display","none");
				$("#s5").css("display","none");
				$("#s6").css("display","none");
			}else if(userFraction != null || userEvaluate != null){
			//评过分之后
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
				$("#s4").css("display","none");
				$("#s2").css("display","none");
			}else if((userFraction == null && userEvaluate == null)&&(orderStatus == 5)){
			//已完成但是未评分的，经过了回访
				$("#s3").css("display","none");
			}else{
				$("#s4").css("display","none");
				$("#s2").css("display","none");
				$("#s3").css("display","block");
				$("#s5").css("display","none");
				$("#s6").css("display","none");
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
		"url" : summer.getAppStorage('imgurl') +"/uploadfile/getfileinfo",
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

function add0(m){return m<10?'0'+m:m }
function myLeaveMessage(){
	var uname = $("#uname").text();
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "myLeaveMessage"+t,
		"url" : "html/tenant/myLeaveMessage.html?uname="+uname
	});
}

function goRepairEvalute() {
	var id = $("#id").text();
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "repairEvalute3"+t,
		"url" : "html/tenant/repairEvalute3.html?id="+id
	});
}

function back(){
	 summer.closeWin({});
}