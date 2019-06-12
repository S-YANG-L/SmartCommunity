summerready = function() {	
	loadPicture();
	var theCollectInfo = summer.getStorage("oneInfo");
    //页面内容显示
    //房屋全称
	var houseName= theCollectInfo.communityName+theCollectInfo.villageName+theCollectInfo.buildingName+theCollectInfo.unitNumber+theCollectInfo.houseName;
	document.getElementById("houseName").innerHTML = houseName;
	//房租
	var fangzu = theCollectInfo.tablePrice+'/月';
	document.getElementById("fangzu").innerHTML = fangzu;
	//
	var huxing = theCollectInfo.roomComposition;
	document.getElementById("huxing").innerHTML = huxing;
	//
	var mianji = theCollectInfo.inJacketArea+'m²';
	document.getElementById("mianji").innerHTML = mianji;
	//楼层
	var louceng= theCollectInfo.theFloorNumber+'/'+theCollectInfo.floorNumber;
	document.getElementById("louceng").innerHTML = louceng;
	//电梯
	var dianti= theCollectInfo.elevator;
	if(dianti == "0"){
		document.getElementById("dianti").innerHTML = "有";
	}else{
		document.getElementById("dianti").innerHTML = "无";
	}
	//年代
	var niandai= theCollectInfo.builtDate;
	document.getElementById("niandai").innerHTML = niandai;
	//类型
	var leixing= theCollectInfo.apartmentName;
	document.getElementById("leixing").innerHTML = leixing;
	//绿化
	var lvhua= theCollectInfo.afforestedArea+'m²';
	document.getElementById("lvhua").innerHTML = lvhua;
	//房源简介
	var fwjj= theCollectInfo.houseRemark;
	if(fwjj != null && fwjj != ''){
		document.getElementById("fwjj").innerHTML = fwjj;
	}else{
		document.getElementById("fwjj").innerHTML = '暂无房源简介';
	}
	if(summer.getStorage("oneInfo").roomStatus != 2){
		document.getElementById("btn1").style.display = "none";
		document.getElementById("btn2").style.display = "block";
	}
}

//获取房屋相关图片轮播
function loadPicture() {
	summer.ajax({
		"header" : {
			Authorization : "OAuth2: token",
		},
		"type" : "POST",
		"url" : summer.getAppStorage('imgurl') +"/uploadfile/getfileinfo",
		"async" : "false",
		"param" : {
			token : summer.getAppStorage("tokenEntity").token,
			batchno : summer.getStorage("oneInfo").apartmentPhoto,
		},
	}, function(response) {//成功回调
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
	}, function(response) {//失败回调
		alert("系统开小差了，请联系管理员！");
	});
}

function signingProcess(){
	var t = (new Date()).valueOf();
	summer.openWin({
			"id" : "signingProcess"+t,
			"url" : "html/tenant/signingProcess.html"
		});
}

function goback(){
	 summer.rmStorage('oneInfo');
	 summer.closeWin({});
}

//取消收藏
function noCollect(){
	var cId = summer.getStorage("oneInfo").id;
	UM.alert({
	    title: '是否确认取消收藏此房源',
	    btnText: ["取消", "确定"],
	    overlay: true,
	    ok: function () {
	       summer.post(summer.getAppStorage("url") + "/myCollectionController/noCollect", {
				"token" : summer.getAppStorage("tokenEntity").token,
				"cId" : cId,
				"collectionStatus":0,
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
					UM.alert({
						title : '您已取消该房源的收藏！',
						btnText : ["取消", "确定"],
						overlay : true,
						ok : function() {
							var t = (new Date()).valueOf();
							summer.openWin({
								"id" : "noCollect"+t,
								"url" : "html/my/myCollect.html"
							});
						}
					});
				}
			}, function(response) {
				alert("系统出错，请联系管理员!");
			});     
	    }
	});
}
//跳转到预约看房申请
function want(s) {
	var imgSrc = summer.getStorage("oneInfo").imgUrl;
	summer.setStorage("imgSrc", imgSrc);
	
	var theHouseId = summer.getStorage("oneInfo").houseId;
	summer.setStorage("theHouseId", theHouseId)

	var topInfo = summer.getStorage("oneInfo").communityName+summer.getStorage("oneInfo").villageName+summer.getStorage("oneInfo").buildingName+summer.getStorage("oneInfo").unitNumber+summer.getStorage("oneInfo").houseName;
	summer.setStorage("topInfo", topInfo);

	var centerInfo = summer.getStorage("oneInfo").inJacketArea+ 'm²' + '|' +summer.getStorage("oneInfo").apartmentName;
	summer.setStorage("centerInfo", centerInfo);

	var bottomInfo = summer.getStorage("oneInfo").tablePrice+ '￥/月';
	summer.setStorage("bottomInfo", bottomInfo);
	
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "want"+t,
		"url" : "html/tenant/myLeaseRequest.html?"
	});
	
}