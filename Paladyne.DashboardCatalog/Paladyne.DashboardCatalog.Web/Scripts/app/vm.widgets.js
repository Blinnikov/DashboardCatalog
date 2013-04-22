define('vm.widgets',
    ['jquery', 'underscore', 'ko', 'datacontext', 'router', 'sort', 'event.delegates', 'utils', 'messenger', 'config', 'store'],
    function ($, _, ko, datacontext, router, sort, eventDelegates, utils, messenger, config, store) {
        var
            isRefreshing = false,
            selectedDashboard = ko.observable(),
            dashboards = ko.observableArray(),

            activate = function (routeData, callback) {
                messenger.publish.viewModelActivated({ canleaveCallback: canLeave });
                setSelectedDashboard(routeData);
                getDashboards(callback);
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
            forceRefreshCmd: forceRefreshCmd
        };
    });