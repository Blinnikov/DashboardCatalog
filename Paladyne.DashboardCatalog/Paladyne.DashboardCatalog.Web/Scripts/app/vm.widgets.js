define('vm.widgets',
    ['ko', 'datacontext', 'router', 'portletsmaker'],
    function (ko, datacontext, router, portletsmaker) {
        var
            widgets = ko.observableArray(),
            columns = ko.observableArray(),
            
            makeColumns = function () {
                columns.removeAll();
                var w = widgets();
                for (var i = 0; i < w.length; i++) {
                    var array = columns()[w[i].column() - 1];
                    if (array === undefined) {
                        columns.push(ko.observableArray());
                        array = columns()[w[i].column() - 1];
                    }
                    array.push(w[i]);
                }
                portletsmaker.init();
            },
            
            getWidgets = function (routeData) {
                $.when(
                    datacontext.widgets.getData({
                        forceRefresh: true,
                        results: widgets,
                        param: routeData
                    }))
                    .always(makeColumns);
            },
            
            createWidget = function () {

                var widget = {
                    id: ko.observable(200),
                    title: ko.observable('New widget'),
                    content: ko.observable('Have you ever been hated or discriminated against? Bla bla bla'),
                    column: ko.observable(1),
                    order: ko.observable(1),
                    mode: ko.observable(0),
                };
                
                if (columns().length > 0) {
                    columns()[0].push(widget);
                    portletsmaker.init();
                }
            },
            
            removeWidget = function (widget, domElement) {
                if (columns().length > 0) {

                    bootbox.confirm("Are you sure?", function(confirmed) {
                        if (confirmed) {
                            var column = widget.column() - 1;
                            var observableColumn = columns()[column];
                            observableColumn.remove(widget);
                        }
                    });
                }
            };

        return {
            columns: columns,
            makeColumns: makeColumns,
            getWidgets: getWidgets,
            createWidget: createWidget,
            removeWidget: removeWidget
        };
    });