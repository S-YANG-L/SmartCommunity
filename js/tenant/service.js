function getQueryString(name) { 
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
var r = window.location.search.substr(1).match(reg); 
if (r != null) return unescape(r[2]); return null; 
} 

summerready = function() {
        summer.ajax({
            type : 'post',
            url : summer.getAppStorage("url")+'/ComplaintSuggestion/csList',
            param : {
            	  "token":summer.getAppStorage("tokenEntity").token,
				  "userName":summer.getAppStorage("userName"),
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
			var jsonArray = response.data.listRepair;
            // 构造控件Vue实例
			var listview = new Vue({
				el : '#listview',
				data : {
					listDatas : [],
					timeOutEvent : 0
				},
				mounted : function() {
					// 组件挂载后执行...
					this.listDatas = jsonArray;
				},
				methods : {
					cancelTapHold : function() {
						// 取消长按
						clearTimeout(this.timeOutEvent);
						this.timeOutEvent = 0;
					},
					deleteItem : function(index) {
						// 这里编辑删除列表项逻辑
						this.listDatas.splice(index, 1);
					},
					loadTop : function() {
						// 这里编辑下拉刷新逻辑
						var self = this;
						setTimeout(function() {
							var row = {
							};
							self.listDatas.unshift(row);
							self.$refs.loadmore.onTopLoaded();
						}, 2000);
					},
					loadBottom : function() {
						// 这里编辑上拉加载逻辑
						var self = this;
						setTimeout(function() {
							var row = {
							};
							self.listDatas.push(row);
							self.$refs.loadmore.onBottomLoaded();
						}, 2000);
					}
				}
			});
        });
};

function goMyWords(s){
	var id = $(s).find("#id").text();
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "myLeaveDetails"+t,
		"url" : "html/tenant/myLeaveDetails.html?id="+id
	});
}

function goBack(){
	var t = (new Date()).valueOf();
	summer.openWin({
			"id" : "goBackm"+t,
			"url" : "html/my.html"
	});
}

