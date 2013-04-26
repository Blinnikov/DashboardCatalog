define('event.delegates',
    ['jquery', 'ko', 'config', 'portletsmaker'],
    function ($, ko, config, portletsmaker) {
        var
            widgetColumnSelector = '.widgetcolumn',
            
            bindEventToList = function (rootSelector, selector, callback, eventName) {
                var eName = eventName || 'click';
                $(rootSelector).on(eName, selector, function (event, ui) {
                    
                    var widget = ko.dataFor(ui.item[0]),
                    $column = ui.item.parent(),
                    $widgetsRow = $column.parent(),
                    newOrder = ko.utils.arrayIndexOf($column.children(), ui.item[0]) + 1,
                    newColumn = ko.utils.arrayIndexOf($widgetsRow.children(), $column[0]) + 1;
                    if (this == $column[0]) {
                        console.log('Drop');

                        portletsmaker.destroyPortlets();

                        var oldColumn = widget.column();
                        var oldOrder = widget.order();
                        widget.oldColumn = oldColumn;
                        widget.oldOrder = oldOrder;
                        widget.column(newColumn);
                        widget.order(newOrder);
                        ui.item.remove();
                        callback(widget);
                        portletsmaker.setPortlets();
                    }
                });
            },

            widgetColumnUpdate = function (callback, eventName) {
                bindEventToList(config.viewIds.dashboards, widgetColumnSelector, callback, eventName);
            };

        return {
            widgetColumnUpdate: widgetColumnUpdate
        };
    });