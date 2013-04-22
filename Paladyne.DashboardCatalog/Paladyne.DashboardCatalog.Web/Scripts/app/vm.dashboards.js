define('vm.dashboards',
    ['jquery', 'underscore', 'ko', 'datacontext', 'router', 'event.delegates', 'utils', 'messenger', 'config', 'store', 'portletsmaker'],
    function ($, _, ko, datacontext, router, eventDelegates, utils, messenger, config, store, portletsmaker) {
        var
            isRefreshing = false,
            selectedDashboard = ko.observable(),
            dashboards = ko.observableArray(),
            widgets = ko.observableArray(),
            columns = ko.observableArray(),

            activate = function (routeData, callback) {
                messenger.publish.viewModelActivated({ canleaveCallback: canLeave });
                setSelectedDashboard(routeData);
                getDashboards(callback);
                var id = selectedDashboard();
                if (id != -1) {
                    getWidgets(id);
                }
            },
            
            makeColumns = function () {
                columns.removeAll();
                var w = widgets();
                for (var i = 0; i < w.length; i++) {
                    var array = columns()[w[i].column() - 1];
                    if (array === undefined) {
                        columns.push(ko.observableArray());
                        array = columns()[w[i].column() - 1];
                    }
                    array.push(w[i]);
                }
                portletsmaker.init();
            },

            canLeave = function () {
                return true;
            },

            dataOptions = function (force) {
                return {
                    results: dashboards,
                    filter: null,
                    sortFunction: null,
                    forceRefresh: force
                };
            },

            forceRefreshCmd = ko.asyncCommand({
                execute: function (complete) {
                    $.when(datacontext.sessions.getSessionsAndAttendance(dataOptions(true)))
                        .always(complete);
                }
            }),

            getDashboards = function (callback) {
                if (!isRefreshing) {
                    isRefreshing = true;
                    $.when(datacontext.dashboards.getData(dataOptions(false)))
                        .always(utils.invokeFunctionIfExists(callback));
                    isRefreshing = false;
                }
            },
            
            getWidgets = function (routeData) {
                if (!widgets().length) {
                    $.when(
                        datacontext.widgets.getData({
                            results: widgets,
                            param: routeData
                        }))
                        .always(makeColumns);
                }
            },
            
            setSelectedDashboard = function (data) {
                var value = data.id || -1;
                selectedDashboard(value);
                // force mutation, so subscribers will be notified (for the nav synch)
                selectedDashboard.valueHasMutated();
            };

        return {
            activate: activate,
            canLeave: canLeave,
            selectedDashboard: selectedDashboard,
            dashboards: dashboards,
            columns: columns,
            forceRefreshCmd: forceRefreshCmd
        };
    });