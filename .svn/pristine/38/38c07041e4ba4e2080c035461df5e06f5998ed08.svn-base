function goBack(){
	var t = (new Date()).valueOf();
	summer.openWin({
		id : "index"+t,
		url : "index.html",
	});
}

var ViewModel = function() {
};
var viewModel = new ViewModel();
var start = 0;
summerready = function() {	
    getUser();
	getList();	
	
	viewModel.data = ko.observableArray([]);
    var listview = UM.listview("#listview");
    listview.on("pullUp", function(sender) {
        start += 10;
        //这是可以编写列表上拉加载逻辑，参数sender即为当前列表实例对象
        summer.ajax({
            "header" : {
                Authorization : "OAuth2: token"
            },
            "type" : "POST",
            "url" : summer.getAppStorage('url') + "/serviceCenterController/list",
            "param" : {
                "token" : summer.getAppStorage("tokenEntity").token,
                "tenantId":summer.getAppStorage("tenantid"),
	 			"start":start
            },
        }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
		var code = response.data.code;
		if(code == 200){
			var list = response.data.list;		
                if (list.length > 0) {
					for (var i=0; i<list.length; i++){
				var str = '<div class="um-servicelist">'
					+'	<div class="um-servicelistzt">	'					
					+'		<div class="um-servicemsg">'
					+'			<p class="servicep1" id="p1">'+list[i].serviceTitle+'</p>'
					+'			<p class="servicep2" id="p2"><span><img src="../img/phoneicon.png"></span> '+list[i].serviceContactInformation+'</p>'
					+'			<p class="servicep3"><img src="../img/service03.png" onclick="addService(this)"></p>'
					+'		</div>'
					+'		<div class="um-serviceimg">'
					+'			<img src="'+list[i].imgUrl+'">'
					+'		</div>'
					+'	</div>'
					+'</div>';
				$("#ssl").append(str);
						sender.refresh();
					}
                } else {
                	viewModel.data.push();
                    sender.refresh();
                    summer.toast({
                        "msg" : "数据已加载完毕"
                    })
                }
            }
        }, function(response) {//失败回调
            alert("请联系管理员解决！");
        });
    });
};

function getList(){
	summer.post(summer.getAppStorage("url")+"/serviceCenterController/list", {
	 		"token":summer.getAppStorage("tokenEntity").token,
	 		"tenantId":summer.getAppStorage("tenantid"),
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
		var code = response.data.code;
		if(code == 200){
			var list = response.data.list;		
			for (var i=0; i<list.length; i++){
				var str = '<div class="um-servicelist">'
					+'	<div class="um-servicelistzt">	'					
					+'		<div class="um-servicemsg">'
					+'			<p class="servicep1" id="p1">'+list[i].serviceTitle+'</p>'
					+'			<p class="servicep2" id="p2"><span><img src="../img/phoneicon.png"></span> '+list[i].serviceContactInformation+'</p>'
					+'			<p class="servicep3"><img src="../img/service03.png" onclick="addService(this)"></p>'
					+'		</div>'
					+'		<div class="um-serviceimg">'
					+'			<img src="'+list[i].imgUrl+'">'
					+'		</div>'
					+'	</div>'
					+'</div>';
				$("#ssl").append(str);
			}
			
		}
	}, function(response) {
	    alert("系统开小差了，请联系管理员!");
	});
};

//新增预约服务
function addService(s){
	var userId = summer.getAppStorage("userId");
	var tenantid = summer.getAppStorage("tenantid");
	var userPhone = summer.getAppStorage("userPhone");
	var userName = summer.getAppStorage("userName");
	
	var title = $(s).parent().parent().find("#p1").text();
	var sphone = $(s).parent().parent().find("#p2").text();
	
	var houseName =  $("#room").text();
	var address =  $("#address").text();

	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "serverAdd"+t,
		"url" : "html/tenant/serverAdd.html?title="+title+"&sphone="+sphone
	});
};

//获取小区名、房间号
function getUser(){
	var userId = summer.getAppStorage("userId");
	var userName = summer.getAppStorage("userName");
	var phone = summer.getAppStorage("userPhone");
	summer.post(summer.getAppStorage("url")+"/Repair/getHouseName", {
	 		"token":summer.getAppStorage("tokenEntity").token,
	 		"userId":userId,
	}, {
	    Authorization : "OAuth2:token"
	}, function(response) {
	    response.data = JSON.parse(response.data);
	    var list = response.data.list;
	    var houseName = list[0].HOUSE_NAME;
	    var villageName = list[0].VILLAGE_NAME;
	    var buildingName = list[0].BUILDING_NAME;
	    $("#address").text(villageName+buildingName);
	    $("#room").text(houseName);
	}, function(response) {
	    alert(response.error);
	});
};

function goServerList() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "serverList"+t,
		"url" : "html/tenant/serverList.html"
	});
}