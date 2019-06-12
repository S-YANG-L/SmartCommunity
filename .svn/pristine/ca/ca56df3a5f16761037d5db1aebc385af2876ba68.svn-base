function checkPnone() {
    var phone = $("#phone").val();
    var myreg = /^1[3456789]\d{9}$/;
    if (!myreg.test(phone)) {
        UM.toast({
            text : '请输入正确手机号'
        });
    } else {
        summer.post(summer.getAppStorage("url") + "/MyInfo/selectByPhone", {
            "token" : summer.getAppStorage("tokenEntity"),
            "phone" : phone,
        }, {
            Authorization : "OAuth2:token"
        }, function(response) {
            if ("Token已过期，请重新登录" == response.data) {
                UM.toast({
                    text : '登录已失效，请重新登录'
                });
            }
            response.data = JSON.parse(response.data);
            var user = response.data.user;
            if (user != null) {
                UM.toast({
                    text : '手机号已注册，请重新输入'
                });
            } else {
                UM.toast({
                    text : '该手机号可用'
                });
            }
        }, function(response) {
            alert(response.error);
        });
    }
};

function add() {
    alert($("#color-input-blue").val("2"));
}

function register() {
    alert($("#color-input-blue").val());
    var phone = $("#phone").val();
    var check = $("#check").val();
    var ps1 = $("#ps1").val();
    var ps2 = $("#ps2").val();
    if (check == null || "".equals(check)) {
        UM.toast({
            text : '请输入手机验证码'
        });
    } else if (ps1 != ps2) {
        UM.toast({
            text : '两次输入密码必须一致'
        });
    } else if ($("#color-input-blue").val() != 2) {
        UM.toast({
            text : '请同意协议条款'
        });
    }
}