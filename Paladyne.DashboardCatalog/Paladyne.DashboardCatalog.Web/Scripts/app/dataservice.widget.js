define('dataservice.widget',
    ['amplify'],
    function (amplify) {
        var
            init = function () {

                amplify.request.define('widgets', 'ajax', {
                    url: '/api/widgets/{id}',
                    dataType: 'json',
                    type: 'GET'
                });
                
                amplify.request.define('widgetUpdate', 'ajax', {
                    url: '/api/widgets',
                    dataType: 'json',
                    type: 'PUT',
                    contentType: 'application/json; charset=utf-8'
                });
                
                amplify.request.define('widgetAdd', 'ajax', {
                    url: '/api/widgets',
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8'
                });
                
                amplify.request.define('widgetDelete', 'ajax', {
                    url: '/api/widgets/?id={id}',
                    dataType: 'json',
                    type: 'DELETE',
                    contentType: 'application/json; charset=utf-8'
                });

            },

            getWidgets = function (callbacks, id) {
                return amplify.request({
                    resourceId: 'widgets',
                    data: { id: id },
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            
            addWidget = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'widgetAdd',
                    data: data,
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            
            deleteWidget = function (callbacks, id) {
                return amplify.request({
                    resourceId: 'widgetDelete',
                    data: { id: id },
                    success: callbacks.success,
                    error: callbacks.error
                });
            },

            updateWidget = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'widgetUpdate',
                    data: data,
                    success: callbacks.success,
                    error: callbacks.error
                });
            };

        init();

        return {
            addWidget: addWidget,
            deleteWidget: deleteWidget,
            getWidgets: getWidgets,
            updateWidget: updateWidget
        };
    });