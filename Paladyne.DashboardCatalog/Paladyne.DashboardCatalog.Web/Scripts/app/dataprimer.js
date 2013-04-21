define('dataprimer',
    ['ko', 'datacontext', 'config'],
    function (ko, datacontext, config) {

        var logger = config.logger,
            
            fetch = function () {
                
                return $.Deferred(function (def) {

                    var data = {
                        dashboards: ko.observable(),
                    };

                    $.when(
                        //datacontext.dashboards.getData({ results: data.dashboards })
                    )

                    .pipe(function () {
                    })

                    .pipe(function() {
                        //logger.success('Fetched data for: '
                        //    + '<div>' + data.dashboards().length + ' dashboards </div>'
                        //);
                    })

                    .fail(function () { def.reject(); })

                    .done(function () { def.resolve(); });

                }).promise();
            };

        return {
            fetch: fetch
        };
    });