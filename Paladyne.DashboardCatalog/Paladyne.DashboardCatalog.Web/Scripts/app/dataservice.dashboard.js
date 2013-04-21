define('dataservice.dashboard',
    ['amplify'],
    function (amplify) {
        var
            init = function () {

                amplify.request.define('dashboards', 'ajax', {
                    url: '/api/dashboards',
                    dataType: 'json',
                    type: 'GET'
                });

            },
            
            getDashboards = function(callbacks) {
                return amplify.request({
                    resourceId: 'dashboards',
                    success: callbacks.success,
                    error: callbacks.error
                });
            };

        init();

        return {
            getDashboards: getDashboards
        };
    });