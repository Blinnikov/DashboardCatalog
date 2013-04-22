define('model',
    [
        'model.dashboard',
        'model.widget'
    ],
    function (dashboard, widget) {
        var model = {
            Dashboard: dashboard,
            Widget: widget
        };

        model.setDataContext = function(dc) {
            // Model's that have navigation properties 
            // need a reference to the datacontext.
            model.Dashboard.datacontext(dc);
        };

        return model;
    });