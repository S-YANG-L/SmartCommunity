summerready = function(){
	 $('#bphone').blur(function () {
           var thePhone = $(this).val();
           var theName = $("#bname").val();
           summer.post(summer.getAppStorage("url")+"/Visit/phoneLlist", {
			 		"token":summer.getAppStorage("tokenEntity").token,
					"intervieweeIphoneNum":thePhone,
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
		        var list = response.data.phone;
		        if(list.length <= 0 || theName != list[0].customerName){
		        	UM.alert({
						title : '被访人手机号与被访人不相符！',
						btnText : ["取消", "确定"],
						overlay : true,
						ok : function() {
						}
					});
		        }
		    });
        });
}

//提交申请
function addVisitor() {
	UM.confirm({
		text : '您确定要提交此预约吗？',
		btnText : ["取消", "确定"],
		overlay : true,
		ok : function() {
			var batchNo = getRandomNumber();
			var bname = $("#bname").val();
			var bphone = $("#bphone").val();
			var broom = $("#broom").val();
			var uname = $("#uname").val();
			var uphone = $("#uphone").val();
			var dType = $("#documentType").val();
			var ucard = $("#ucard").val();
			var start = $("#start").val();
			var end = $("#end").val();
			var appl = $("#appl").val();
			var uid = summer.getAppStorage("userId");
			var nowDate = new Date().Format("yyyy-MM-dd hh:mm");
			var date1 = new Date(start.replace(/-/g,"\/"));
			var date2 = new Date(end.replace(/-/g,"\/"));
			var date3 = new Date(nowDate.replace(/-/g,"\/"));
		        
			if(bname == '') {
				UM.alert({
					title : '请输入被访人姓名 ！',
					btnText : ["取消", "确定"],
					overlay : true,
					ok : function() {
					}
				});
			}else if(bphone == '') {
				UM.alert({
					title : '请输入被访人手机号！',
					btnText : ["取消", "确定"],
					overlay : true,
					ok : function() {
					}
				});
			}else if(!(/^1[3|4|5|7|8]\d{9}$/.test(bphone))){ 
			//手机号码11位数字，目前支持前两位13、14、15、16、17、18手机号码
				  UM.alert({
					title : '请正确填写被访人手机号码 ！',
					btnText : ["取消", "确定"],
					overlay : true,
					ok : function() {
					}
				});
			}else if(broom == '') {
				UM.alert({
					title : '请输入被访人房间号 ！',
					btnText : ["取消", "确定"],
					overlay : true,
					ok : function() {
					}
				});
			}else if(uname == '') {
				UM.alert({
					title : '请输入申请人姓名 ！',
					btnText : ["取消", "确定"],
					overlay : true,
					ok : function() {
					}
				});
			}else if(uphone == '') {
				UM.alert({
					title : '请输入申请人手机号 ！',
					btnText : ["取消", "确定"],
					overlay : true,
					ok : function() {
					}
				});
			}else if(!(/^1[3|4|5|7|8]\d{9}$/.test(uphone))){ 
			//手机号码11位数字，目前支持前两位13、14、15、16、17、18手机号码
				  UM.alert({
					title : '请正确填写申请人手机号码 ！',
					btnText : ["取消", "确定"],
					overlay : true,
					ok : function() {
					}
				});
			}else if(dType == '') {
				UM.alert({
					title : '请选择申请证件！',
					btnText : ["取消", "确定"],
					overlay : true,
					ok : function() {
					}
				});
			}else if(ucard == '') {
				UM.alert({
					title : '请输入申请人证件号码 ！',
					btnText : ["取消", "确定"],
					overlay : true,
					ok : function() {
					}
				});
			}else if((ucard.length != 18)||(!(/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(ucard)))){ 
				  UM.alert({
					title : '请正确填写申请人身份证号！',
					btnText : ["取消", "确定"],
					overlay : true,
					ok : function() {
					}
				});
			}else if(start == '') {
				UM.alert({
					title : '请输入拜访开始时间！',
					btnText : ["取消", "确定"],
					overlay : true,
					ok : function() {
					}
				});
			}else if(end == '') {
				UM.alert({
					title : '请输入拜访结束时间 ！',
					btnText : ["取消", "确定"],
					overlay : true,
					ok : function() {
					}
				});
			}else if(date1 < date3) {
				UM.alert({
					title : '开始时间应大于等于当前时间 ！',
					btnText : ["取消", "确定"],
					overlay : true,
					ok : function() {
					}
				});
			}else if(date1 >= date2) {
				UM.alert({
					title : '结束时间应大于开始时间 ！',
					btnText : ["取消", "确定"],
					overlay : true,
					ok : function() {
					}
				});
			}else{	
				summer.post(summer.getAppStorage("url") + "/Visit/visitSave", {
					"token" : summer.getAppStorage("tokenEntity").token,
					"visitorId" : uid,
					"visitorName" : uname,
					"visitorIphoneNum" : uphone,
					"visitorIdNumber" : ucard,
					"visitStatrTime" : start,
					"visitEndTime" : end,
					"dType" : dType,
					"applyDesc" : appl,
					"intervieweeName" : bname,
					"intervieweeIphoneNum" : bphone,
					"intervieweeHouse" : broom,
					"visitPicture" : batchNo,
				}, {
					Authorization : "OAuth2:token"
				}, function(response) {
					if ("Token已过期，请重新登录" == response.data) {
						UM.toast({
							text : '登录已失效，请重新登录'
						});
						var t = (new Date()).valueOf();
						summer.openWin({
							"id" : "signin"+t,
							"url" : "html/signin.html"
						});
					}
					response.data = JSON.parse(response.data);
					var code = response.data.code;
					if (code == 200) {
						UM.alert({
							title : '您的预约已提交！',
							btnText : ["取消", "确定"],
							overlay : true,
							ok : function() {
								summer.closeWin({});
							}
						});
		
					}
				}, function(response) {
					alert("系统出错，请联系管理员!");
				});
		
				//imagePaths为数组
				for ( i = 0; i < imgPathes.length; i++) {
					var imgPathWS = imgPathes[i].imgPath;
					//多文件上传，5秒超时
					summer.multiUpload({
						fileArray : [{//文件列表，数组
							fileURL : imgPathWS, //需要上传的文件路径
							type : "image/jpeg", //上传文件的类型 > 例：图片为"image/jpeg"
							name : "imgs" //后台取图片的Key
						}],
						params : {
							token : summer.getAppStorage("tokenEntity").token,
							batchno : batchNo,
						}, //上传参数
						SERVER : summer.getAppStorage('imgurl')+"/uploadfile/uploadfilestoapp", //服务器地址
						timeout : 5
					});
				}
			}
		},
		cancle : function() {
			
		}
	});
}

//返回上一页
function goBack() {
	summer.closeWin({});
}

//生成随机数DOC+15位 7 8
function getRandomNumber() {
	var currentdate = 'DOC';
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	date = year + month + strDate;
	//八位随机数
	var finalNum = '';
	for (var i = 0; i < 8; i++) {
		finalNum += Math.floor(Math.random() * 10);
	}

	return currentdate += date + finalNum;

}

//此处开始是上传图片相关
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
		maxCount : 9,
		callback : function(args) {
			imgPathes = args.imgPaths;
			var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>',
			    $gallery = $("#gallery"),
			    $galleryImg = $("#galleryImg"),
			    $uploaderInput = $("#uploaderInput"),
			    $uploaderFiles = $("#uploaderFiles");
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
			$(".weui-gallery__del").click(function() {
				//alert("删除")
				$uploaderFiles.find("li").eq(index).remove();
			});
		}
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