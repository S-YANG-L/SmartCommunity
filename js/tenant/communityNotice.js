summerready = function() {
	getList();
};

function getList(){
	$("#s1").empty();
	var start = $("#start").val();
	var end = $("#end").val();
	summer.post(summer.getAppStorage("url")+"/community/getCommunityBulletin", {
			"token":summer.getAppStorage("tokenEntity").token,
			"tenantid":summer.getAppStorage("tenantid"),
        	"newsType":"1", 		      	
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
				var title = jsonArray[i].title;
				var publishDate = jsonArray[i].publishDate;
				var d = new Date(publishDate).format("yyyy-MM-dd hh:mm:ss");
				var content = jsonArray[i].content;
				var contentTwo = content.replace(/<[^>]+>|&[^>]+;/g,"").trim();
				var image = jsonArray[i].image;
				var imgUrl = jsonArray[i].imgUrl;
				var str = '<li onclick="goNoticeDtl(this)">'
						+'		<a href="#" class="um-list-centernotice"> '
						+'			<div class="center-icon">'
						+'				<img alt="" src="'+imgUrl+'">'
						+'          	<span style="display:none;" id="image">'+image+'</span>'
						+'			</div>'								
						+'			<div class="um-media-body"  style="width:80%;">'
						+'				<p class="notice-bt">'
						+'					<span class="um-mobilebt32"  id="nid" style="display: none">'+id+'</span>'
						+'					<span class="um-mobilebt32" >'+title+'</span>'
						+'					<span class="um-gray f12 fr" style="float:right">'+d+'</span>'
						+'				</p>'									
						+'				<p class="um-gray f14 um-text-overflow2" >'+contentTwo+'</p>'
						+'			</div>'																
						+'		</a>'
						+'	</li>		';
				$("#s1").append(str);
			}
			if(jsonArray.length == 0){
					UM.toast({
						title:'温馨提示',
					    text: '当前条件下暂无数据!',
					    duration: 1500
					});
				}
	}, function(response) {
	    alert("系统开小差了,请联系管理员!");
	});
};

//筛选
 function check(){
	$("#s1").empty();
	var dstart = $("#start").val();
	var dend = $("#end").val();
	if(dstart == ''){
		var startDate = '';
	}else{
		var startDate = new Date(dstart).Format("yyyy-MM-dd hh:mm:ss");
	}
	if(dend == ''){
		var endDate = '';
	}else{
		var endDate = new Date(dend).Format("yyyy-MM-dd hh:mm:ss");
	}
	summer.post(summer.getAppStorage("url")+"/community/getCommunityBulletin", {
			"token":summer.getAppStorage("tokenEntity").token,
        	"newsType":"1",
  			"startDate":startDate,
	  		"endDate":endDate,
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
				var title = jsonArray[i].title;
				var publishDate = jsonArray[i].publishDate;
				var d = new Date(publishDate).Format("yyyy-MM-dd hh:mm:ss");
				var content = jsonArray[i].content;
				var contentTwo = content.replace(/<[^>]+>|&[^>]+;/g,"").trim();
				var image = jsonArray[i].image;
				var imgUrl = jsonArray[i].imgUrl;
				var str = '<li onclick="goNoticeDtl(this)">'
						+'		<a href="#" class="um-list-centernotice"> '
						+'			<div class="center-icon">'
						+'				<img alt="" src="'+imgUrl+'">'
						+'         		<span style="display:none;" id="image">'+image+'</span>'
						+'			</div>'								
						+'			<div class="um-media-body"  style="width:80%;">'
						+'				<p class="notice-bt">'
						+'					<span class="um-mobilebt32"  id="nid" style="display: none">'+id+'</span>'
						+'					<span class="um-mobilebt32" >'+title+'</span>'
						+'					<span class="um-gray f12 fr" style="float:right">'+d+'</span>'
						+'				</p>'									
						+'				<p class="um-gray f14 um-text-overflow2" >'+contentTwo+'</p>'
						+'			</div>'																
						+'		</a>'
						+'	</li>		';
				$("#s1").append(str);
			}
			if(jsonArray.length == 0){
					UM.toast({
						title:'温馨提示',
					    text: '当前条件下暂无数据!',
					    duration: 1500
					});
				}
	}, function(response) {
	    alert("系统开小差了,请联系管理员!");
	});
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

//跳转到公告详情
function goNoticeDtl(s){
	var id = $(s).find("#nid").text();
	var image = $(s).find("#image").text();
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "communityNoticeDtl"+t,
		"url" : "/html/communityNoticeDtl.html?id="+id+"&image="+image
	});
}

//返回上一页（跳转到首页）
function goHome() {
	 summer.closeWin({});
}
 