

var randomString = function (length) {
    length = length || 32;
    var chars = 'abcdefhijkmnprstwxyz012345678';
    var maxPos = chars.length;
    var pwd = '';
    for (var i = 0; i < length; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
};


var formatDate = function (format, date) {
    var o = {
        "M+": date.getMonth() + 1, //月份   
        "d+": date.getDate(), //日   
        "h+": date.getHours(), //小时   
        "m+": date.getMinutes(), //分   
        "s+": date.getSeconds(), //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return format;
};
/*
 * 接口配置
 */
var CONFIG = {
    baseUrl: "//api.hbox.jiankangyouyi.com/ego-gw"
};


/*
 * rem
 */
(function () {
    function resizeBaseFontSize() {
        var rootHtml = document.documentElement,
            deviceWidth = rootHtml.clientWidth;
        if (deviceWidth > 800) {
            deviceWidth = 800;
        }
        rootHtml.style.fontSize = deviceWidth / 18.75 + "px";
    }
    resizeBaseFontSize();
    window.addEventListener("resize", resizeBaseFontSize, false);
    window.addEventListener("orientationchange", resizeBaseFontSize, false);
})();




/**
 * 判断是否为空
 * @param str
 * @return
 */
function isEmpty(str) { if (typeof (str) == "undefined" || str == null || str.length == 0) { return true; } return false; };
/*
 * loading
 */
//禁止弹出层滑动
$(".loading").on("touchmove", function (e) {
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        window.event.returnValue = false;
    }
});
//显示loading
function showLoading() {
    $(".loading").show();
}
//隐藏loading
function hideLoading() {
    $(".loading").fadeOut();
}

/*
 * 禁止弹出层滑动
 */
//禁止弹出层滑动
$(".toast").on("touchmove", function (e) {
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        window.event.returnValue = false;
    }
});


/*
 * tip
 */
//禁止弹出层滑动
$(".tip").on("touchmove", function (e) {
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        window.event.returnValue = false;
    }
});
//显示并自动隐藏tip
function showTip(text) {
    $("body").css("display","block");
    $(".tip p").html(text);
    $(".tip").show();
    $(".tip .tipBox").removeClass("fadeOutUp").addClass("fadeInDown").show();
    setTimeout(function () {
        $(".tip .tipBox").removeClass("fadeInDown").addClass("fadeOutUp");
        setTimeout(function () {
            $(".tip").fadeOut();
        }, 800);
    }, 2000);
}

/*
 * 获取url参数
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}


/**
 * ajax数据请求封装
 * @param {*} url  接口地址
 * @param {*} type  请求类型
 * @param {*} signStr json串需要加签
 * @param {*} callback 成功之后回调函数
 */
function ajaxRequest(url, type, reqData, callback) {
    var foodMatchtype = getUrlParam("foodMatchtype") || parseInt(JSON.parse(window.localStorage.getItem("foodMatchtype")));
    var token = window.sessionStorage.getItem("token");
    if (!token) {
        if (config.privateKey != "") {
            //使用签名
            var nonceStr = randomString(32); //随机字符串
            var timestamp = formatDate("yyyy-MM-dd hh:mm:ss", new Date()); //时间戳
            var signStr = 'appId=' + config.appId + '&nonceStr=' + nonceStr + '&timestamp=' + timestamp + '&version=' + config.version;
            var privateKey = `-----BEGIN PRIVATE KEY-----` + config.privateKey + `-----END PRIVATE KEY-----`;
            var sign = doSign(signStr, privateKey, 'sha256');
            var params = {
                "appId": config.appId,
                "version": config.version,
                "timestamp": timestamp,
                "nonceStr": nonceStr,
                "sign": sign
            }

            var params;
            // Object.assign(params,reqData)
            params.reqData = reqData;

            //  var obj = Object.assign(o1, o2, o3);
            $.ajax({
                // ?foodMatchtype=${foodMatchtype}
                url: `${CONFIG.baseUrl}${url}?foodMatchtype=${foodMatchtype}`,
                type: type,
                data: JSON.stringify(params),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    var resData = data.resData;
                    if(JSON.parse(resData).retCode !="SUCCESS") {
                        showTip(JSON.parse(resData).retInfo || JSON.parse(resData).tooltip);
                    }
                    console.log("response：" + resData);
                    callback(JSON.parse(resData));
                },
                error: function (err) {
                    console.log(err);
                }
            });
        } else if(config.signUrl != "") {
            //通过接口
            $.get(config.signUrl, function (data) {
                if (data) {
                    var params = data;
                    // Object.assign(params,reqData)
                    params.reqData = reqData;
                    // console.log("request：" + JSON.stringify(params));
                    $.ajax({
                        // url: CONFIG.baseUrl + url,
                        // ?foodMatchtype=${foodMatchtype}
                        url: `${CONFIG.baseUrl}${url}?foodMatchtype=${foodMatchtype}`,
                        type: type,
                        data: JSON.stringify(params),
                        dataType: "json",
                        contentType: "application/json;charset=utf-8",
                        success: function (data) {
                            var resData = data.resData;
                            if(JSON.parse(resData).retCode !="SUCCESS") {
                                showTip(JSON.parse(resData).retInfo || JSON.parse(resData).tooltip);
                            }
                            // console.log("response：" + resData);
                            callback(JSON.parse(resData));
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                } else {
                    showTip("请检查签名");
                }
            });
        }else {
            showTip("请检查签名或配置token");
        }
    } else {
        // token
        var nonceStr = randomString(32); //随机字符串
        var timestamp = formatDate("yyyy-MM-dd hh:mm:ss", new Date()); //时间戳
        var params = {
            "appId": config.appId,
            "version": config.version,
            "timestamp": timestamp,
            "nonceStr": nonceStr,
        }
        var params;
        params.reqData = reqData;
        $.ajax({
            headers: {
                "token": token
            },
            url: `${CONFIG.baseUrl}${url}?foodMatchtype=${foodMatchtype}`,
            type: type,
            data: JSON.stringify(params),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                var resData = data.resData;
                if(JSON.parse(resData).retCode !="SUCCESS") {
                    showTip(JSON.parse(resData).retInfo || JSON.parse(resData).tooltip);
                }
                console.log("response：" + resData);
                callback(JSON.parse(resData));
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
};


/*
 * 获取localStorage
 */
function getStore(name) {
    if (!name) return;
    var r = window.localStorage.getItem(name);
    if (r != null) return r; return null;
}

/*
 * 设置localStorage
 */
function setStore(name, content) {
    if (!name) return;
    if (typeof content != "string") {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/*
 * 删除localStorage
 */
function delStore(name) {
    if (!name) return;
    window.localStorage.removeItem(name);
}


/*
 * 获取字符串长度
 */
function getStrLength(str) {
    var cArr = str.match(/[^\x00-\xff]/ig);
    return str.length + (cArr == null ? 0 : cArr.length);
}

/*
 * 生日转换年龄
 */
function birthdayToAge(birthday) {
    var birthdayDate = new Date(birthday.replace(/-/g, "/")),
        nowDate = new Date(),
        newDate = new Date(nowDate.getFullYear(), birthdayDate.getMonth(), birthdayDate.getDate());
    var age = new Date().getFullYear() - birthdayDate.getFullYear() - 1;
    if (nowDate > newDate) {
        age += 1;
    }
    return age;
}
/*
 * 滚动条到顶部
 */
function toScrollTop() {
    var distance = document.documentElement.scrollTop || document.body.scrollTop; //获得当前高度
    var step = distance / 50; //每步的距离
    (function jump() {
        if (distance > 0) {
            distance -= step;
            window.scrollTo(0, distance);
            setTimeout(jump, 10);
        }
    })();
}


/**
 * 签名加密
 * @param {*} signData 加密数据
 * @param {*} privateKey 私钥
 * @param {*} hashAlg 默认256
 */
function doSign(signData, privateKey, hashAlg) {
    var rsa = new RSAKey(); // 新建RSA对象
    rsa = KEYUTIL.getKey(privateKey); // 设置私钥
    var hashAlg = hashAlg || 'sha256'; // 设置sha1
    var hSig;
    if (rsa.signString) { //rsa在不同版本有不同方法。。
        hSig = rsa.signString(signData, hashAlg); // 加签
        hSig = hex2b64(hSig); // hex 转 b64
    } else if (rsa.sign) {
        hSig = rsa.sign(signData, hashAlg); // 加签
        hSig = hex2b64(hSig); // hex 转 b64
    }
    return hSig;
}



/**
 * 动态加载css样式表
 * @param {*} cssarr  css数组
 * @param {*} length  长度
 */
function dynmicLoadCss(cssarr, length) {
    if (!cssarr || cssarr.length === 0) {
        throw new Error("加载css样式表链接不能为空");
    }

    if (length > 1) {
        //多个css
        for (var i = 0; i < length; i++) {
            console.log(cssarr[i])
            appendCss(cssarr[i]);
        }
    } else {
        appendCss(cssarr);
    }

    /**
     * 渲染css
     * @param {*} cssName css名称
     */
    function appendCss(cssName) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = '../css/common/' + cssName + '.css';
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    }
}

/**
 * 动态加载css样式表，根据不同主题
 */
if (config.theme === '0') {

    //主题1  默认绿色
    dynmicLoadCss(['color_init_style'], "1"); //加载多个css
} else if (config.theme === '1') {
    //#43CEA9
    //主题1  默认绿色
    dynmicLoadCss(['color_green_style'], "1"); //加载多个css
} else if (config.theme === '2') {
    //#4E95E9
    dynmicLoadCss(['color_blue_style'], "1");
} else if (config.theme === '3') {
    //#E9674E
    dynmicLoadCss(['color_red_style'], "1");
} else if (config.theme === '4') {
    //#3D4459
    dynmicLoadCss(['color_black_style'], "1");
}


/**
 * 节流，解决无限点击问题
 * @param {*} fn 
 * @param {*} time 
 */
function _debounce(fn,time){
    let delay = time || 1000;
    let timer;
    return function () {
        let args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, args);
        }, delay);
    }
}
