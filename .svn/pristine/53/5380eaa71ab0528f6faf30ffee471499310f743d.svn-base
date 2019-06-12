function getQueryString(name) { 
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
var r = window.location.search.substr(1).match(reg); 
if (r != null) return unescape(r[2]); return null; 
} 

summerready = function() {
    //周期的开始
   		var id = getQueryString("id");
        summer.ajax({
            type : 'post',
            url : summer.getAppStorage("url")+'/Repair/queryRepair',
             param : {
            	"token":summer.getAppStorage("tokenEntity").token,
            	"id" : id
            },
            header : {
                Authorization : "OAuth2: token",
            }
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
			var jsonArray = response.data.Repair;
			
			var id = jsonArray.id;
			var address = jsonArray.serviceAddress;
			var singlePerson = jsonArray.singlePerson;
			var people = jsonArray.repairPeople;
			var phone = jsonArray.contactNumber;
			var time = jsonArray.appointmentDate;
			var content = jsonArray.repairContent;
			var type = jsonArray.repairPosition
			var serviceContent = jsonArray.serviceContent;
			
			$("#id").text(id);
			$("#name").text(singlePerson);
			$("#position").text(serviceContent);
        });
};

function goServerList() {
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "repairDtl"+t,
		"url" : "html/tenant/serverList.html"
	});
}

function goRepairEvalute() {
	var id = $("#id").val();
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "repairEvalute"+t,
		"url" : "html/tenant/repairEvalute.html?id="+id
	});
}

function addEvaluate(){
	var id = $("#id").text();
	var fraction = $("#fraction").text();
	var evaCont = $("#evaCont").val();
	 summer.post(summer.getAppStorage("url")+"/Repair/addRepairView", {
	 		"token":summer.getAppStorage("tokenEntity").token,
	   		"id":id,
			"userFraction":fraction,
			"userEvaluate":evaCont,
			"orderStatus":9
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
		if(code == 200){
			UM.toast({
		  	  text: '评价成功'
			});
			var t = (new Date()).valueOf();
			summer.openWin({
				"id" : "evaluateListTwo"+t,
				"url" : "html/tenant/evaluateList.html"
			});
		}
	}, function(response) {
	    alert(response.error);
	});
}
