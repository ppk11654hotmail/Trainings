(function (global) {
    var app = global.app = global.app || {};

    app.application = new kendo.mobile.Application($(document.body));

    $(document).ajaxStart(function () {
        app.application.showLoading();
    });

    $(document).ajaxStop(function () {
        app.application.hideLoading();
    });

    app.callService = function (options) {
        $.ajax({
            url: options.url,
            type: options.requestType,
            data: options.data,
            dataType: options.dataType,
            // 如果有設定 HTTP 標頭，就將其加入 
            beforeSend: function (xhr) {
                if (typeof options.httpHeader !== 'undefined' && typeof options.headerValue !== 'undefined') {
                    xhr.setRequestHeader(options.httpHeader, options.headerValue);
                }
            },
            // 成功時的回呼函式
            success: function (resultData) {
                if (typeof options.callBack !== 'undefined') {
                    var result = {
                        data: resultData,
                        success: true
                    };
                    options.callBack(result);
                }
            },
            // 發生錯誤時的回呼函式
            error: function (xhr) {
                var errorMessage;
                switch (xhr.status) {
                    case 400:
                        errorMessage = '錯誤的請求！';
                        break;
                    case 401:
                        errorMessage = '授權失敗，帳號和密碼錯誤！';
                        break;
                    case 404:
                        errorMessage = '找不到您請求的文件，請洽系統管理員！';
                        break;
                    case 500:
                        errorMessage = '內部伺服器錯誤，請洽系統管理員！';
                        break;
                    default:
                        errorMessage = '網路連線不通，請檢查網路連線！';
                        break;
                }
                navigator.notification.alert(
                         errorMessage,
                         function () { },
                         '錯誤',
                         '確定'
                     );

                if (typeof options.callBack !== 'undefined') {
                    var result = { success: false };
                    options.callBack(result);
                }
            }
        });
    }
})(window);