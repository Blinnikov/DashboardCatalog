define('model',
    [
        'model.dashboard'
    ],
    function (dashboard) {
        var
            model = {
                Dashboard: dashboard,
                setDataContext: function (dc) {
                    // Model's that have navigation properties 
                    // need a reference to the datacontext.
                    model.Dashboard.datacontext(dc);
                }
            };

        return model;
    });