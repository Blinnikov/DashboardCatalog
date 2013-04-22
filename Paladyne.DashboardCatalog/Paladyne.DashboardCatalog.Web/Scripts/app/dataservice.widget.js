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

            },

            getWidgets = function (callbacks, id) {
                return amplify.request({
                    resourceId: 'widgets',
                    data: { id: id },
                    success: callbacks.success,
                    error: callbacks.error
                });
            };

        init();

        return {
            getWidgets: getWidgets
        };
    });