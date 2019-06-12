summerready = function() {
	getList();
};

function getList(){
	$("#s1").empty();
	summer.post(summer.getAppStorage("url")+"/community/getCommunityYpages", {
	 		"token":summer.getAppStorage("tokenEntity").token,
	 		"tenantid": summer.getAppStorage("tenantid"),
	 		
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
				var publisher = jsonArray[i].publisher;
				var imgUrl = jsonArray[i].imgUrl;
				var str = '<li class="um-listview-row leaselist" onclick="goYpageDtl(this)" style="background:#fff;padding:0.2rem 0;">'
                		+'	<a href="#" class="um-list-item um-swipe-action um-no-icon">'
                		+'		<div class="um-list-item-media">'
                		+'			<img id="img" alt="" src="'+imgUrl+'">'
                		+'          <span style="display:none;" id="image">'+image+'</span>'
                		+'		</div>'
                		+'		<div class="um-list-item-inner">'
                		+'			<div class="um-list-item-body" style="padding-right:5px;">'
                		+'				<div  class="um-text-overflow leasebt">'+title+'</div>'
                		+'				<div>'
                		+'					<span  id="nid" class="f14 um-gray listview-detail" style="display: none">'+id+'</span>'
                		+'					<span  class="f14 um-gray listview-detail">'+contentTwo+'</span>'
                		+'					<span  class="f14 um-gray listview-detail">'+publisher+'</span>'
                		+'				</div>'       
                		+'				<div class="tl um-red leaseprise">'
                		+'					<span >'+d+'</span>'
                		+'				</div>'
                		+'			</div>'
                		+'		</div>'
                		+'	</a>'
                		+'</li>';
				$("#s1").append(str);
			}
			if(jsonArray.length == 0){
					UM.toast({
						title:'温馨提示',
					    text: '当前条件下暂无数据!',
					    duration: 1500
					});
			}
	});
}
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
	summer.ajax({
		type : 'post',
		url :summer.getAppStorage("url")+'/community/getCommunityYpages', 
		param:{
		 		"token":summer.getAppStorage("tokenEntity").token,
		 		"tenantid": summer.getAppStorage("tenantid"),
		 		"startDate":startDate,
	    	  	"endDate": endDate	 		
		},
		header: {
		    Authorization : "OAuth2:token"
		}
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
				//alert(response.data);
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
					var publisher = jsonArray[i].publisher;
					var imgUrl = jsonArray[i].imgUrl;
					var str = '<li class="um-listview-row leaselist" onclick="goYpageDtl(this)" style="background:#fff;padding:0.2rem 0;">'
	                		+'	<a href="#" class="um-list-item um-swipe-action um-no-icon">'
	                		+'		<div class="um-list-item-media">'
	                		+'			<img id="img" alt="" src="'+imgUrl+'">'
	                		+'          <span style="display:none;" id="image">'+image+'</span>'
	                		+'		</div>'
	                		+'		<div class="um-list-item-inner">'
	                		+'			<div class="um-list-item-body" style="padding-right:5px;">'
	                		+'				<div  class="um-text-overflow leasebt">'+title+'</div>'
	                		+'				<div>'
	                		+'					<span  id="nid" class="f14 um-gray listview-detail" style="display: none">'+id+'</span>'
	                		+'					<span  class="f14 um-gray listview-detail">'+contentTwo+'</span>'
	                		+'					<span  class="f14 um-gray listview-detail">'+publisher+'</span>'
	                		+'				</div>'       
	                		+'				<div class="tl um-red leaseprise">'
	                		+'					<span >'+d+'</span>'
	                		+'				</div>'
	                		+'			</div>'
	                		+'		</div>'
	                		+'	</a>'
	                		+'</li>';
					$("#s1").append(str);
				}
				if(jsonArray.length == 0){
					UM.toast({
						title:'温馨提示',
					    text: '当前条件下暂无数据!',
					    duration: 1500
					});
				}
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

//跳转到详情页
function goYpageDtl(s){
	var t = (new Date()).valueOf();	
	var id = $(s).find("#nid").text();
	var image= $(s).find("#image").text();

	summer.openWin({
		"id" : "communityNoticeDtl"+t,
		"url" : "/html/communityYpageDtl.html?id="+id+"&image="+image
	});
}

//跳转到首页
function goHome() {
	 summer.closeWin({});
}

