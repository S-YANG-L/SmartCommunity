summerready = function() {
	datesourse();
}
var ViewModel = function() {

};
var viewModel = new ViewModel();
var jsonArray = '';
var jsonArryTwo = '';
function datesourse() {
	var id = summer.getStorage("pId");
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage("url") + '/billAndPayController/list',
		param : {
			"token" : summer.getAppStorage("tokenEntity").token,
			"customerId" : summer.getAppStorage("userId"),
			"tenantId" :  summer.getAppStorage("tenantid"),
			"leaseBillStatus" : "1",
			"id":id
		},
		header : {
			Authorization : "OAuth2: token",
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		jsonArray = response.data.list;
		var pMoney = jsonArray[0].amountReceived;
		var pcode = jsonArray[0].billNumber;
		var name = jsonArray[0].customerName;
		var address = jsonArray[0].leaseholdName;
		var openDate = jsonArray[0].openDate;
		var payDate = jsonArray[0].signLeaseDate;
		var endDate = jsonArray[0].paymentDeadline;
		$("#pMoney").text(pMoney);
		$("#pcode").text(pcode);
		$("#name").text(name);
		$("#address").text(address);
		$("#openDate").text(openDate);
		$("#payDate").text(payDate);
		$("#endDate").text(endDate);
		jsonArryTwo = jsonArray[0].billAndPayDetail;
		viewModel.data = ko.observableArray(jsonArryTwo);
		ko.applyBindings(viewModel);
	});
}

//返回上一页
function goBack(){
	summer.rmStorage("pId");
	summer.closeWin();
}