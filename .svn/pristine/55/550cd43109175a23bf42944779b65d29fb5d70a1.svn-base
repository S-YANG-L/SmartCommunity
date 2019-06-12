function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

//返回上一页面
function goBack() {
	summer.closeWin({});
}

summerready = function() {
	visitorDtl(); 
	loadPicture();
}

var ViewModel = function() {

};
var viewModel = new ViewModel();
var jsonArray = '';
function visitorDtl() {
	var id = getQueryString("id");
	var vId = summer.getAppStorage("userId");	
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage("url") + '/Visit/myApplication',
		param : {
			"token" : summer.getAppStorage("tokenEntity").token,
			"visitorId" : vId,
			"id" : id
		},
		header : {
			Authorization : "OAuth2: token",
		}
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
		var jsonArray = response.data.applicationList;
		var intervieweeName = jsonArray[0].intervieweeName;
		var intervieweePhone = jsonArray[0].intervieweeIphoneNum;
		var intervieweeHouse = jsonArray[0].intervieweeHouse;
		var visitorName = jsonArray[0].visitorName;
		var visitorIphoneNum = jsonArray[0].visitorIphoneNum;
		var visitorIdNumberType = jsonArray[0].visitorIdNumberType;
		var visitorIdNumber= jsonArray[0].visitorIdNumber;
		var visitStartTime = jsonArray[0].visitStatrTime;
		var visitEndTime = jsonArray[0].visitEndTime;
		var applyDesc = jsonArray[0].applyDesc;
		var visitPicture = jsonArray[0].visitPicture;
		var status = jsonArray[0].status;
		if ((jsonArray[0].refuseContent == '') && status != 0) {
			var refuseContent = '对方未留言!';
		} else {
			var refuseContent = jsonArray[0].refuseContent;
		}
		$("#bname").val(intervieweeName);
		$("#bphone").val(intervieweePhone);
		$("#broom").val(intervieweeHouse);
		$("#uname").val(visitorName);
		$("#uphone").val(visitorIphoneNum);
		$("#ucard").val(visitorIdNumberType);
		$("#ucardNum").val(visitorIdNumber);
		$("#start").val(visitStartTime);
		$("#end").val(visitEndTime);
		$("#appl").val(applyDesc);
		$("#photoCode").val(visitPicture);		
		$("#rReason").val(refuseContent);
		if(status == 0){
			$("#refuseReason").css("display", "none");
		}else{
			$("#refuseReason").css("display", "block");
		}
	});
}

function loadPicture(){
	var vPicture = getQueryString("visitPicture");
	summer.ajax({
		"header" : {
			Authorization : "OAuth2: token",
		},
		"type" : "POST",
		"url" : summer.getAppStorage('imgurl') +"/uploadfile/getfileinfo",
		"async" : "false",
		"param" : {
			token : summer.getAppStorage("tokenEntity").token,
			batchno : vPicture,
		},
	}, function(response) {//成功回调
		setTimeout(function() {
			response.data = JSON.parse(response.data);
			var jsonArray1 = $summer.strToJson(response.data.message);
			var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>',
			    $gallery = $("#gallery"),
			    $galleryImg = $("#galleryImg"),
			    $uploaderInput = $("#uploaderInput"),
			    $uploaderFiles = $("#uploaderFiles");
			for ( i = 0; i < jsonArray1.length; i++) {
				var imgPathWS = jsonArray1[i].filePath;
				amgId = jsonArray1[i].fileId;
				$uploaderFiles.append($(tmpl.replace('#url#', imgPathWS)));
			}
		}, 100);
	}, function(response) {//失败回调
		alert("系统开小差了,请联系管理员！");
	});
}
