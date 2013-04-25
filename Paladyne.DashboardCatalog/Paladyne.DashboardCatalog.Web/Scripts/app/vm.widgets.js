define('vm.widgets',
    ['jquery', 'ko', 'datacontext', 'router', 'portletsmaker'],
    function ($, ko, datacontext, router, portletsmaker) {
        var
            columns = ko.observableArray(),
            currentDashboardId = ko.observable(),
            
            columnClass = ko.computed(function () {
                var span = 12 / columns().length;
                return 'span' + span + ' column';
            })

            makeColumns = function () {
                portletsmaker.setPortlets();
            },

            refresh = function () {
                getWidgets(currentDashboardId());
            },
            
            getWidgets = function (routeData) {
                currentDashboardId(routeData);
                columns.removeAll();
                $.when(
                    datacontext.widgets.getData({
                        forceRefresh: true,
                        results: columns,
                        param: routeData
                    }))
                    .always(makeColumns);
            },
            
            createWidget = function () {

                var widget = {
                    id: ko.observable(),
                    title: ko.observable(''),
                    content: ko.observable(''),
                    column: ko.observable(1),
                    order: ko.observable(1),
                    dashboardId: ko.observable(currentDashboardId),
                    mode: ko.observable(1),
                    newWidget: ko.observable(true)
                };
                
                if (columns().length > 0) {
                    var order = columns()[0].widgets().length + 1;
                    widget.order(order);


                    columns()[0].widgets.push(widget);
                    portletsmaker.setPortlets();
                }
            },
            
            editWidget = function (widget) {
                if (widget.title() == '' || widget.content() == '') {
                    return;
                }
                var mode = widget.mode();
                if (mode == 0) {
                    widget.mode(1);
                }
                if (mode == 1) {
                    widget.mode(0);
                }
                var func = widget.newWidget && widget.newWidget()
                    ? datacontext.widgets.addData
                    : datacontext.widgets.updateData;
                $.when(func(widget)).always();
            },
            
            toggleWidget = function (button) {
                var $button = $(button);
                $button.toggleClass("toggle_closed").next().next().slideToggle("slow");
                $button.parent("div").toggleClass("closed_box");
                $button.siblings(".box_head").toggleClass("round_top").toggleClass("round_all");
                var closedBoxes = [];
                var i = 0;
                $(".closed_box").each(function () {
                    closedBoxes[i] = $(this).attr("id");
                    i++;
                });
            },
            
            removeWidget = function (widget) {
                if (columns().length > 0) {

                    bootbox.confirm("Are you sure?", function(confirmed) {
                        if (confirmed) {

                            $.when(datacontext.widgets.deleteData(widget))
                                .done(function() {
                                    var column = widget.column() - 1;
                                    var observableColumn = columns()[column];
                                    observableColumn.widgets.remove(widget);
                                });
                        }
                    });
                }
            };

        return {
            columns: columns,
            columnClass: columnClass,
            makeColumns: makeColumns,
            getWidgets: getWidgets,
            createWidget: createWidget,
            editWidget: editWidget,
            refresh: refresh,
            removeWidget: removeWidget,
            toggleWidget: toggleWidget
        };
    });