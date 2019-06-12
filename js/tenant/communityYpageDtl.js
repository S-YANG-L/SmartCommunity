function getQueryString(name) { 
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
var r = window.location.search.substr(1).match(reg); 
if (r != null) return unescape(r[2]); return null; 
} 

summerready = function() {
    //周期的开始
    var id = getQueryString("id");
        summer.ajax({
            type : 'post',
            url : summer.getAppStorage("url")+'/community/getCommunityYpagesDetail',
            param : {
            	  "token":summer.getAppStorage("tokenEntity").token,
	        	  "id":id,
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
			var jsonArray = response.data.communityYpages;
			$("#id").text(jsonArray.id);
			$("#title").text(jsonArray.title);
			$("#date").text(jsonArray.publishDate);
			$("#img").attr("src",jsonArray.image);
			var conOne = jsonArray.content;
			var conTwo = conOne.replace(/<[^>]+>|&[^>]+;/g,"").trim();
			$("#cont").text(conTwo);           
        });
        loadPicture();
};

//页面获取到图片并展示
function loadPicture(){
	var imgNo = getQueryString("image");
	summer.ajax({
		"header" : {
			Authorization : "OAuth2: token",
		},
		"type" : "POST",
		"url" : summer.getAppStorage('imgurl')+"/uploadfile/getfileinfo",
		"async" : "false",
		"param" : {
			token : summer.getAppStorage("tokenEntity").token,
			batchno : imgNo,
		},
	}, function(response) {//成功回调
		setTimeout(function() {
			response.data = JSON.parse(response.data);
			var jsonArray1 = $summer.strToJson(response.data.message);
			var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>',
			    $gallery = $("#gallery"),
			    $galleryImg = $("#galleryImg"),
			    $uploaderInput = $("#uploaderInput"),
			    $uploaderFiles = $("#uploaderFiles");
			for ( i = 0; i < jsonArray1.length; i++) {
				var imgPathWS = jsonArray1[i].filePath;
				amgId = jsonArray1[i].fileId;
				$uploaderFiles.append($(tmpl.replace('#url#', imgPathWS)));
			}
			//点击图片以展开图片查看
			$uploaderFiles.on("click", "li", function() {
                $galleryImg.attr("style", this.getAttribute("style"));
                $gallery.fadeIn(100);
            });
            //点击可关闭图片
            $gallery.on("click", function() {
                $gallery.fadeOut(100);
            });
		}, 100);
	}, function(response) {//失败回调
		alert("系统开小差了,请联系管理员！");
	});
}

//返回到上一页       	
function goBack() {
	 summer.closeWin({});
}
