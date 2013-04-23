define('bootstrapper',
    ['jquery', 'config', 'route-config', 'presenter', 'dataprimer', 'binder', 'portletsmaker'],
    function ($, config, routeConfig, presenter, dataprimer, binder, portletsmaker) {
        var
            run = function () {
                presenter.toggleActivity(true);

                config.dataserviceInit();

                $.when(dataprimer.fetch())
                    .done(binder.bind)
                    .done(routeConfig.register)
                    .always(function() {
                        presenter.toggleActivity(false);
                    });
            };

        return {
            run: run
        };
    });