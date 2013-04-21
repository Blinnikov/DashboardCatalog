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
            };

        return {
            dashboard: dashboard
        };
    });