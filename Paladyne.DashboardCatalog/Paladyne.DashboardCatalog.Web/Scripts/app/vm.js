define('vm',
    [
        'vm.dashboards',
        'vm.widgets'
    ],
    function(dashboards, widgets) {
        return {
            dashboards: dashboards,
            widgets: widgets
        };
    });