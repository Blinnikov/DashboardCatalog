define('route-config',
    ['config', 'router', 'vm'],
    function (config, router, vm) {
        var
            logger = config.logger,
            
            register = function() {

                var routeData = [
                    
                    // Dashboards routes
                    {
                        view: config.viewIds.dashboards,
                        routes: [
                            {
                                isDefault: true,
                                route: config.hashes.dashboards,
                                title: 'Dashboards',
                                callback: vm.dashboards.activate,
                                group: '.route-top'
                            }, {
                                route: config.hashes.dashboards + '/:id',
                                title: 'Dashboards',
                                callback: vm.dashboards.activate,
                                group: '.route-left'
                            }
                        ]
                    },

                    // Invalid routes
                    {
                        view: '',
                        route: /.*/,
                        title: '',
                        callback: function() {
                            logger.error(config.toasts.invalidRoute);
                        }
                    }
                ];

                for (var i = 0; i < routeData.length; i++) {
                    router.register(routeData[i]);
                }

                // Crank up the router
                router.run();
            };
            

        return {
            register: register
        };
    });