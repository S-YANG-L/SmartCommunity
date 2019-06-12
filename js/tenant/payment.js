//跳转返回主页
function goHome() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : "payHome"+t,
		url : "index.html",
	});
}

function goDetail() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : "payDetail"+t,
		url : "html/tenant/record.html",
	});
}

//跳转到物业缴费类型页面
function goPays() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : "goPays"+t,
		url : "html/tenant/payType.html",
	});
}

//跳转到缴费记录
function payRecord() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : "payRecord"+t,
		url : "html/tenant/payRecord.html",
	});
}

//跳转到我的缴费记录详情
function payRecordDtl(){
	var t = (new Date()).valueOf();
	summer.openWin({
		id : "payRecordDtl"+t,
		url : "html/tenant/payRecordDtl.html",
	});
}

summerready = function() {
	datesourse();
	$(function() {
		var listview = UM.listview("#listview");
		//行点击事件，并获取当前行数据
		listview.on("itemClick", function(sender, args) {
			var billInfo = viewModel.data()[args.rowIndex];
    		summer.setStorage('billInfo',billInfo)
		})  
	})
    var tag=document.getElementById('billTypes');
    var content=tag.innerText;
}

//循环出页面内容
var ViewModel = function() {

};
var viewModel = new ViewModel();
var jsonArray = '';
function datesourse() {
	summer.ajax({
		type : 'post',
		url :  summer.getAppStorage("url")+'/billAndPayController/list',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"customerId":summer.getAppStorage("userId"),
			"tenantId" : summer.getStorage("tenantid"),
			"leaseBillStatus":"0"
		},
		header : {
			Authorization : "OAuth2: token",
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		jsonArray = response.data.list;
		viewModel.data = ko.observableArray(jsonArray);
		ko.applyBindings(viewModel);
	});
}