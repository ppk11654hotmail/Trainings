(function (global) {
    var app = global.app = global.app || {};
    var viewModel;

    viewModel = kendo.observable({
        description: "",
        todoList: [],
        getTodoList: function () {
            var options = {
                url: app.config.todoItemsUrl,
                requestType: "GET",
                dataType: "JSON",
                callBack: function (result) {
                    if (result.success === true) {
                        viewModel.set("todoList", result.data);
                    }
                }
            };
            app.callService(options);
        },
        onChange: function (e) {
            e.data.IsDone = e.checked;
            var options = {
                url: app.config.todoItemsUrl + e.data.Id,
                requestType: "PUT",
                dataType: "JSON",
                data: {
                    Id: e.data.Id,
                    Description: e.data.Description,
                    IsDone: e.checked
                }
            };
            app.callService(options);
        },
        onDelete: function (e) {
            var data = e.data;
            navigator.notification.confirm(
            '確定刪除：' + e.data.Description,
            function (button) {
                if (button == 1) {
                    var options = {
                        url: app.config.todoItemsUrl + data.Id,
                        requestType: "DELETE",
                        dataType: "JSON",
                        callBack: function (result) {
                            if (result.success === true) {
                                viewModel.set("todoList", jQuery.grep(viewModel.todoList, function (item) {
                                    return (item.Id != result.data.Id);
                                }));
                            }
                        }
                    };
                    app.callService(options);
                }
            },
            '請確認',
            '是,否');
        },
        checkInput: function () {
            return (viewModel.get("description").length > 0);
        },
        onAdd: function () {
            var options = {
                url: app.config.todoItemsUrl,
                requestType: "POST",
                dataType: "JSON",
                data: {
                    Description: viewModel.get("description"),
                    IsDone: false
                },
                callBack: function (result) {
                    if (result.success === true) {
                        viewModel.get("todoList").push({
                            Id: result.data.Id,
                            Description: result.data.Description,
                            IsDoned: result.data.IsDoned
                        });
                        viewModel.set("description", "");
                    }
                }
            };
            app.callService(options);
        }
    });
    app.todo = {
        viewModel: viewModel,
        init: function (e) {
            viewModel.getTodoList();
            var scroller = e.view.scroller;
            scroller.setOptions({
                pullToRefresh: true,
                pull: function () {
                    viewModel.getTodoList();
                    setTimeout(function () { scroller.pullHandled(); }, 400);
                }
            });
        }
    };
})(window)