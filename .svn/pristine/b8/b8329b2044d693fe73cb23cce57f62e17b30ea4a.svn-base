function goRepairDtl() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "repairDtl"+t,
		"url" : "html/tenant/repairDtl.html"
	});
}
function goBack(){
	var t = (new Date()).valueOf();
	summer.openWin({
	    "id" : "back"+t,
	    "url" : "index.html"
	});
}
function goBackRd(){
	var t = (new Date()).valueOf();
	summer.openWin({
	    "id" : "backRd"+t,
	    "url" : "html/tenant/repairDtl.html"
	});
}
function goBackRbd(){
	var t = (new Date()).valueOf();
	summer.openWin({
	    "id" : "backRbd"+t,
	    "url" : "html/tenant/repairBillDtl.html"
	});
}
function goEvaluate(){
	var t = (new Date()).valueOf();
	summer.openWin({
	    "id" : "goEvaluate"+t,
	    "url" : "html/tenant/repairEvalute.html"
	});
}

function addRepair(){
	UM.confirm({
		text : '您确定要提交报修单吗？',
		btnText : ["取消", "确定"],
		overlay : true,
		ok : function() {			
			var oneNum = getRandomNumber();
			var twoNum = getRandomNumber();
			var userId = summer.getAppStorage("userId");
			var tenantid = summer.getAppStorage("tenantid");
			var userName = summer.getAppStorage("userName");
			var address = $("#address").val();
			var room = $("#room").val();
			var people = $("#people").val();
			var phone = $("#phone").val();
			var time = $("#time").val();
			var nowDate = new Date().Format("yyyy-MM-dd hh:mm");
			var objectDate1 = new Date(time.replace(/-/g,"\/"));
			var objectDate2 = new Date(nowDate.replace(/-/g,"\/"));
			
			var content = $("#content").val();
			var remark = $("#remark").val();
			var options=$("#mySelect option:selected").val();
			if(address == ''){
				UM.alert({
							title : '请选择服务地址 ！',
							btnText : ["取消", "确定"],
							overlay : true,
							ok : function() {
							}
					});
			}else if(room == ''){
				UM.alert({
							title : '请填写服务房间号！',
							btnText : ["取消", "确定"],
							overlay : true,
							ok : function() {
							}
					});
			}else if(people == ''){
				UM.alert({
							title : '请填写报修人姓名 ！',
							btnText : ["取消", "确定"],
							overlay : true,
							ok : function() {
							}
					});
			}else if(phone == ''){
				UM.alert({
							title : '请填写报修人手机号 ！',
							btnText : ["取消", "确定"],
							overlay : true,
							ok : function() {
							}
					});
			}else if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){ 
			//手机号码11位数字，目前支持前两位13、14、15、17、18手机号码
				  UM.alert({
					title : '请正确填写报修人手机号码 ！',
					btnText : ["取消", "确定"],
					overlay : true,
					ok : function() {
					}
				});
			}else if(time == ''){
				UM.alert({
							title : '请填写预约时间 ！',
							btnText : ["取消", "确定"],
							overlay : true,
							ok : function() {
							}
					});
			}else if(objectDate1 < objectDate2){
					UM.alert({
							title : '服务时间应大于当前时间 ！',
							btnText : ["取消", "确定"],
							overlay : true,
							ok : function() {
							}
					});	
			}else if(options == ''){
				UM.alert({
							title : '请选择报修类型 ！',
							btnText : ["取消", "确定"],
							overlay : true,
							ok : function() {
							}
					});
			}else if(content == ''){
					UM.alert({
							title : '请填写报修详情 ！',
							btnText : ["取消", "确定"],
							overlay : true,
							ok : function() {
							}
					});				
			}else{	
				//开始新增
			    summer.post(summer.getAppStorage("url")+"/Repair/repairSave", {
			    		"token":summer.getAppStorage("tokenEntity").token,
			    		"userId":userId,
			    		"userName":userName,
			    		"tenantid":tenantid,
				   		"serviceAddress":address,
				   		"room":room,
						"repairPeople":people,
						"contactNumber":phone,
						"appointmentDate":time,
						"repairContent":content,
						"orderContent":options,
						"processPicture":oneNum,
						"repairImage":twoNum,
						"remark":remark,
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
					if (code == 200) {
						UM.alert({
							title : '您的报修已提交 ！',
							btnText : ["取消", "确定"],
							overlay : true,
							ok : function() {
								var t = (new Date()).valueOf();
								summer.openWin({
									"id" : "repairDtl"+t,
									"url" : "html/tenant/repairDtl.html"
								});
							}
						});
			
					}
				}, function(response) {
				    alert("系统开小差了，请联系管理员！");
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
		                    batchno : twoNum,
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


//获取小区名、房间号
summerready = function(){
	$("#orderCommission0").empty();
	var $option = $(
		'<option selected="selected" value="">请选择服务地址</option>'
	);
	$option.appendTo($("#address"));
	var userName = summer.getAppStorage("userName");
	var userId = summer.getAppStorage("userId");
	var phone = summer.getAppStorage("userPhone");
	summer.ajax({
	    type : "post",
	    url : summer.getAppStorage("url")+"/Repair/getHouseName",
	    param : {
	        "token":summer.getAppStorage("tokenEntity").token,
	   		"userId":userId,
	    },
	    header : {
	        Authorization : "OAuth2:token"
	    }
	}, function(response) {
	    response.data = JSON.parse(response.data);
	    if(200 == response.data.code){
	    	var jsonArray = response.data.list;
		    for(var i=0;i<jsonArray.length;i++){
			    var houseName = jsonArray[i].HOUSE_NAME;
			    var villageName = jsonArray[i].VILLAGE_NAME;
			    var buildingName = jsonArray[i].BUILDING_NAME;
			    if(jsonArray.length != 0){
			    	var $option = $(
             					 '<option value="'+villageName+buildingName+houseName+'">'+villageName+buildingName+houseName+'</option>');
			    	$option.appendTo($("#address"));
				    $("#people").val(userName);
				    $("#phone").val(phone);
				    	
				    $("#add").remove();
				}
		   }
		    
	    }
	    else{
			document.getElementById("all").style.display="none";
			document.getElementById("record").style.display="none";
			var str = '<div style="text-align: center;margin: auto;" id="add">'
					  +'		<span id=""  >请先成为小区住户</span>'
					  +' </div>';
			$("#repair").append(str);
		}
	}, function(response) {
	    alert("系统开小差了,请联系管理员!");
	});
}

//生成随机数DOC+15位 7 8
function getRandomNumber(){
	 	var currentdate='DOC';
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
		for(var i = 0 ; i< 8 ; i++){
		    finalNum += Math.floor(Math.random()*10);
		}
        
        return currentdate+=date+finalNum;

}


function openPhotoAlbum() {
    var params = ["android.permission.READ_EXTERNAL_STORAGE"];
    commonFunc(params, openPhotoAlbum_common);
}

function commonFunc(params, common) {
    if ($summer.os == "android") {
        summer.getPermission(params, function(response) {//成功回调
            common();
        }, function(response) {//失败回调
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


