define('bootstrapper',
    ['jquery', 'config', 'route-config', 'presenter', 'binder'],
    function ($, config, routeConfig, presenter, binder) {
        var
            run = function () {
                presenter.toggleActivity(true);

                config.dataserviceInit();

                $.when(function() {})
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