var ViewModel = function() {

};
var viewModel = new ViewModel();
var jsonArray = '';
var start = 0;
summerready = function() {
	datesourses();
	viewModel.data = ko.observableArray([]);
    ko.applyBindings(viewModel);
		var listview = UM.listview("#listview");
		//行点击事件，并获取当前行数据
		listview.on("itemClick", function(sender, args) {
			var contractDtls = viewModel.data()[args.rowIndex];
    		summer.setStorage('contractDtls',contractDtls)
		})
		listview.on("pullUp", function(sender) {
			var theId = summer.getAppStorage("userId");
        	start += 10;
	        //这是可以编写列表上拉加载逻辑，参数sender即为当前列表实例对象
	        summer.ajax({
				type : 'post',
				url : summer.getAppStorage("url")+'/myContractController/list',
				param : {
				    "token":summer.getAppStorage("tokenEntity").token,
				    "customerId":theId,
					"tenantId" : summer.getStorage("tenantid"),
					"start":start
				},
				header : {
					Authorization : "OAuth2: token",
				}
			}, function(response) {
				var data = JSON.parse(response.data);
            	if (data.code == "200") {
                var jsonArray = data.listMyContract;
                if (jsonArray.length > 0) {
                    for (var i = 0; i < jsonArray.length; i++) {
                        var entity = jsonArray[i];
                        viewModel.data.push(entity)
                        sender.refresh();
                    }
                }else {
                    viewModel.data.push()
                    sender.refresh();
                    summer.toast({
                        "msg" : "数据已全部加载"
                    })
                }
            	}
			}, function(response) {//失败回调
            alert("系统开小差了，请联系管理员！");
        });
	    })    
}

//页面加载数据
function datesourses() {
	var theId = summer.getAppStorage("userId");
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage("url")+'/myContractController/list',
		param : {
		    "token":summer.getAppStorage("tokenEntity").token,
		    "customerId":theId,
			"tenantId" : summer.getStorage("tenantid"),
			"start":start,
		},
		header : {
			Authorization : "OAuth2: token",
		}
	}, function(response) {
		var data = JSON.parse(response.data);
        if (data.code == "200") {
            var jsonArray = data.listMyContract;
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
//关闭当前页面返回到上一页
function goBack() {
	summer.closeWin({});
}

function goAuBack() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "houseAdd"+t,
		"url" : "html/houseInfo.html"
	});
}

function selectHouse() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "houseSelect"+t,
		"url" : "html/tenant/selectHouse.html"
	});
}

//跳转到详情页
function goHouseIinfo() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : "authentication"+t,
		url : "html/tenant/houseInfoDtl.html",
	});
}

function goAuthentication() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : "houseSelect"+t,
		url : "html/tenant/authentication.html",
	});
}

//跳转到合同详情
function goContractDtl() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : "contractDtl"+t,
		url : "html/my/contractDtl.html",
	});
}