var ViewModel = function() {
};
var viewModel = new ViewModel();
var start = 0;
//页面加载
summerready = function() {
    viewModel.data = ko.observableArray([]);
    var listview = UM.listview("#listview");
	datesourse();
	addSq();
	var btn1 = document.getElementById("xq");
	var btn2 = document.getElementById("ld");
	var btn3 = document.getElementById("lx");
	btn1.addEventListener('click',function(){
		if($("#sq").val()==''){
			$("#xq").empty();
				UM.alert({
				    title: '请先选择社区!',
				    btnText: ["取消", "确定"],
				    overlay: true,
				    ok: function () {
				    var option = "<option selected='selected'value=''>小区</option>"; 
					$("#xq").append(option);			        
				    }
				});
		}
	},false)	
	btn2.addEventListener('click',function(){
		if($("#sq").val()==''){
			$("#ld").empty();
				UM.alert({
				    title: '请先选择社区!',
				    btnText: ["取消", "确定"],
				    overlay: true,
				    ok: function () {
				    var option = "<option selected='selected'value=''>楼栋</option>"; 
				$("#ld").append(option);			        
				    }
				});
		}
	},false)		
	btn3.addEventListener('click',function(){
		if($("#sq").val()==''){
			$("#lx").empty();
				UM.alert({
				    title: '请先选择社区!',
				    btnText: ["取消", "确定"],
				    overlay: true,
				    ok: function () {
				    var option = "<option selected='selected'value=''>户型</option>"; 
				$("#lx").append(option);			        
				    }
				});
		}
	},false)	
	
//下拉加载
    listview.on("pullUp", function(sender) {
    	var sqId = $("#sq").val();
		var xqId = $("#xq").val();
		var ldId = $("#ld").val();
		var lxId = $("#lx").val();
		var beginMoney = $("#beginMoney").val();
		var endMoney = $("#endMoney").val();
		var oneSort = $("#oneSort").val();
		var roomName = $("#roomName").val();
        start += 10;
        //这是可以编写列表上拉加载逻辑，参数sender即为当前列表实例对象
        summer.ajax({
            "header" : {
                Authorization : "OAuth2: token"
            },
            "type" : "POST",
            "url" : summer.getAppStorage('url') + "/houseLeasingController/list",
            "param" : {
                "token" : summer.getAppStorage("tokenEntity").token,
                "tenantId" : summer.getAppStorage("tenantId"),
                "housingResources":roomName,
				"communityId":sqId,
				"villageId":xqId,
				"buildingId":ldId,
				"apartmentId":lxId,
				"sortType":oneSort,
				"start" : start,
            },
        }, function(response) {//成功回调
	        response.data = JSON.parse(response.data);
			var jsonArray = response.data.houseList;
            if (jsonArray.length > 0) {
	            for(var i=0;i<jsonArray.length;i++){
					var id = jsonArray[i].id;
					var communityName = jsonArray[i].communityName;
					var villageName = jsonArray[i].villageName;
					var buildingName = jsonArray[i].buildingName;
					var houseName = jsonArray[i].houseName;
					var inJacketArea = jsonArray[i].inJacketArea;
					var apartmentName = jsonArray[i].apartmentName;
					var tablePrice = jsonArray[i].tablePrice;
					var apartmentPhoto = jsonArray[i].apartmentPhoto;
					var unitNumber = jsonArray[i].unitNumber;
					var theFloorNumber = jsonArray[i].theFloorNumber;
					if(jsonArray[i].housePhotoVideo == null){
						var housePhotoVideo = "../img/fw3.png";
					}else{
						var housePhotoVideo = jsonArray[i].housePhotoVideo;	
					}
					var starts = start;
					var str = '<li class="um-listview-row leaselist" onclick="leaseInfo(this,'+(i+starts)+')" style="background:#fff;" >'
		                	+'	<a href="#" class="um-list-item um-swipe-action um-no-icon" >'
		                	+'			<div class="um-list-item-media">'
		                	+'				<img src="'+housePhotoVideo+'">'
		                	+'				<span id="housePhotoVideo'+i+'" style="display:none;">'+housePhotoVideo+'</span>'
		                	+'			</div>'
		                	+'			<div class="um-list-item-inner">'
		                	+'				<div class="um-list-item-body" style="padding-right:5px;">'
		                	+'					<div  class="leasebt">'+communityName+villageName+buildingName+'<br>'+unitNumber+houseName+'</div>'
		                	+'					<div id="photoContent'+i+'" class="leasebt" style="display: none;">'+apartmentPhoto+'</div>'
		                	+'					<div>'
		                	+'						<span  class="f14 um-gray listview-detail">'+inJacketArea+'m²'+'|'+apartmentName+'</span>'
		                	+'					</div>'
		                	+'					<div class="tl um-red leaseprise">'
		                	+'						<span >'+tablePrice+'￥/月</span>'
		                	+'						<span id="id'+(i+starts)+'" style="display: none">'+id+'</span>'
		                	+'					</div>'
		                	+'				</div>'
		                	+'			</div>'
		                	+'		</a>'
		                	+'	</li>';
					$("#s1").append(str);
					sender.refresh();
				}
                } else {
                	viewModel.data.push();
                    sender.refresh();
                    summer.toast({
                        "msg" : "数据已加载完毕"
                    })
                }
        }, function(response) {//失败回调
            alert("请联系管理员解决！");
        });
    });	
}

//页面房屋全部数据
function datesourse() {
	$("#s1").empty();
	summer.post(summer.getAppStorage("url")+"/houseLeasingController/list", {
	 		"token":summer.getAppStorage("tokenEntity").token,
			"tenantId" : summer.getAppStorage("tenantid"),
			"start" : start,
	}, {
	    Authorization : "OAuth2:token",
	}, function(response) {
		response.data = JSON.parse(response.data);
		var jsonArray = response.data.houseList;
		for(var i=0;i<jsonArray.length;i++){
			var id = jsonArray[i].id;
			var communityName = jsonArray[i].communityName;
			var villageName = jsonArray[i].villageName;
			var buildingName = jsonArray[i].buildingName;
			var houseName = jsonArray[i].houseName;
			var inJacketArea = jsonArray[i].inJacketArea;
			var apartmentName = jsonArray[i].apartmentName;
			var tablePrice = jsonArray[i].tablePrice;
			var apartmentPhoto = jsonArray[i].apartmentPhoto;
			var unitNumber = jsonArray[i].unitNumber;
			var theFloorNumber = jsonArray[i].theFloorNumber;
			if(jsonArray[i].housePhotoVideo == null){
				var housePhotoVideo = "../img/fw3.png";
			}else{
				var housePhotoVideo = jsonArray[i].housePhotoVideo;	
			}
			var str = '<li class="um-listview-row leaselist" onclick="leaseInfo(this,'+i+')" style="background:#fff;" >'
                	+'	<a href="#" class="um-list-item um-swipe-action um-no-icon" >'
                	+'			<div class="um-list-item-media">'
                	+'				<img src="'+housePhotoVideo+'">'
                	+'				<span id="housePhotoVideo'+i+'" style="display:none;">'+housePhotoVideo+'</span>'
                	+'			</div>'
                	+'			<div class="um-list-item-inner">'
                	+'				<div class="um-list-item-body" style="padding-right:5px;">'
                	+'					<div  class="leasebt">'+communityName+villageName+buildingName+'<br>'+unitNumber+houseName+'</div>'
                	+'					<div id="photoContent'+i+'" class="leasebt" style="display: none;">'+apartmentPhoto+'</div>'
                	+'					<div>'
                	+'						<span  class="f14 um-gray listview-detail">'+inJacketArea+'m²'+'|'+apartmentName+'</span>'
                	+'					</div>'
                	+'					<div class="tl um-red leaseprise">'
                	+'						<span >'+tablePrice+'￥/月</span>'
                	+'						<span id="id'+i+'" style="display: none">'+id+'</span>'
                	+'					</div>'
                	+'				</div>'
                	+'			</div>'
                	+'		</a>'
                	+'	</li>';
			
			$("#s1").append(str);
		}
		if(jsonArray.length == 0){
			UM.toast({
				title:'温馨提示',
				text: '暂无数据!',
				duration: 1500
			});
		}
	});
}

//搜索
function searching(){		
	$("#s1").empty();
	var sqId = $("#sq").val();
	var xqId = $("#xq").val();
	var ldId = $("#ld").val();
	var lxId = $("#lx").val();
	var roomName = $("#roomName").val();
	summer.post(summer.getAppStorage("url")+"/houseLeasingController/list", {
	 		"token":summer.getAppStorage("tokenEntity").token,
			"tenantId" : summer.getAppStorage("tenantid"),
			"housingResources":roomName,
			"communityId":sqId,
			"villageId":xqId,
			"buildingId":ldId,
			"apartmentId":lxId,
	}, {
	    Authorization : "OAuth2:token",
	}, function(response) {
		response.data = JSON.parse(response.data);
		var jsonArray = response.data.houseList;
		for(var i=0;i<jsonArray.length;i++){
			var id = jsonArray[i].id;
			var communityName = jsonArray[i].communityName;
			var villageName = jsonArray[i].villageName;
			var buildingName = jsonArray[i].buildingName;
			var houseName = jsonArray[i].houseName;
			var inJacketArea = jsonArray[i].inJacketArea;
			var apartmentName = jsonArray[i].apartmentName;
			var tablePrice = jsonArray[i].tablePrice;
			var apartmentPhoto = jsonArray[i].apartmentPhoto;
			var unitNumber = jsonArray[i].unitNumber;
			var theFloorNumber = jsonArray[i].theFloorNumber;
			if(jsonArray[i].housePhotoVideo == null){
				var housePhotoVideo = "../img/fw3.png";
			}else{
				var housePhotoVideo = jsonArray[i].housePhotoVideo;	
			}			
			var str ='<li class="um-listview-row leaselist" onclick="leaseInfo(this,'+i+')" style="background:#fff;" >'
                	+'	<a href="#" class="um-list-item um-swipe-action um-no-icon" >'
                	+'			<div class="um-list-item-media">'
                	+'				<img src="'+housePhotoVideo+'">'
                	+'				<span id="housePhotoVideo'+i+'" style="display:none;">'+housePhotoVideo+'</span>'
                	+'			</div>'
                	+'			<div class="um-list-item-inner">'
                	+'				<div class="um-list-item-body" style="padding-right:5px;">'
                	+'					<div  class="leasebt">'+communityName+villageName+buildingName+'<br>'+unitNumber+houseName+'</div>'
                	+'					<div id="photoContent'+i+'" class="leasebt" style="display: none;">'+apartmentPhoto+'</div>'
                	+'					<div>'
                	+'						<span  class="f14 um-gray listview-detail">'+inJacketArea+'m²'+'|'+apartmentName+'</span>'
                	+'					</div>'
                	+'					<div class="tl um-red leaseprise">'
                	+'						<span >'+tablePrice+'￥/月</span>'
                	+'						<span id="id'+i+'" style="display: none">'+id+'</span>'
                	+'					</div>'
                	+'				</div>'
                	+'			</div>'
                	+'		</a>'
                	+'	</li>';
			$("#s1").append(str);
		}
		if(jsonArray.length == 0){
			UM.toast({
				title:'温馨提示',
			    text: '暂无数据!',
			    duration: 1500
			});
		}
	});
}

//筛选
function screening(){		
	$("#s1").empty();
	var beginMoney = $("#beginMoney").val();
	var endMoney = $("#endMoney").val();
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage("url")+'/houseLeasingController/list',
		param :{
			"token":summer.getAppStorage("tokenEntity").token,
			"tenantId" : summer.getAppStorage("tenantid"),
			"beginMoney":beginMoney,
			"endMoney":endMoney
		},
		header : {
			Authorization : "OAuth2: token",
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		var jsonArray = response.data.houseList;
		for(var i=0;i<jsonArray.length;i++){
			var id = jsonArray[i].id;
			var communityName = jsonArray[i].communityName;
			var villageName = jsonArray[i].villageName;
			var buildingName = jsonArray[i].buildingName;
			var houseName = jsonArray[i].houseName;
			var inJacketArea = jsonArray[i].inJacketArea;
			var apartmentName = jsonArray[i].apartmentName;
			var tablePrice = jsonArray[i].tablePrice;
			var apartmentPhoto = jsonArray[i].apartmentPhoto;
			var unitNumber = jsonArray[i].unitNumber;
			var theFloorNumber = jsonArray[i].theFloorNumber;
			if(jsonArray[i].housePhotoVideo == null){
				var housePhotoVideo = "../img/fw3.png";
			}else{
				var housePhotoVideo = jsonArray[i].housePhotoVideo;	
			}			
			var str ='<li class="um-listview-row leaselist" onclick="leaseInfo(this,'+i+')" style="background:#fff;" >'
                	+'	<a href="#" class="um-list-item um-swipe-action um-no-icon" >'
                	+'			<div class="um-list-item-media">'
                	+'				<img src="'+housePhotoVideo+'">'
                	+'				<span id="housePhotoVideo'+i+'" style="display:none;">'+housePhotoVideo+'</span>'
                	+'			</div>'
                	+'			<div class="um-list-item-inner">'
                	+'				<div class="um-list-item-body" style="padding-right:5px;">'
                	+'					<div  class="leasebt">'+communityName+villageName+buildingName+'<br>'+unitNumber+houseName+'</div>'
                	+'					<div id="photoContent'+i+'" class="leasebt" style="display: none;">'+apartmentPhoto+'</div>'
                	+'					<div>'
                	+'						<span  class="f14 um-gray listview-detail">'+inJacketArea+'m²'+'|'+apartmentName+'</span>'
                	+'					</div>'
                	+'					<div class="tl um-red leaseprise">'
                	+'						<span >'+tablePrice+'￥/月</span>'
                	+'						<span id="id'+i+'" style="display: none">'+id+'</span>'
                	+'					</div>'
                	+'				</div>'
                	+'			</div>'
                	+'		</a>'
                	+'	</li>';
			$("#s1").append(str);
		}
		if(jsonArray.length == 0){
			UM.toast({
				title:'温馨提示',
			    text: '暂无数据!',
			    duration: 1500
			});
		}
	});
	$("#box").attr("style","display:none");
	$('.um-dark').fadeOut(100);
}		

//筛选内容重置
function formReset(){		
	document.getElementById("beginMoney").value = "";
	document.getElementById("endMoney").value = "";	
}

function addSq(){
	$("#sq").empty();
	var option = "<option selected='selected' value=''>社区</option>"; 
	$("#sq").append(option);
	var tenantId = summer.getAppStorage("tenantid");
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage("url")+'/houseLeasingController/sqList',
		param :{
				"token":summer.getAppStorage("tokenEntity").token,
				"tenantId":tenantId,
		},
		header : {
			Authorization : "OAuth2: token",
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		var jsonArray = response.data.sheQuList;
		for(var i=0;i<jsonArray.length;i++){
			var communityId = jsonArray[i].communityId;
			var communityName = jsonArray[i].communityName;
			var option = "<option value='"+communityId+"'>"+communityName+"</option>"; 
		$("#sq").append(option);
		}
	});
}

function addXq(){
	$("#xq").empty();
	var option = "<option selected='selected'value=''>小区</option>"; 
	$("#xq").append(option);
	var communityId = $("#sq").val();
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage("url")+'/houseLeasingController/xqList',
		param :{
				"token":summer.getAppStorage("tokenEntity").token,
				"communityId":communityId,
		},
		header : {
			Authorization : "OAuth2: token",
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		var jsonArray = response.data.xiaoQuList;
		var villageId = jsonArray.villageId;
		var villageName = jsonArray.villageName;
		for(var i=0;i<jsonArray.length;i++){
			var villageId = jsonArray[i].villageId;
			var villageName = jsonArray[i].villageName;
			var str = "<option value='"+villageId+"'>"+villageName+"</option>"; 
		$("#xq").append(str);
		}
	});
}

function addLd(){
	$("#ld").empty();
	var option = "<option selected='selected' value=''>楼栋</option>"; 
	$("#ld").append(option);
	var villageId = $("#xq").val();
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage("url")+'/houseLeasingController/ldList',
		param :{
				"token":summer.getAppStorage("tokenEntity").token,
				"villageId":villageId,
		},
		header : {
			Authorization : "OAuth2: token",
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		var jsonArray = response.data.louDongList;
		var buildingId = jsonArray.buildingId;
		var buildingName = jsonArray.buildingName;
		for(var i=0;i<jsonArray.length;i++){
			var buildingId = jsonArray[i].buildingId;
			var buildingName = jsonArray[i].buildingName;
			var str = "<option value='"+buildingId+"'>"+buildingName+"</option>"; 
		$("#ld").append(str);
		}
	});
}

function addFj(){
	$("#lx").empty();
	var option = "<option selected='selected' value=''>类型</option>"; 
	$("#lx").append(option);
	var buildingId = $("#ld").val();
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage("url")+'/houseLeasingController/lxList',
		param :{
				"token":summer.getAppStorage("tokenEntity").token,
				"buildingId":buildingId,
		},
		header : {
			Authorization : "OAuth2: token",
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		var jsonArray = response.data.leiXingList;
		var apartmentId = jsonArray.apartmentId;
		var apartmentName = jsonArray.apartmentName;
		for(var i=0;i<jsonArray.length;i++){
			var apartmentId = jsonArray[i].apartmentId;
			var apartmentName = jsonArray[i].apartmentName;
			var str = "<option value='"+apartmentId+"'>"+apartmentName+"</option>"; 
		$("#lx").append(str);
		}
		someHouses();
	});
}

function someHouses() {
	$("#s1").empty();
	var sqId = $("#sq").val();
	var xqId = $("#xq").val();
	var ldId = $("#ld").val();
	var lxId = $("#lx").val();
	summer.post(summer.getAppStorage("url")+"/houseLeasingController/list", {
	 		"token":summer.getAppStorage("tokenEntity").token,
			"tenantId" : summer.getAppStorage("tenantid"),
			"communityId":sqId,
			"villageId":xqId,
			"buildingId":ldId,
			"apartmentId":lxId
	}, {
	    Authorization : "OAuth2:token",
	}, function(response) {
		response.data = JSON.parse(response.data);
		var jsonArray = response.data.houseList;
		for(var i=0;i<jsonArray.length;i++){
			var id = jsonArray[i].id;
			var communityName = jsonArray[i].communityName;
			var villageName = jsonArray[i].villageName;
			var buildingName = jsonArray[i].buildingName;
			var houseName = jsonArray[i].houseName;
			var inJacketArea = jsonArray[i].inJacketArea;
			var apartmentName = jsonArray[i].apartmentName;
			var tablePrice = jsonArray[i].tablePrice;
			var apartmentPhoto = jsonArray[i].apartmentPhoto;
			var unitNumber = jsonArray[i].unitNumber;
			var theFloorNumber = jsonArray[i].theFloorNumber;
			if(jsonArray[i].housePhotoVideo == null){
				var housePhotoVideo = "../img/fw3.png";
			}else{
				var housePhotoVideo = jsonArray[i].housePhotoVideo;	
			}
			var str = '<li class="um-listview-row leaselist" onclick="leaseInfo(this,'+i+')" style="background:#fff;" >'
                	+'	<a href="#" class="um-list-item um-swipe-action um-no-icon" >'
                	+'			<div class="um-list-item-media">'
                	+'				<img src="'+housePhotoVideo+'">'
                	+'				<span id="housePhotoVideo'+i+'" style="display:none;">'+housePhotoVideo+'</span>'
                	+'			</div>'
                	+'			<div class="um-list-item-inner">'
                	+'				<div class="um-list-item-body" style="padding-right:5px;">'
                	+'					<div  class="leasebt">'+communityName+villageName+buildingName+'<br>'+unitNumber+houseName+'</div>'
                	+'					<div id="photoContent'+i+'" class="leasebt" style="display: none;">'+apartmentPhoto+'</div>'
                	+'					<div>'
                	+'						<span  class="f14 um-gray listview-detail">'+inJacketArea+'m²'+'|'+apartmentName+'</span>'
                	+'					</div>'
                	+'					<div class="tl um-red leaseprise">'
                	+'						<span >'+tablePrice+'￥/月</span>'
                	+'						<span id="id'+i+'" style="display: none">'+id+'</span>'
                	+'					</div>'
                	+'				</div>'
                	+'			</div>'
                	+'		</a>'
                	+'	</li>';
			$("#s1").append(str);
		}
		if(jsonArray.length == 0){
			UM.toast({
				title:'温馨提示',
			    text: '暂无数据!',
			    duration: 1500
			});
		}
	});
}

//排序
function sort(){
	var oneSort = $("#oneSort").val();
	$("#s1").empty();
	var sqId = $("#sq").val();
	var xqId = $("#xq").val();
	var ldId = $("#ld").val();
	var lxId = $("#lx").val();
	summer.post(summer.getAppStorage("url")+"/houseLeasingController/list", {
	 		"token":summer.getAppStorage("tokenEntity").token,
			"tenantId" : summer.getAppStorage("tenantid"),
			"communityId":sqId,
			"villageId":xqId,
			"buildingId":ldId,
			"apartmentId":lxId,
			"sortType":oneSort,
	}, {
	    Authorization : "OAuth2:token",
	}, function(response) {
		response.data = JSON.parse(response.data);
		var jsonArray = response.data.houseList;
		for(var i=0;i<jsonArray.length;i++){
			var id = jsonArray[i].id;
			var communityName = jsonArray[i].communityName;
			var villageName = jsonArray[i].villageName;
			var buildingName = jsonArray[i].buildingName;
			var houseName = jsonArray[i].houseName;
			var inJacketArea = jsonArray[i].inJacketArea;
			var apartmentName = jsonArray[i].apartmentName;
			var tablePrice = jsonArray[i].tablePrice;
			var apartmentPhoto = jsonArray[i].apartmentPhoto;
			var unitNumber = jsonArray[i].unitNumber;
			var theFloorNumber = jsonArray[i].theFloorNumber;
			if(jsonArray[i].housePhotoVideo == null){
				var housePhotoVideo = "../img/fw3.png";
			}else{
				var housePhotoVideo = jsonArray[i].housePhotoVideo;	
			}
			var str ='<li class="um-listview-row leaselist" onclick="leaseInfo(this,'+i+')" style="background:#fff;" >'
                	+'	<a href="#" class="um-list-item um-swipe-action um-no-icon" >'
                	+'			<div class="um-list-item-media">'
                	+'				<img src="'+housePhotoVideo+'">'
                	+'				<span id="housePhotoVideo'+i+'" style="display:none;">'+housePhotoVideo+'</span>'
                	+'			</div>'
                	+'			<div class="um-list-item-inner">'
                	+'				<div class="um-list-item-body" style="padding-right:5px;">'
                	+'					<div  class="leasebt">'+communityName+villageName+buildingName+'<br>'+unitNumber+houseName+'</div>'
                	+'					<div id="photoContent'+i+'" class="leasebt" style="display: none;">'+apartmentPhoto+'</div>'
                	+'					<div>'
                	+'						<span  class="f14 um-gray listview-detail">'+inJacketArea+'m²'+'|'+apartmentName+'</span>'
                	+'					</div>'
                	+'					<div class="tl um-red leaseprise">'
                	+'						<span >'+tablePrice+'￥/月</span>'
                	+'						<span id="id'+i+'" style="display: none">'+id+'</span>'
                	+'					</div>'
                	+'				</div>'
                	+'			</div>'
                	+'		</a>'
                	+'	</li>';
			$("#s1").append(str);
		}
		if(jsonArray.length == 0){
			UM.toast({
				title:'温馨提示',
			    text: '暂无数据!',
			    duration: 1500
			});
		}
	});
}

function goShequList() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "sheQuList"+t,
		"url" : "html/tenant/sheQuList.html"
	});
}

function goBefore() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "before"+t,
		"url" : "html/lease.html"
	});
}

//跳转到社区房源
function leaseList() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "leaseList"+t,
		"url" : "html/tenant/leaseList.html"
	});
}

//获取当前行数据的id并跳转到房屋信息
function leaseInfo(t,i) {
	var id = $("#id"+i).text();
	summer.setStorage("oneHouseId", id);
	var photoContent =  $("#photoContent"+i).text();
	summer.setStorage("photoContent", photoContent);
	var imgSrc =  $("#housePhotoVideo"+i).text();
	summer.setStorage("imgSrc", imgSrc);
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "leaseInfo"+t,
		"url" : "html/tenant/leaseInfo.html?id="+id
	});
}

//跳转到我的在租我的在租
function rent() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "rent"+t,
		"url" : "html/tenant/myRenting.html"
	});
}

//跳转到我的收藏
function collect() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "collect"+t,
		"url" : "html/tenant/myCollect.html"
	});
}

//跳转到租赁合同
function goContract() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "collect"+t,
		"url" : "html/tenant/contract.html"
	});
}

//跳转到我的续租
function like() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "like"+t,
		"url" : "html/tenant/myLeaseRequest.html"
	});
}

//跳转到退租
function end() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "end"+t,
		"url" : "html/tenant/myLeaseRequest.html"
	});
}

//跳转到首页
function goHome() {
	summer.closeWin({});
}
