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
                getDtoId: function (dto) { return dto.columnNumber; },
                fromDto: function (dto, column) {

                    column = column || {};
                    column.widgets = ko.observableArray();
                    for (var index in dto.widgets) {
                        var w = dto.widgets[index];
                        var observableWidget = new model.Widget().id(w.id);
                        observableWidget.title(dto.title)
                            .content(dto.content)
                            .column(dto.column)
                            .order(dto.order)
                            .mode(dto.mode);
                        column.widgets.push(w);
                    }

                    return column;
                }
            };

        return {
            dashboard: dashboard,
            widget: widget
        };
    });