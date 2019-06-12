summerready = function(){
	//var needPayMoney = $("#totalSum").text();"outTradeNo":outTradeNos,
	//"totalAmount":needPayMoney
		//alert(1);
	summer.ajax({
	        type : "post",
	        url : summer.getAppStorage("url")+'/aliPayH5/payH5',
	        param : {
				"token":summer.getAppStorage("tokenEntity").token,
				
				},
		header : {
			Authorization : "OAuth2: token",
		}
	}, function(response) {
		alert(response.data);
		response.data = JSON.parse(response.data);
	});
}
			/*}
	    }, function(ret) {
	    	alert(ret.data);
	        var dataO = JSON.parse(ret.data);
	        var body=dataO.body;
	       	alert(body);
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
}*/