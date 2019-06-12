var ViewModel = function() {
};
var viewModel = new ViewModel();
var start = 0;
summerready = function(){
	getPageOne();
	viewModel.data = ko.observableArray([]);
	viewModel.data2 = ko.observableArray([]);
    var listview = UM.listview("#listview");
    var listview2 = UM.listview("#listview2");  
	
	listview.on("pullUp", function(sender) {
    	var vId = summer.getAppStorage("userId");
        start += 10;
        summer.post(summer.getAppStorage("url")+"/Visit/myApplication", {
	 		"token":summer.getAppStorage("tokenEntity").token,
			"visitorId":vId,
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
			var jsonArray = response.data.applicationList;
			if(jsonArray.length != 0) {
				for(var i=0;i<jsonArray.length;i++){
					var id = jsonArray[i].id;
					var visitPicture = jsonArray[i].visitPicture;
					var status = jsonArray[i].status;
					var visitorName = jsonArray[i].visitorName;
					var intervieweeHouse = jsonArray[i].intervieweeHouse;
					var dateCreateTime = jsonArray[i].dateCreateTime;
					var d = new Date(dateCreateTime).format("yyyy/MM/dd ");
					var str = '<li class="um-limarginbottom" style="background:#fff;padding:0;padding:0 0.64rem;" onclick="goDetail(this)">'
							+'			<div class="my-homebt">'
			                +'					<span class="my-homebtright" data-bind="text:status">'+(status=='0'?'待审批':(status=='1'?'已通过':'已拒绝'))+'</span>'
			                +'				</div>'
			                +'				<div class="my-homeli">   '
			                +'					<p style="display: none">'
							+'						<span class="repari-pleft">ID</span> '
							+'						<span data-bind="text:id" id="id">'+id+'</span>'
							+'						<span data-bind="text:visitPicture" id="visitPicture">'+visitPicture+'</span>'
							+'					</p>'
							+'					<p>'
							+'						<span class="repari-pleft">申请人</span> '
							+'						<span data-bind="text:visitorName">'+visitorName+'</span>'
							+'					</p>'
							+'					<p>'
							+'						<span class="repari-pleft">访问地</span> '
							+'						<span data-bind="text:intervieweeHouse">'+intervieweeHouse+'</span>'
							+'					</p>'
							+'					<p>'
							+'						<span class="repari-pleft">创建时间</span> '
							+'						<span data-bind="text:dateCreateTime">'+d+'</span>'
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
    	var phoneNumber = summer.getAppStorage("userPhone")
        start += 10;
        summer.post(summer.getAppStorage("url")+"/Visit/myVisitor", {
	 		"token":summer.getAppStorage("tokenEntity").token,
			"intervieweeIphoneNum":phoneNumber,
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
		var jsonArray2 = response.data.myVisitorList;
		if(jsonArray2.length != 0) {
			for(var i=0;i<jsonArray2.length;i++){
				var id = jsonArray2[i].id;
				var status = jsonArray2[i].status;
				var visitPicture = jsonArray2[i].visitPicture;
				var visitorName = jsonArray2[i].visitorName;
				var intervieweeHouse = jsonArray2[i].intervieweeHouse;
				var dateCreateTime = jsonArray2[i].dateCreateTime;
				var d = new Date(dateCreateTime).format("yyyy/MM/dd ");
				var str = '<li class="um-limarginbottom" style="background:#fff;padding:0;padding:0 0.64rem;" onclick="goDetails(this)">'
						+'			<div class="my-homebt">'
		                +'					<span class="my-homebtright" data-bind="text:status">'+(status=='0'?'待审批':(status=='1'?'已通过':'已拒绝'))+'</span>'
		                +'				</div>'
		                +'				<div class="my-homeli">   '
		                +'					<p style="display: none">'
						+'						<span class="repari-pleft">ID</span> '
						+'						<span data-bind="text:id" id="id">'+id+'</span>'
						+'						<span data-bind="text:visitPicture" id="visitPicture">'+visitPicture+'</span>'
						+'					</p>'
						+'					<p>'
						+'						<span class="repari-pleft">申请人</span> '
						+'						<span data-bind="text:visitorName">'+visitorName+'</span>'
						+'					</p>'
						+'					<p>'
						+'						<span class="repari-pleft">访问地</span> '
						+'						<span data-bind="text:intervieweeHouse">'+intervieweeHouse+'</span>'
						+'					</p>'
						+'					<p>'
						+'						<span class="repari-pleft">创建时间</span> '
						+'						<span data-bind="text:dateCreateTime">'+d+'</span>'
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
    })    
}
//我的申请
function getPageOne(){
 	 $("#s1").empty();
	 var vId = summer.getAppStorage("userId");
	 summer.post(summer.getAppStorage("url")+"/Visit/myApplication", {
	 		"token":summer.getAppStorage("tokenEntity").token,
			"visitorId":vId,
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
		var jsonArray = response.data.applicationList;
		if(jsonArray.length == 0){
			UM.toast({
				title:'温馨提示',
			    text: '暂无我的申请数据!',
			    duration: 1200
			});
		}
		for(var i=0;i<jsonArray.length;i++){
			var id = jsonArray[i].id;
			var visitPicture = jsonArray[i].visitPicture;
			var status = jsonArray[i].status;
			var visitorName = jsonArray[i].visitorName;
			var intervieweeHouse = jsonArray[i].intervieweeHouse;
			var dateCreateTime = jsonArray[i].dateCreateTime;
			var d = new Date(dateCreateTime).format("yyyy/MM/dd ");
			var str = '<li class="um-limarginbottom" style="background:#fff;padding:0;padding:0 0.64rem;" onclick="goDetail(this)">'
					+'			<div class="my-homebt">'
	                +'					<span class="my-homebtright" data-bind="text:status">'+(status=='0'?'待审批':(status=='1'?'已通过':'已拒绝'))+'</span>'
	                +'				</div>'
	                +'				<div class="my-homeli">   '
	                +'					<p style="display: none">'
					+'						<span class="repari-pleft">ID</span> '
					+'						<span data-bind="text:id" id="id">'+id+'</span>'
					+'						<span data-bind="text:visitPicture" id="visitPicture">'+visitPicture+'</span>'
					+'					</p>'
					+'					<p>'
					+'						<span class="repari-pleft">申请人</span> '
					+'						<span data-bind="text:visitorName">'+visitorName+'</span>'
					+'					</p>'
					+'					<p>'
					+'						<span class="repari-pleft">访问地</span> '
					+'						<span data-bind="text:intervieweeHouse">'+intervieweeHouse+'</span>'
					+'					</p>'
					+'					<p>'
					+'						<span class="repari-pleft">创建时间</span> '
					+'						<span data-bind="text:dateCreateTime">'+d+'</span>'
					+'					</p>	                				'
	                +'				</div>'
					+'			</li>	';
			
			$("#s1").append(str);
		}
	}, function(response) {
	    alert("系统开小差了，请联系管理员！");
	});
}

//我的来客
function getPageTwo(){
	 $("#s2").empty();
	 var phoneNumber = summer.getAppStorage("userPhone")
	 summer.post(summer.getAppStorage("url")+"/Visit/myVisitor", {
	 		"token":summer.getAppStorage("tokenEntity").token,
			"intervieweeIphoneNum":phoneNumber,
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
		var jsonArray2 = response.data.myVisitorList;
		if(jsonArray2.length == 0){
			UM.toast({
				title:'温馨提示',
			    text: '暂无我的来客数据!',
			    duration: 1200
			});
		}
		for(var i=0;i<jsonArray2.length;i++){
			var id = jsonArray2[i].id;
			var status = jsonArray2[i].status;
			var visitPicture = jsonArray2[i].visitPicture;
			var visitorName = jsonArray2[i].visitorName;
			var intervieweeHouse = jsonArray2[i].intervieweeHouse;
			var dateCreateTime = jsonArray2[i].dateCreateTime;
			var d = new Date(dateCreateTime).format("yyyy/MM/dd ");
			var str = '<li class="um-limarginbottom" style="background:#fff;padding:0;padding:0 0.64rem;" onclick="goDetails(this)">'
					+'			<div class="my-homebt">'
	                +'					<span class="my-homebtright" data-bind="text:status">'+(status=='0'?'待审批':(status=='1'?'已通过':'已拒绝'))+'</span>'
	                +'				</div>'
	                +'				<div class="my-homeli">   '
	                +'					<p style="display: none">'
					+'						<span class="repari-pleft">ID</span> '
					+'						<span data-bind="text:id" id="id">'+id+'</span>'
					+'						<span data-bind="text:visitPicture" id="visitPicture">'+visitPicture+'</span>'
					+'					</p>'
					+'					<p>'
					+'						<span class="repari-pleft">申请人</span> '
					+'						<span data-bind="text:visitorName">'+visitorName+'</span>'
					+'					</p>'
					+'					<p>'
					+'						<span class="repari-pleft">访问地</span> '
					+'						<span data-bind="text:intervieweeHouse">'+intervieweeHouse+'</span>'
					+'					</p>'
					+'					<p>'
					+'						<span class="repari-pleft">创建时间</span> '
					+'						<span data-bind="text:dateCreateTime">'+d+'</span>'
					+'					</p>	                				'
	                +'				</div>'
					+'			</li>	';
			
			$("#s2").append(str);
		}
	}, function(response) {
	    alert("系统开小差了，请联系管理员！");
	});
}

//返回上一页面
function goBack(){
	  summer.closeWin({});
}

//返回
function goBack(){
	 summer.closeWin({});
}
//跳转到我的申请列表详情页
function goDetail(s){
	var id = $(s).find("#id").text();
	var	visitPicture = $(s).find("#visitPicture").text();
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "myVisitorDtl"+t,
		"url" : "html/my/myVisitorDtl.html?id="+id+"&visitPicture="+visitPicture
	});
}
//跳转到我的访客列表详情页
function goDetails(s){
	var id = $(s).find("#id").text();
	var	visitPicture = $(s).find("#visitPicture").text();
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "myVisitorDtl"+t,
		"url" : "html/my/myVisitorDtlTwo.html?id="+id+"&visitPicture="+visitPicture
	});
}