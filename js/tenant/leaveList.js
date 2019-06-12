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
   	    var userName = summer.getAppStorage("userName");
    	var startTime = $("#start").val();
		var end = $("#end").val();
        start += 10;
        //这是可以编写列表上
        summer.post(summer.getAppStorage("url")+"/Repair/repaitLlist", {
	 		"token":summer.getAppStorage("tokenEntity").token,
			"status":"3",
    	 	"userName":userName,
    	 	"orderType":0,
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
			if(response.data.code == "200") {
				for(var i=0;i<jsonArray.length;i++){
					var id = jsonArray[i].id;
					var orderStatus = jsonArray[i].orderStatus;
					var singlePerson = jsonArray[i].singlePerson;
					var serviceAddress = jsonArray[i].serviceAddress;
					var remark = jsonArray[i].remark;
					var draftDate = jsonArray[i].draftDate;
					var d = new Date(draftDate).format("yyyy/MM/dd ");
					var serviceContent = jsonArray[i].serviceContent;
					var processPicture = jsonArray[i].processPicture;
					var str = '<li class="um-limarginbottom" style="background:#fff;padding:0;padding:0 0.64rem;" onclick="goDetail(this)">'
							+'			<div class="my-homebt">'
			                +'					<span class="my-homebtleft um-mobilebt32" data-bind="text:repairPosition"></span>'
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
							+'						<span class="repari-pleft">发表时间</span> '
							+'						<span data-bind="text:appointmentDate">'+d+'</span>'
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
    })
        
    listview2.on("pullUp", function(sender) {
   	    var userName = summer.getAppStorage("userName");
    	var startTime = $("#start").val();
		var end = $("#end").val();
        start += 10;
        //这是可以编写列表上
        summer.post(summer.getAppStorage("url")+"/Repair/repaitLlist", {
	 		"token":summer.getAppStorage("tokenEntity").token,
			"status":"5",
    	 	"userName":userName,
    	 	"orderType":0,
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
			if(response.data.code == "200") {
				for(var i=0;i<jsonArray2.length;i++){
					var id = jsonArray2[i].id;
					var orderStatus = jsonArray2[i].orderStatus;
					var singlePerson = jsonArray2[i].singlePerson;
					var serviceAddress = jsonArray2[i].serviceAddress;
					var remark = jsonArray2[i].remark;
					var draftDate = jsonArray2[i].draftDate;
					var d = new Date(draftDate).format("yyyy/MM/dd ");
					var serviceContent = jsonArray2[i].serviceContent;
					var processPicture = jsonArray2[i].processPicture
					var str = '<li class="um-limarginbottom" style="background:#fff;padding:0;padding:0 0.64rem;" onclick="goDetail(this)">'
							+'			<div class="my-homebt">'
			                +'					<span class="my-homebtleft um-mobilebt32" data-bind="text:repairPosition"></span>'
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
							+'						<span class="repari-pleft">发表时间</span> '
							+'						<span data-bind="text:appointmentDate">'+d+'</span>'
							+'					</p>	                				'
			                +'				</div>'
							+'			</li>	';
					$("#s2").append(str);
					sender.refresh();
				}
			 } else{
            	viewModel.data2.push();
                sender.refresh();
                summer.toast({
                    "msg" : "数据已加载完毕"
                })
            }
        }, function(response) {//失败回调
            alert("请联系管理员解决！");
        });
    })
};

//筛选内容重置
function formReset(){		
	document.getElementById("start").value = "";
	document.getElementById("end").value = "";
}

function goDetail(s){
	var t = (new Date()).valueOf();
	var id = $(s).find("#id").text();
	var processPicture = $(s).find("#processPicture").text();
	summer.openWin({
		"id" : "serverDetails"+t,
		"url" : "html/tenant/MyleaveDetails.html?id="+id+"&processPicture="+processPicture
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
    	 	"orderType":0,
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
			    text: '暂无已提报数据!',
			    duration: 1200
			});
		}
		for(var i=0;i<jsonArray.length;i++){
			var id = jsonArray[i].id;
			var orderStatus = jsonArray[i].orderStatus;
			var singlePerson = jsonArray[i].singlePerson;
			var serviceAddress = jsonArray[i].serviceAddress;
			var remark = jsonArray[i].remark;
			var draftDate = jsonArray[i].draftDate;
			var d = new Date(draftDate).format("yyyy/MM/dd ");
			var serviceContent = jsonArray[i].serviceContent;
			var processPicture = jsonArray[i].processPicture;
			var str = '<li class="um-limarginbottom" style="background:#fff;padding:0;padding:0 0.64rem;" onclick="goDetail(this)">'
					+'			<div class="my-homebt">'
	                +'					<span class="my-homebtleft um-mobilebt32" data-bind="text:repairPosition"></span>'
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
					+'						<span class="repari-pleft">发表时间</span> '
					+'						<span data-bind="text:appointmentDate">'+d+'</span>'
					+'					</p>	                				'
	                +'				</div>'
					+'			</li>	';
			
			$("#s1").append(str);
		}
	}, function(response) {
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
    	 	"orderType":0,
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
			var orderStatus = jsonArray2[i].orderStatus;
			var singlePerson = jsonArray2[i].singlePerson;
			var serviceAddress = jsonArray2[i].serviceAddress;
			var remark = jsonArray2[i].remark;
			var draftDate = jsonArray2[i].draftDate;
			var d = new Date(draftDate).format("yyyy/MM/dd ");
			var serviceContent = jsonArray2[i].serviceContent;
			var processPicture = jsonArray2[i].processPicture
			var str = '<li class="um-limarginbottom" style="background:#fff;padding:0;padding:0 0.64rem;" onclick="goDetail(this)">'
					+'			<div class="my-homebt">'
	                +'					<span class="my-homebtleft um-mobilebt32" data-bind="text:repairPosition"></span>'
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
					+'						<span class="repari-pleft">发表时间</span> '
					+'						<span data-bind="text:appointmentDate">'+d+'</span>'
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

Date.prototype.Format = function (fmt) { //
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

//返回上一页面
function goBack(){
	  summer.closeWin({});
}