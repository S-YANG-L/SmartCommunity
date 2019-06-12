summerready = function() {
    test();
    var tokenEntitys = summer.getAppStorage("tokenEntity");
    var token = tokenEntitys.token;
    var tokenExpiryTime = tokenEntitys.tokenExpiryTime;
    var timestamp = (new Date()).getTime();
    if (timestamp > tokenExpiryTime) {
        UM.toast({
            text : 'Token已过期，请重新登录'
        });
    }
    summerready = function() {
        test();
        var tokenEntitys = summer.getAppStorage("tokenEntity");
        var token = tokenEntitys.token;
        var tokenExpiryTime = tokenEntitys.tokenExpiryTime;
        var timestamp = (new Date()).getTime();
        if (timestamp > tokenExpiryTime) {
            UM.toast({
                text : 'Token已过期，请重新登录'
            });
        }
        if ( typeof (token) == "undefined" || token == "null" || null == token) {
        } else {
            var t = (new Date()).valueOf();
            summer.openWin({
                "id" : "back" + t,
                "url" : "index.html"
            });
        }
    }
}
function login() {
    var phone = $("#uphone").val();
    var upass = $("#upass").val();
    if ("" == phone || "" == upass) {
        UM.toast({
            text : '请输入手机号或密码'
        });
    } else {
        summer.post(summer.getAppStorage("url") + "/MyInfo/login", {
            "token" : summer.getAppStorage("tokenEntity"),
            "phone" : phone,
            "password" : upass,
        }, {
            Authorization : "OAuth2:token"
        }, function(response) {
            if ("Token已过期，请重新登录" == response.data) {
                UM.toast({
                    text : '登录已失效，请重新登录'
                });
                var t = (new Date()).valueOf();
                summer.openWin({
                    "id" : "signin" + t,
                    "url" : "html/signin.html"
                });
            }
            response.data = JSON.parse(response.data);
            var code = response.data.code
            if (200 == code) {
                var user = response.data.user;
                var userId = user.id;
                var userName = user.customerName;
                var userPhone = user.contactNumber;
                var tenantid = user.tenantid;
                var userPassword = user.customerPassword;
                var tokenEntity = response.data.tokenEntity;
                //保存到localServer
                summer.setAppStorage("userId", userId);
                summer.setAppStorage("userName", userName);
                summer.setAppStorage("userPhone", userPhone);
                summer.setAppStorage("tenantid", tenantid);
                summer.setAppStorage("tokenEntity", tokenEntity);
                summer.setStorage("tokenEntity", tokenEntity);
                //summer.setAppStorage("imgurl", "http://192.168.43.224:8089/document")
                summer.setAppStorage("imgurl", "http://172.20.10.3:9080/document");
                var t = (new Date()).valueOf();
                summer.openWin({
                    "id" : "login_index" + t,
                    "url" : "index.html"
                });
            }
            if (201 == code) {
                UM.toast({
                    text : '手机号或密码错误'
                });
            }
        }, function(response) {
            alert("系统开小差了,请联系管理员!");
        });
    }
    test1();
}

function test1() {
    summer.setStorage("name", $("#uphone").val());
    summer.setStorage("password", $("#upass").val());
    var bool = $("input[type='checkbox']").is(':checked')
    summer.setStorage("checkbox", bool);
    summer.setStorage("true", true);
}

function test() {
    var name = summer.getStorage("name");
    var pass = summer.getStorage("password");
    var boolea = summer.getStorage("checkbox");
    if (boolea == summer.getStorage("true")) {
        $("#upass").val(pass);
        $("#uphone").val(name);
        $("input[type='checkbox']").attr("checked", true);
    } else {
    }
}

function forget() {
    var t = (new Date()).valueOf();
    summer.openWin({
        "id" : "checking" + t,
        "url" : "html/checking.html"
    });
}