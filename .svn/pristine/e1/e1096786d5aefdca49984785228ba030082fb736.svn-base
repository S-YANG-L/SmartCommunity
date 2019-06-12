//返回
function goBack(){
	summer.closeWin({});
}

function getQueryString(name) { 
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
var r = window.location.search.substr(1).match(reg); 
if (r != null) return unescape(r[2]); return null; 
} 

summerready = function() {
	$("#s1").empty();
	$("#s2").empty();
    getRepair();
};

//未处理
function getRepair(){
	 var userName = summer.getAppStorage("userName");
	 summer.post(summer.getAppStorage("url")+"/Repair/getEvaluateLlist", {
	 		"token":summer.getAppStorage("tokenEntity").token,
    	 	"userName":userName,
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
		var jsonArray = response.data.list;
		for(var i=0;i<jsonArray.length;i++){
			var id = jsonArray[i].id;
			var singlePerson = jsonArray[i].singlePerson;
			var serviceAddress = jsonArray[i].serviceAddress;
			var appointmentDate = jsonArray[i].appointmentDate;
			var remark = jsonArray[i].remark;
			var orderType = jsonArray[i].orderType;
			var userFraction = jsonArray[i].userFraction;
			var userEvaluate = jsonArray[i].userEvaluate;
			var repairImage = jsonArray[i].repairImage;
			var processPicture = jsonArray[i].processPicture;
			if(0 == orderType){
				var str = '<li class="um-limarginbottom" style="background:#fff;padding:0;padding:0 0.64rem;" onclick="goDetail(this)">'
					+'			<div class="my-homebt">'
	                +'					<span class="my-homebtleft um-mobilebt32" data-bind="text:repairPosition" id="type">投诉、咨询类</span>'
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
					+'						<span class="repari-pleft">预约时间</span> '
					+'						<span data-bind="text:appointmentDate">'+appointmentDate+'</span>'
					+'					</p>	                				'
	                +'				</div>'
					+'			</li>	';
			}else if(1 == orderType){
				var str = '<li class="um-limarginbottom" style="background:#fff;padding:0;padding:0 0.64rem;" onclick="goDetail(this)">'
					+'			<div class="my-homebt">'
	                +'					<span class="my-homebtleft um-mobilebt32" data-bind="text:repairPosition" id="type">报修类</span>'
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
					+'						<span class="repari-pleft">预约时间</span> '
					+'						<span data-bind="text:appointmentDate">'+appointmentDate+'</span>'
					+'					</p>	                				'
	                +'				</div>'
					+'			</li>	';
			}else{
				var str = '<li class="um-limarginbottom" style="background:#fff;padding:0;padding:0 0.64rem;" onclick="goDetail(this)">'
					+'			<div class="my-homebt">'
	                +'					<span class="my-homebtleft um-mobilebt32" data-bind="text:repairPosition" id="type">服务预约类</span>'
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
					+'						<span class="repari-pleft">预约时间</span> '
					+'						<span data-bind="text:appointmentDate">'+appointmentDate+'</span>'
					+'					</p>	                				'
	                +'				</div>'
					+'			</li>	';
			}
			
			if(userEvaluate == null || userFraction == null){
				$("#s1").append(str);
			}else{
				$("#s2").append(str);
			}
		}
	}, function(response) {
	    alert(response.error);
	});
};

//根据ID查看详情
function goDetail(s){
	var id = $(s).find("#id").text();
	var type = $(s).find("#type").text();
	var repairImage = $(s).find("#repairImage").text();
	var processPicture = $(s).find("#processPicture").text();
	if("服务预约类" == type){
		var t = (new Date()).valueOf();
		summer.openWin({
			"id" : "serverDetails"+t,
			"url" : "html/tenant/serverDetails.html?id="+id+"&processPicture="+processPicture
		});
	}
	if("报修类" == type){
		var t = (new Date()).valueOf();
		summer.openWin({
			"id" : "repairDetails"+t,
			"url" : "html/tenant/repairDetails.html?id="+id+"&repairImage="+repairImage+"&processPicture="+processPicture
		});
	}
	if("投诉、咨询类" == type){
		var t = (new Date()).valueOf();
		summer.openWin({
			"id" : "MyleaveDetails"+t,
			"url" : "html/tenant/MyleaveDetails.html?id="+id+"&processPicture="+processPicture
		});
	}
	
}
