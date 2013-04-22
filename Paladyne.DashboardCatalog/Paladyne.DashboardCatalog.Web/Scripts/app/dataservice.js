define('dataservice',
    [
        'dataservice.dashboard',
        'dataservice.widget'
    ],
    function (dashboard, widget) {
        return {
            dashboard: dashboard,
            widget: widget
        };
    });