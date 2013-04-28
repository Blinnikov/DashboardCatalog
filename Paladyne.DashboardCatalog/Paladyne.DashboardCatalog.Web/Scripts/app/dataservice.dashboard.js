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
                
                amplify.request.define('dashboardAdd', 'ajax', {
                    url: '/api/dashboards',
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8'
                });
                
                amplify.request.define('dashboardDelete', 'ajax', {
                    url: '/api/dashboards/?id={id}',
                    dataType: 'json',
                    type: 'DELETE',
                    contentType: 'application/json; charset=utf-8'
                });

            },
            
            getDashboards = function(callbacks) {
                return amplify.request({
                    resourceId: 'dashboards',
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            
            addDashboard = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'dashboardAdd',
                    data: data,
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            
            deleteDashboard = function (callbacks, id) {
                return amplify.request({
                    resourceId: 'dashboardDelete',
                    data: { id: id },
                    success: callbacks.success,
                    error: callbacks.error
                });
            };

        init();

        return {
            getDashboards: getDashboards,
            addDashboard: addDashboard,
            deleteDashboard: deleteDashboard
        };
    });