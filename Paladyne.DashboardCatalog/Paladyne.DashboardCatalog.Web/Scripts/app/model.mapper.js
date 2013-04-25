define('model.mapper',
['model'],
    function (model) {
        var
            dashboard = {
                getDtoId: function (dto) { return dto.id; },
                fromDto: function (dto, item) {
                    item = item || new model.Dashboard().id(dto.id);
                    item.title(dto.title)
                        .columnsCount(dto.columnsCount);
                    return item;
                }
            },
            widget = {
                getDtoId: function (dto) { return dto.id; },
                fromDto: function (dto, item) {
                    item = item || new model.Widget().id(dto.id);
                    item.title(dto.title)
                        .content(dto.content)
                        .dashboardId(dto.dashboardId)
                        .column(dto.column)
                        .order(dto.order)
                        .mode(dto.mode);
                    return item;
                }
            },
            column = {
                getDtoId: function (dto) { return dto.columnNumber; },
                fromDto: function (dto, item) {

                    item = item || {};
                    item.widgets = ko.observableArray();
                    for (var index in dto.widgets) {
                        var w = dto.widgets[index];
                        var observableWidget = new model.Widget().id(w.id);
                        observableWidget.title(w.title)
                            .content(w.content)
                            .dashboardId(w.dashboardId)
                            .column(w.column)
                            .order(w.order)
                            .mode(w.mode);
                        item.widgets.push(observableWidget);
                    }

                    return item;
                }
            };

        return {
            column: column,
            dashboard: dashboard,
            widget: widget
        };
    });