function goHome(){
 	summer.closeWin({});;
}	

summerready = function() {
    getRepair();
};

//跳转到数据详情页
function goDetail(s){
	var id = $(s).find("#id").text();
	var processPicture = $(s).find("#processPicture").text();
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "serverDetails"+t,
		"url" : "html/tenant/serverDetails.html?id="+id+"&processPicture="+processPicture
	});
}

//未处理
function getRepair(){
 	$("#s1").empty();
	 var startTime = $("#start").val();
	 var end = $("#end").val();
	 var userName = summer.getAppStorage("userName");
	 summer.post(summer.getAppStorage("url")+"/Repair/repaitLlist", {
	 		"token":summer.getAppStorage("tokenEntity").token,
			"status":"3",
    	 	"userName":userName,
    	 	"orderType":2,
			"startTime":startTime,
    	  	"end":end,
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
		var jsonArray = response.data.listRepairs;
		var code = response.data.code;
		if(code == 202){
			UM.toast({
				title:'温馨提示',
			    text: '暂无已预约数据!',
			    duration: 1200
			});
		}
		for(var i=0;i<jsonArray.length;i++){
			var id = jsonArray[i].id;
			var orderContent = jsonArray[i].orderContent;
			var orderStatus = jsonArray[i].orderStatus;
			var singlePerson = jsonArray[i].singlePerson;
			var serviceAddress = jsonArray[i].serviceAddress;
			var appointmentDate = jsonArray[i].appointmentDate;
			var remark = jsonArray[i].remark;
			var serviceContent = jsonArray[i].serviceContent;
			var processPicture = jsonArray[i].processPicture
			var str = '<li class="um-limarginbottom" style="background:#fff;padding:0;padding:0 0.64rem;" onclick="goDetail(this)">'
					+'			<div class="my-homebt">'
	                +'					<span class="my-homebtleft um-mobilebt32" data-bind="text:orderContent">'+orderContent+'</span>'
	                +'					<span class="my-homebtright" data-bind="text:orderStatus">'+(orderStatus=='1'?'已接单':(orderStatus=='4'?'重新派单':(orderStatus=='6'?'待派单':'已派单')))+'</span>'
	                +'				</div>'
	                +'				<div class="my-homeli">   '
	                +'					<p style="display: none">'
					+'						<span class="repari-pleft">ID</span> '
					+'						<span data-bind="text:id" id="id">'+id+'</span>'
					+'						<span data-bind="text:processPicture" id="processPicture">'+processPicture+'</span>'
					+'					</p>'
					+'					<p>'
					+'						<span class="repari-pleft">处理人</span> '
					+'						<span data-bind="text:singlePerson">'+singlePerson+'</span>'
					+'					</p>'
					+'					<p>'
					+'						<span class="repari-pleft">服务地址</span> '
					+'						<span data-bind="text:serviceAddress">'+serviceAddress+'</span>'
					+'					</p>'
					+'					<p>'
					+'						<span class="repari-pleft">预约时间</span> '
					+'						<span data-bind="text:appointmentDate">'+appointmentDate+'</span>'
					+'					</p>	                				'
	                +'				</div>'
					+'			</li>	';
			
			$("#s1").append(str);
		}
	}, function(response) {
	    alert(response.error);
	});
}
//已处理
function getRepairs(){
 	 $("#s2").empty();
	 var startTime = $("#start").val();
	 var end = $("#end").val();
	 summer.post(summer.getAppStorage("url")+"/Repair/repaitLlist", {
	 		"token":summer.getAppStorage("tokenEntity").token,
			"status":"5",
    	 	"userName":summer.getAppStorage("userName"),
    	 	"orderType":2,
			"startTime":startTime,
    	  	"end":end,
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
		var jsonArray2 = response.data.listRepair;
		var code = response.data.code;
		if(code == 202){
			UM.toast({
				title:'温馨提示',
			    text: '暂无已完成数据!',
			    duration: 1200
			});
		}
		for(var i=0;i<jsonArray2.length;i++){
			var id = jsonArray2[i].id;
			var orderContent = jsonArray2[i].orderContent;
			var orderStatus = jsonArray2[i].orderStatus;
			var singlePerson = jsonArray2[i].singlePerson;
			var serviceAddress = jsonArray2[i].serviceAddress;
			var appointmentDate = jsonArray2[i].appointmentDate;
			var remark = jsonArray2[i].remark;
			var serviceContent = jsonArray2[i].serviceContent;
			var processPicture = jsonArray2[i].processPicture
			var str = '<li class="um-limarginbottom" style="background:#fff;padding:0;padding:0 0.64rem;" onclick="goDetail(this)">'
					+'			<div class="my-homebt">'
	                +'					<span class="my-homebtleft um-mobilebt32" data-bind="text:orderContent">'+orderContent+'</span>'
	                +'					<span class="my-homebtright" data-bind="text:orderStatus">'+(orderStatus =='3' ? '待评价' : (orderStatus == '5' ? '已完成' : (orderStatus == '9' ? '已评价':'已作废')))+'</span>'
	                +'				</div>'
	                +'				<div class="my-homeli">   '
	                +'					<p style="display: none">'
					+'						<span class="repari-pleft">ID</span> '
					+'						<span data-bind="text:id" id="id">'+id+'</span>'
					+'						<span data-bind="text:processPicture" id="processPicture">'+processPicture+'</span>'
					+'					</p>'
					+'					<p>'
					+'						<span class="repari-pleft">处理人</span> '
					+'						<span data-bind="text:singlePerson">'+singlePerson+'</span>'
					+'					</p>'
					+'					<p>'
					+'						<span class="repari-pleft">服务地址</span> '
					+'						<span data-bind="text:serviceAddress">'+serviceAddress+'</span>'
					+'					</p>'
					+'					<p>'
					+'						<span class="repari-pleft">预约时间</span> '
					+'						<span data-bind="text:appointmentDate">'+appointmentDate+'</span>'
					+'					</p>	                				'
	                +'				</div>'
					+'			</li>	';
			
			$("#s2").append(str);
		}
	}, function(response) {
	    alert(response.error);
	});
}


function check(){
	var dstart = $("#start").val();
	var dend = $("#end").val();
	getRepair();
	getRepairs();
	$('.um-dark').fadeOut(100);
	$('.um-screenbox').slideUp(200);
}
