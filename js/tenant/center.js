//跳转到通知
function notice() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : 'noticeList'+t,
		url : 'html/center/noticeList.html',
	});

}

//跳转到反馈
function tickling() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : 'newsList'+t,
		url : 'html/center/newsList.html',
	});
}

//跳转到通知列表详情
function goNoticeDtl(s) {
	var id = $(s).find("#id").text();
	summer.post(summer.getAppStorage("url")+"/community/updateState", {
	 		"token":summer.getAppStorage("tokenEntity").token,
	 		"state":1,
	 		"id":id,
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
		
	}, function(response) {
	    alert(response.error);
	});
	var t = (new Date()).valueOf();
	summer.openWin({
		id : 'goNoticeDtl'+t,
		url : 'html/center/noticeListDtl.html?id='+id,
	});
}

//跳转到消息列表详情
function goNewsDtl() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : 'goNewsDtl'+t,
		url : 'html/center/newsListDtl.html',
	});
}
//跳转到首页
function goHome() {
 	summer.closeWin({});
}

summerready = function() {	
    getServer();
};

function getServer(){
	$("#s1").empty();
	$("#s2").empty();
	 var start = $("#start").val();
	 var end = $("#end").val();
	 var userId = summer.getAppStorage("userId");
	 var tenantid = summer.getAppStorage("tenantid");
	 summer.post(summer.getAppStorage("url")+"/community/getCommunityNote", {
	 		"token":summer.getAppStorage("tokenEntity").token,
    	 	"userId":userId,
    	 	"stype":1,
    	 	"start":start,
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
		var jsonArray = response.data.list;
		for(var i=0;i<jsonArray.length;i++){
			var id = jsonArray[i].sid;
			var title = jsonArray[i].title;
			var publishDate = jsonArray[i].publishDate;
			var d = new Date(publishDate).format("yyyy-MM-dd");
			var content = jsonArray[i].content;
			var state = jsonArray[i].state;
			if(0 == state){
				var str = '<li onclick="goNoticeDtl(this)">'
						+'	<a href="#" class="um-list-centernotice"> '
						+'			<div class="center-icon">'
						+'				<img alt="" src = "../../img/notice-icon.png">'
						+'			</div>'
						+'			<div class="um-media-body" style="width:80%;">'
						+'				<p class="notice-bt">'
						+'					<span class="um-mobilebt32" >'+title+'</span>'
						+'					<span class="um-gray f12 fr" >'+d+'</span>'
						+'				</p>'
						+'				<p style="display: none">'
						+'					<span class="repari-pleft">ID</span> '
						+'					<span  id="id">'+id+'</span>'
						+'				</p>'
						+'				<p class="um-gray f14 um-text-overflow2" >'+content+'</p>'
						+'			</div>		'														
						+'		</a>'
						+'	</li>		';
				$("#s1").append(str);
			}else{
				var str = '<li onclick="goNoticeDtl(this)">'
						+'	<a href="#" class="um-list-centernotice"> '
						+'			<div class="center-icon">'
						+'				<img alt="" src = "../../img/notice-icon.png">'
						+'			</div>'
						+'			<div class="um-media-body" style="width:80%;">'
						+'				<p class="notice-bt">'
						+'					<span class="um-mobilebt32" >'+title+'</span>'
						+'					<span class="um-gray f12 fr" >'+d+'</span>'
						+'				</p>'
						+'				<p style="display: none">'
						+'					<span class="repari-pleft">ID</span> '
						+'					<span  id="id">'+id+'</span>'
						+'				</p>'
						+'				<p class="um-gray f14 um-text-overflow2" >'+content+'</p>'
						+'			</div>		'														
						+'		</a>'
						+'	</li>		';
				$("#s2").append(str);
			}
		}
	}, function(response) {
	    alert(response.error);
	});
};



function check(){
	var dstart = $("#start").val();
	var dend = $("#end").val();
	getServer();
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

//筛选内容重置
function formReset(){		
	document.getElementById("start").value = "";
	document.getElementById("end").value = "";

}

function keyBack(){
	var t = (new Date()).valueOf();
   summer.openWin({
		id : 'goNewsPage'+t,
		url : 'index.html',
	});
}
