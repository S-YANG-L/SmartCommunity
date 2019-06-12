function getQueryString(name) { 
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
var r = window.location.search.substr(1).match(reg); 
if (r != null) return unescape(r[2]); return null; 
} 

summerready = function() {
    //周期的开始
    	$("#det").empty();
   		var id = getQueryString("id");
        summer.ajax({
            type : 'post',
            url : summer.getAppStorage("url")+'/community/getCommunityNoteDetail',
            param : {
            	"token":summer.getAppStorage("tokenEntity").token,
            	"id" : id
            },
            header : {
                Authorization : "OAuth2: token",
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
        	response.data = JSON.parse(response.data);
			var jsonArray = response.data.list;
			var id = jsonArray.id;
			var title = jsonArray.title;
			var content = jsonArray.content;
			var publishDate = jsonArray.publishDate;
			var url = jsonArray.url;
			url = "http://"+url;
			var st = new Date(publishDate).format("yyyy-MM-dd hh:mm:ss");
			var str = '<div class="um-noticebody" >              	'
            		+'<p class="um-mobilebtnotice" id="title">'+title+'</p>'
					+'<p class="um-gray f12 "><span id="time">'+st+'</span></p>   ' 					
				  	+'<p class="f14 noticeline" id="message" style="margin-top:8px;">'+content+'</p>'				  
              		+'</div>';
            $("#det").append(str);		
        });
};

function goServerList() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "serverList"+t,
		"url" : "html/tenant/serverList.html"
	});
}

function goRepairEvalute() {
	var id = $("#id").text();
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "repairEvalute"+t,
		"url" : "html/tenant/repairEvalute2.html?id="+id
	});
}

Date.prototype.Format = function (fmt) { 
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


function goBack(){
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "goNewsListPage"+t,
		"url" : "html/center/newsList.html"
	});
}

function goParent(){
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "goNlistPage"+t,
		"url" : "html/center/noticeList.html"
	});
}