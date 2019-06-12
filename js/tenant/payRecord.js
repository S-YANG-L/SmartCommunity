var ViewModel = function() {

};
var viewModel = new ViewModel();
var jsonArray = '';
var start = 0;
summerready = function() {
		datesourse();
		viewModel.data = ko.observableArray([]);
   		ko.applyBindings(viewModel);
		var listview = UM.listview("#listview");
		//行点击事件，并获取当前行数据
		listview.on("itemClick", function(sender, args) {
			var prInfo = viewModel.data()[args.rowIndex];
			var pId = prInfo.id;	//定义当前行的ID
			summer.setStorage('pId',pId)
		})
		
			
 		listview.on("pullUp", function(sender) {
        	start += 10;
	        //这是可以编写列表上拉加载逻辑，参数sender即为当前列表实例对象
	        summer.ajax({
	            "header" : {
	                Authorization : "OAuth2: token"
	            },
	            "type" : "POST",
	            "url" : summer.getAppStorage('url') + "/billAndPayController/list",
	            "param" : {
	                "token" : summer.getAppStorage("tokenEntity").token,
	                "customerId" : summer.getAppStorage("userId"),
					"tenantId" :  summer.getAppStorage("tenantid"),
					"leaseBillStatus" : "1",
					"start":start
	            },
	        }, function(response) {//成功回调
		        var data = JSON.parse(response.data);
	            if (data.code == "200") {
	                var jsonArray = data.list;
	                if (jsonArray.length > 0) {
	                    for (var i = 0; i < jsonArray.length; i++) {
	                        var entity = jsonArray[i];
	                        viewModel.data.push(entity)
	                        sender.refresh();
	                    }
	                } else {
	                    viewModel.data.push();
	                    sender.refresh();
	                    summer.toast({
	                        "msg" : "数据已全部加载"
	                    })
	                }
	            }
	        }, function(response) {//失败回调
	            alert("系统开小差了,请联系管理员！");
	        });
    	});	
}
//循环出页面内容
function datesourse() {
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage("url") + '/billAndPayController/list',
		param : {
			"token" : summer.getAppStorage("tokenEntity").token,
			"customerId" : summer.getAppStorage("userId"),
			"tenantId" :  summer.getAppStorage("tenantid"),
			"leaseBillStatus" : "1",
			"start":start
		},
		header : {
			Authorization : "OAuth2: token",
		}
	}, function(response) {
		var data = JSON.parse(response.data);
        if (data.code == "200") {
            var jsonArray = data.list;
            for (var i = 0; i < jsonArray.length; i++) {
                var entity = jsonArray[i];
                viewModel.data.push(entity)
            }
            if(jsonArray.length == 0){
				UM.toast({
					title:'温馨提示',
				    text: '暂无数据!',
				    duration: 1500
				});
			}
        }
	});
}

//进入详情页
function payRecordDtl() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : "bxjlDetails"+t,
		url : "html/tenant/payRecordDtl.html",
	});
}
//返回上一页
function goBack() {
	summer.closeWin({});
}
