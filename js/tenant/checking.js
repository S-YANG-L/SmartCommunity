summerready = function() {
    $isWeb = true;
    $("input[type='button']").click(btnCheck);
    /**
     * [btnCheck 按钮倒计时常用于获取手机短信验证码]
     */
    function btnCheck() {
        var phone = $("#phone").val();
        var myreg = /^1[3456789]\d{9}$/;
        if (!myreg.test(phone)) {
            summer.toast({
                "msg" : "请输入正确手机号"
            })
        } else {
            $(this).addClass("on");
            var time = 60;
            $(this).attr("disabled", true);
            var timer = setInterval(function() {
                if (time == 0) {
                    clearInterval(timer);
                    $("#input").attr("disabled", false);
                    $("#input").val("获取验证码");
                    $("#input").removeClass("on");
                } else {
                    $('#input').val(time + "秒");
                    time--;
                }
            }, 1000);
            checkPnone();
        }
    }

}
function checkPnone() {
    var phone = $("#phone").val();
    //MyInfo/sendCheck    参数：phone
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('url') + "/MyInfo/sendCheck",
        "param" : {
            token : summer.getStorage("tokenEntity").token,
            contactNumber : phone
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var code = response.data.code;
        if (code == "200") {
            summer.toast({
                "msg" : "发送成功"
            })
        }
    }, function(response) {//失败回调
        summer.toast({
            "msg" : "请联系管理员解决"
        })
    });
};
function $pageReady() {
    alert("webview ready");
}

function goBack() {
    summer.closeWin({});
}

function submit() {
    var phone = $("#phone").val();
    var check = $("#check").val();
    var ps1 = $("#ps1").val();
    var ps2 = $("#ps2").val();
    if (check == null || check == "") {
        summer.toast({
            "msg" : '请输入手机验证码'
        });
    } else if (ps1 == "" || ps2 == "") {
        summer.toast({
            "msg" : "请输入密码"
        })
    } else if (ps1 == ps2) {
        //修改密码
        summer.ajax({
            "header" : {
                Authorization : "OAuth2: token"
            },
            "type" : "POST",
            "url" : summer.getAppStorage('url') + "/MyInfo/retrievePassword",
            "param" : {
                token : summer.getStorage("tokenEntity").token,
                contactNumber : phone,
                check : check,
                password : ps2
            },
        }, function(response) {//成功回调
            response.data = JSON.parse(response.data);
            var code = response.data.code;
            if (code == "200") {
                summer.toast({
                    "msg" : '修改密码成功'
                });
                summer.closeWin({});
            } else if (code == "201") {
                summer.toast({
                    "msg" : '验证码错误'
                });
            } else if (code == "203") {
                summer.toast({
                    "msg" : '验证码失效'
                });
            }
        }, function(response) {//失败回调
            summer.toast({
                "msg" : "请联系管理员解决"
            })
        });
    } else {
        summer.toast({
            "msg" : '两次输入密码必须一致'
        });
    }
}