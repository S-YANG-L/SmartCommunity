function goBack(){
	summer.rmStorage("contractDtls");
   	summer.closeWin();
}
var ViewModel = function() {

};
var viewModel = new ViewModel();
var jsonArray = '';
summerready = function() {
	//获取缓存
    var contractInfoDtl = summer.getStorage("contractDtls");
    //从缓存中获取客户名称
    $("#customerName").text(contractInfoDtl.customerName);
    //从缓存中获取证件号
    $("#certificateNumber").text(contractInfoDtl.certificateNumber);
    //从缓存中获取联系电话
    $("#contactNumber").text(contractInfoDtl.contactNumber);
    //从缓存中获取联系地址
    $("#contactAddress").text(contractInfoDtl.contactAddress);
    //从缓存中获取合同编码
    $("#contractNumber").text(contractInfoDtl.contractNumber);
    //从缓存中获取合同名称
    $("#contractName").text(contractInfoDtl.contractName);
    //从缓存中获取租赁物名称
    $("#leaseName").text(contractInfoDtl.communityName+contractInfoDtl.villageName+contractInfoDtl.buildingName+contractInfoDtl.houseName);
    //从缓存中获取业务员
    $("#salesman").text(contractInfoDtl.salesman);
    //从缓存中获取定金
    $("#earnestMoney").text(contractInfoDtl.earnestMoney);
    //从缓存中获取下定日期
    $("#fixedRentDate").text(contractInfoDtl.fixedRentDate);
    //从缓存中获取租赁开始日期
    $("#leaseStartDate").text(contractInfoDtl.leaseStartDate);
    //从缓存中获取租赁结束日期
    $("#leaseEndDate").text(contractInfoDtl.leaseEndDate);
    //从缓存中获取付款方式
    if(contractInfoDtl.paymentMode == 1){
    	$("#payMentType").text("月度付");
    }else if(contractInfoDtl.paymentMode == 2){
    	$("#payMentType").text("季度付");
    }else if(contractInfoDtl.paymentMode ==3){
    	$("#payMentType").text("半年付");
    }else if(contractInfoDtl.paymentMode == 4){
    	$("#payMentType").text("一年付");
    }else if(contractInfoDtl.paymentMode == 5){
    	$("#payMentType").text("一次付清");
    } 
    //从缓存中获取提前开账天数
    $("#advanceOpenDays").text(contractInfoDtl.advanceOpenDays);
    //从缓存中获取缴款账期（天）
    $("#paymentDate").text(contractInfoDtl.paymentDate);
    //从缓存中获取租金收取方式
    if(contractInfoDtl.rentalCollectMode == 1){
    	$("#rentalCollectMode").text("普通");
    }else if(contractInfoDtl.rentalCollectMode == 0){
    	$("#rentalCollectMode").text("抽成");
    }
    
    jsonArray = contractInfoDtl.documentFiles;
   	viewModel.data = ko.observableArray(jsonArray);
	ko.applyBindings(viewModel);
    
    //获取点击下载的附件信息，并进行附件下载
    var listview = UM.listview("#listview");
    listview.on("itemClick", function(sender, args) {
    //这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
        var item = viewModel.data()[args.rowIndex];
        var fId = item.id;
        var fName = item.fileName;
   		downloadFile(fId,fName);
    });
}

//附件下载
function downloadFile(fId,fName){
	cordova.InAppBrowser.open('http://192.168.43.224:8089/document/base?cmd=downloadAffixForMobile&fid='+fId, 
       '_system', 
       'location=yes,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭'
  );
}
