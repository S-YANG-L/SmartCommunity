summerready = function() {
	summer.ajax({
	    type : "post",
	    url : summer.getAppStorage("url")+"/MyInfo/selectByPhone",
	    param : {
	        "token":summer.getAppStorage("tokenEntity").token,
	   		"phone":summer.getAppStorage("userPhone"),
	    },
	    header : {
	        Authorization : "OAuth2:token"
	    }
	}, function(response) {
	    response.data = JSON.parse(response.data);
	    var pi = response.data.user;
	    var email = pi.email;
	    var contactAddress = pi.contactAddress;
	    var postalCode = pi.postalCode;
	    $("#piEmail").val(email);
	    $("#piPostalCode").val(postalCode);
	    $("#piAddress").val(contactAddress);
	})
}

//保存修改
function changePersonalInfo() {
	UM.confirm({
		text : '您确定要修改您的个人信息吗？',
		btnText : ["取消", "确定"],
		overlay : true,
		ok : function() {
			var email = $("#piEmail").val();
			var postalCode = $("#piPostalCode").val();
			var contactAddress = $("#piAddress").val();
			summer.post(summer.getAppStorage("url") + "/MyInfo/changeUserInfo", {
				"token" : summer.getAppStorage("tokenEntity").token,
				"email" : email,
				"contactAddress": contactAddress,
				"postalCode": postalCode,
				"contactNumber":summer.getAppStorage("userPhone")
			}, {
				Authorization : "OAuth2:token"
			}, function(response) {
				if ("Token已过期，请重新登录" == response.data) {
					UM.toast({
						text : '登录已失效，请重新登录'
					});
					var t = (new Date()).valueOf();
					summer.openWin({
						"id" : "signin" + t,
						"url" : "html/signin.html"
					});
				}
				response.data = JSON.parse(response.data);
				var code = response.data.code;
						if (code == 200) {
							UM.alert({
								title : '您的个人信息已经修改 ！',
								btnText : ["取消", "确定"],
								overlay : true,
								ok : function() {
									var t = (new Date()).valueOf();
									summer.openWin({
										"id" : "setUp"+t,
										"url" : "html/my/setUp.html"
									});
								}
							});
				
						}
			}, function(response) {
				alert("系统开小差了,请联系管理员!");
			});
		/*	//imagePaths为数组
			for ( i = 0; i < imgPathes.length; i++) {
				var imgPathWS = imgPathes[i].imgPath;
				//alert(imgPathWS);
				//多文件上传，5秒超时
				summer.multiUpload({
					fileArray : [{//文件列表，数组
						fileURL : imgPathWS, //需要上传的文件路径
						type : "image/jpeg", //上传文件的类型 > 例：图片为"image/jpeg"
						name : "imgs" //后台取图片的Key
					}],
					params : {
						token : summer.getAppStorage("tokenEntity").token,
					}, //上传参数
					//headers : {},
					SERVER : summer.getAppStorage('imgurl') +"/uploadfile/uploadfilestoapp", //服务器地址
					timeout : 5
				});
			}
			*/
		},
		cancle : function() {
			
		}
	});
	

}

/*
function openPhotoAlbum() {
	var params = ["android.permission.READ_EXTERNAL_STORAGE"];
	commonFunc(params, openPhotoAlbum_common);
}

function commonFunc(params, common) {
	if ($summer.os == "android") {
		summer.getPermission(params, function(response) {//成功回调
			common();
		}, function(response) {//失败回调
			// alert(response);
		});
	} else {
		common();
	}
}

var imgPathes;
//打开系统相册，选择多张图片
var openPhotoAlbum_common = function() {	
		summer.openPhotoAlbum({
			type : "multiple", //支持选多张图片
			maxCount : 2,
			callback : function(args) {
				imgPathes = args.imgPaths;
				var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>',
				    $gallery = $("#gallery"),
				    $galleryImg = $("#galleryImg"),
				    $uploaderInput = $("#uploaderInput"),
				    $uploaderFiles = $("#uploaderFiles");
				    $uploaderFiles.find("li").eq(0).remove();
				for ( i = 0; i < args.imgPaths.length; i++) {
					var imgPathWS = args.imgPaths[i].imgPath;
					$uploaderFiles.append($(tmpl.replace('#url#', imgPathWS)));
				}
				var index;
				$uploaderFiles.on("click", "li", function() {
					index = $(this).index();
					$galleryImg.attr("style", this.getAttribute("style"));
					$gallery.fadeIn(100);
				});
				$gallery.on("click", function() {
					$gallery.fadeOut(100);
				});
				//删除图片
			
			}
		});
	}
	*/
//返回上一页
function goBack() {
	summer.closeWin({});
}
