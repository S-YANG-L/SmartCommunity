//跳转到物业缴费页面(返回)
function goPayment() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : "goPayment"+t,
		url : "html/payment.html",

	});
}

//跳转到交水费
function confirmPay() {
    var billContent = summer.getStorage("billInfo");
    summer.setStorage("billContent", billContent);
    var t = (new Date()).valueOf();
	summer.openWin({
		id : "payWater"+t,
		url : "html/tenant/paying.html",

	});
}


summerready = function() {
	//页面非循环内容
	var oneInfo = summer.getStorage("billInfo")
	var names = oneInfo.customerName;
	document.getElementById("yeZhu").innerHTML = names;
	var money = oneInfo.unpaidAmount+'元';
	document.getElementById("payMoney").innerHTML = money;
	var type = oneInfo.billType;
	if (type == '1'){
		$("#oneType").attr("src","../../img/billtype02.png");
	}else if(type == '0'){
		$("#oneType").attr("src","../../img/billtype01.png");
	}else{
		$("#oneType").attr("src","../../img/billtype03.png");
	}
	

	datesourse();
	//用作行点击时间
	$(function() {
		var listviewTwo = UM.listview("#listviewTwo");
	})

}

//循环出页面内容
var ViewModel = function() {

};
var viewModel = new ViewModel();
var jsonArray = '';
function datesourse() {
	var oneInfo2 = summer.getStorage("billInfo");
	var oneId = oneInfo2.id;
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage("url")+'/billAndPayController/listDtl',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			//"customerId":summer.getAppStorage("userId"),
			"tenantId" : summer.getStorage("tenantid"),
			"billId":oneId
		},
		header : {
			Authorization : "OAuth2: token",
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		jsonArray = response.data.billListDtl;
		viewModel.data = ko.observableArray(jsonArray);
		ko.applyBindings(viewModel);
	});

}

