var ViewModel = function() {
};
var viewModel = new ViewModel();
var start = 0;
summerready = function() {
    getRepair();
	viewModel.data = ko.observableArray([]);
	viewModel.data2 = ko.observableArray([]);
    var listview = UM.listview("#listview");
    var listview2 = UM.listview("#listview2");  
    
    listview.on("pullUp", function(sender) {
    	var startTime = $("#start").val();
		var end = $("#end").val();
        start += 10;
        //这是可以编写列表上拉加载逻辑，参数sender即为当前列表实例对象
        summer.ajax({
            "header" : {
                Authorization : "OAuth2: token"
            },
            "type" : "POST",
            "url" : summer.getAppStorage('url') + "/Repair/repaitLlist",
            "param" : {
                "token" : summer.getAppStorage("tokenEntity").token,
                "status":"3",
    	 		"userName":summer.getAppStorage("userName"),
    	 		"orderType":1,
    	  		"startTime":startTime,
    	  		"end":end,
    	  		"start":start
            },
        }, function(response) {//成功回调
           response.data = JSON.parse(response.data);
		   var jsonArray = response.data.listRepairs;
           if(response.data.code == "200") {
           		for(var k=0;k<jsonArray.length;k++){
					var id = jsonArray[k].id;
					var repairImage = jsonArray[k].repairImage;
					var orderContent = jsonArray[k].orderContent;
					var orderStatus = jsonArray[k].orderStatus;
					var singlePerson = jsonArray[k].singlePerson;
					var serviceAddress = jsonArray[k].serviceAddress;
					var processPicture = jsonArray[k].processPicture
					var draftDate = jsonArray[k].draftDate;
					var str = '<li class="um-limarginbottom" style="background:#fff;padding:0;padding:0 0.64rem;" onclick="goDetail(this)">'
							+'			<div class="my-homebt">'
			                +'					<span class="my-homebtleft um-mobilebt32" data-bind="text:orderContent">'+orderContent+'</span>'
			                +'					<span class="my-homebtright" data-bind="text:orderStatus">'+(orderStatus=='1'?'已接单':(orderStatus=='4'?'重新派单':(orderStatus=='6'?'待派单':'已派单')))+'</span>'
			                +'				</div>'
			                +'				<div class="my-homeli">   '
			                +'					<p style="display: none">'
							+'						<span class="repari-pleft">ID</span> '
							+'						<span data-bind="text:id" id="id">'+id+'</span>'
							+'						<span data-bind="text:repairImage" id="repairImage">'+repairImage+'</span>'
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
							+'						<span class="repari-pleft">提报日期</span> '
							+'						<span data-bind="text:draftDate">'+draftDate+'</span>'
							+'					</p>	                				'
			                +'				</div>'
							+'			</li>	';
					
					$("#s1").append(str);
					sender.refresh();
				}
            } else{
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
    
    listview2.on("pullUp", function(sender) {
    	var startTime = $("#start").val();
		var end = $("#end").val();
        start += 10;
        //这是可以编写列表上拉加载逻辑，参数sender即为当前列表实例对象
        summer.ajax({
            "header" : {
                Authorization : "OAuth2: token"
            },
            "type" : "POST",
            "url" : summer.getAppStorage('url') + "/Repair/repaitLlist",
            "param" : {
                "token" : summer.getAppStorage("tokenEntity").token,
                "status":"5",
    	 		"userName":summer.getAppStorage("userName"),
    	 		"orderType":1,
    	  		"startTime":startTime,
    	  		"end":end,
    	  		"start":start
            },
        }, function(response) {//成功回调
           response.data = JSON.parse(response.data);
		   var jsonArray2 = response.data.listRepair;
           if(response.data.code == "200") {
           		for(var i=0;i<jsonArray2.length;i++){
					var id = jsonArray2[i].id;
					var repairImage = jsonArray2[i].repairImage;
					var orderContent = jsonArray2[i].orderContent;
					var orderStatus = jsonArray2[i].orderStatus;
					var singlePerson = jsonArray2[i].singlePerson;			
					var serviceAddress = jsonArray2[i].serviceAddress;
					var processPicture = jsonArray2[i].processPicture
					var draftDate = jsonArray2[i].draftDate;
					var str = '<li class="um-limarginbottom" style="background:#fff;padding:0;padding:0 0.64rem;" onclick="goDetail(this)">'
							+'			<div class="my-homebt">'
			                +'					<span class="my-homebtleft um-mobilebt32" data-bind="text:orderContent">'+orderContent+'</span>'
			                +'					<span class="my-homebtright" data-bind="text:orderStatus">'+(orderStatus =='3' ? '待评价' : (orderStatus == '5' ? '已完成' : (orderStatus == '9' ? '已评价':'已作废')))+'</span>'
			                +'				</div>'
			                +'				<div class="my-homeli">   '
			                +'					<p style="display: none">'
							+'						<span class="repari-pleft">ID</span> '
							+'						<span data-bind="text:id" id="id">'+id+'</span>'
							+'						<span data-bind="text:repairImage" id="repairImage">'+repairImage+'</span>'
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
							+'						<span class="repari-pleft">提报日期</span> '
							+'						<span data-bind="text:draftDate">'+draftDate+'</span>'
							+'					</p>	                				'
			                +'				</div>'
							+'			</li>	';
					
					$("#s2").append(str);
					sender.refresh();
				}
            } else{
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
};

function goDetail(s){
	var id = $(s).find("#id").text();
	var repairImage = $(s).find("#repairImage").text();
	var processPicture = $(s).find("#processPicture").text();
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "repairDetail"+t,
		"url" : "html/tenant/repairDetails.html?id="+id+"&repairImage="+repairImage+"&processPicture="+processPicture
	});
}

//未处理
function getRepair(){
	 $("#s1").empty();
	 var startTime = $("#start").val();
	 var end = $("#end").val();
	 summer.post(summer.getAppStorage("url")+"/Repair/repaitLlist", {
	 		"token":summer.getAppStorage("tokenEntity").token,
			"status":"3",
    	 	"userName":summer.getAppStorage("userName"),
    	 	"orderType":1,
    	  	"startTime":startTime,
    	  	"end":end,
    	  	"start":start
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
		for(var k=0;k<jsonArray.length;k++){
			var id = jsonArray[k].id;
			var repairImage = jsonArray[k].repairImage;
			var orderContent = jsonArray[k].orderContent;
			var orderStatus = jsonArray[k].orderStatus;
			var singlePerson = jsonArray[k].singlePerson;
			var serviceAddress = jsonArray[k].serviceAddress;
			var processPicture = jsonArray[k].processPicture
			var draftDate = jsonArray[k].draftDate;
			var str = '<li class="um-limarginbottom" style="background:#fff;padding:0;padding:0 0.64rem;" onclick="goDetail(this)">'
					+'			<div class="my-homebt">'
	                +'					<span class="my-homebtleft um-mobilebt32" data-bind="text:orderContent">'+orderContent+'</span>'
	                +'					<span class="my-homebtright" data-bind="text:orderStatus">'+(orderStatus=='1'?'已接单':(orderStatus=='4'?'重新派单':(orderStatus=='6'?'待派单':'已派单')))+'</span>'
	                +'				</div>'
	                +'				<div class="my-homeli">   '
	                +'					<p style="display: none">'
					+'						<span class="repari-pleft">ID</span> '
					+'						<span data-bind="text:id" id="id">'+id+'</span>'
					+'						<span data-bind="text:repairImage" id="repairImage">'+repairImage+'</span>'
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
					+'						<span class="repari-pleft">提报日期</span> '
					+'						<span data-bind="text:draftDate">'+draftDate+'</span>'
					+'					</p>	                				'
	                +'				</div>'
					+'			</li>	';
			
			$("#s1").append(str);
		}
	},function(response) {
	    alert("系统开小差了，请联系管理员！");
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
    	 	"orderType":1,
			"startTime":startTime,
    	  	"end":end,
    	  	"start":start
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
			var repairImage = jsonArray2[i].repairImage;
			var orderContent = jsonArray2[i].orderContent;
			var orderStatus = jsonArray2[i].orderStatus;
			var singlePerson = jsonArray2[i].singlePerson;			
			var serviceAddress = jsonArray2[i].serviceAddress;
			var processPicture = jsonArray2[i].processPicture
			var draftDate = jsonArray2[i].draftDate;
			var str = '<li class="um-limarginbottom" style="background:#fff;padding:0;padding:0 0.64rem;" onclick="goDetail(this)">'
					+'			<div class="my-homebt">'
	                +'					<span class="my-homebtleft um-mobilebt32" data-bind="text:orderContent">'+orderContent+'</span>'
	                +'					<span class="my-homebtright" data-bind="text:orderStatus">'+(orderStatus =='3' ? '待评价' : (orderStatus == '5' ? '已完成' : (orderStatus == '9' ? '已评价':'已作废')))+'</span>'
	                +'				</div>'
	                +'				<div class="my-homeli">   '
	                +'					<p style="display: none">'
					+'						<span class="repari-pleft">ID</span> '
					+'						<span data-bind="text:id" id="id">'+id+'</span>'
					+'						<span data-bind="text:repairImage" id="repairImage">'+repairImage+'</span>'
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
					+'						<span class="repari-pleft">提报日期</span> '
					+'						<span data-bind="text:draftDate">'+draftDate+'</span>'
					+'					</p>	                				'
	                +'				</div>'
					+'			</li>	';
			
			$("#s2").append(str);
		}

	}, function(response) {
	    alert("系统开小差了，请联系管理员！");
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

//筛选内容重置
function formReset(){		
	document.getElementById("start").value = "";
	document.getElementById("end").value = "";
}