summerready = function() {
	var billContents = summer.getStorage("billContent");
	document.getElementById("totalSum").innerHTML = billContents.plannedReceiptAmount;
	document.getElementById("billNumber").innerHTML = billContents.billNumber;
    document.getElementById("customerName").innerHTML = billContents.customerName;
    document.getElementById("customerAddress").innerHTML = billContents.leaseholdName;
    document.getElementById("openDate").innerHTML = billContents.openDate;
    document.getElementById("endPayingDate").innerHTML = billContents.paymentDeadline;
}
//支付宝支付
function nowPay(){
	//获取账单ID作为支付订单号
	var billContents = summer.getStorage("billContent");
	var outTradeNos = billContents.id;
	var needPayMoney = $("#totalSum").text();
	summer.ajax({
	        type : "post",
	        url : summer.getAppStorage("url")+'/moveAlipay/zfbPay',
	        param : {
				"token":summer.getAppStorage("tokenEntity").token,
				"outTradeNo":outTradeNos,
				"totalAmount":needPayMoney
			}
	    }, function(ret) {
	    	//alert(ret.data);
	        var dataO = JSON.parse(ret.data);
	        var body=dataO.body;
	       //	alert(body);
	        cordova.require("cordova-plugin-summer-pay.summerpay").alipay({"orderInfo": body}, function(args) {
	          // 打开支付成功页面
	          summer.toast({
	            msg: "支付成功"
	          });
	        }, function(err) {
	          // 打开支付失败页面
	          summer.toast({
	            msg: "支付失败"
	          });
	        });
	    }, function(err) {
	        alert(err);
	    }); 
}

/*function nowPay(){
	summer.openWin({
			id : 'message',
			url : '/html/tenant/payForH5.html',
		});
}*/