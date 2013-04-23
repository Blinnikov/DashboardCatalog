define('vm.dashboards',
    ['ko', 'datacontext', 'utils', 'messenger', 'vm.widgets'],
    function (ko, datacontext, utils, messenger, vmwidgets) {
        var
            isRefreshing = false,
            selectedDashboard = ko.observable(),
            dashboards = ko.observableArray(),

            activate = function (routeData, callback) {
                messenger.publish.viewModelActivated({ canleaveCallback: canLeave });
                setSelectedDashboard(routeData);
                getDashboards(callback);
                var id = selectedDashboard();
                if (id != -1) {
                    vmwidgets.getWidgets(id);
                }
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
            
            createDashboard = function () {
                dashboards.push({
                    id: ko.observable(100),
                    columnsCount: 3,
                    title: ko.observable('New widget ' + new Date())
                });
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
            createDashboard: createDashboard,
            widgets: vmwidgets,
            forceRefreshCmd: forceRefreshCmd
        };
    });