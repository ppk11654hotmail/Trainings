(function (global) {
    var app = global.app = global.app || {};

    var serviceUrl = "http://jackytodoPro.azurewebsites.net/api/";

    //var serviceUrl = "http://localhost:51286/api/";

    app.config = {
        todoItemsUrl: serviceUrl + "TodoItems/"
    };
})(window)