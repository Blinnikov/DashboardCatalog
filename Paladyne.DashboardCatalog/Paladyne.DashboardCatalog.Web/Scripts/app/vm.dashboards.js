define('vm.dashboards',
    ['ko', 'datacontext', 'utils', 'messenger', 'vm.widgets', 'model', 'router', 'config'],
    function (ko, datacontext, utils, messenger, vmwidgets, model, router, config) {
        var
            isRefreshing = false,
            selectedDashboard = ko.observable(),
            dashboards = ko.observableArray(),
            newDashboard = new model.Dashboard(),
            editMode = ko.observable(false),
            
            // Knockout Computeds
            isDirty = ko.computed(function () {
                return newDashboard.dirtyFlag().isDirty() && newDashboard.columnsCount() > 0;
            }),

            activate = function (routeData, callback, mode) {
                editMode(!!mode);
                messenger.publish.viewModelActivated({ canleaveCallback: canLeave });
                setSelectedDashboard(routeData);
                getDashboards(callback);
                var id = selectedDashboard();
                if (id != -1) {
                    vmwidgets.getWidgets(id);
                }
            },
            
            activateEdit = function (routeData, callback) {
                newDashboard.title('');
                newDashboard.columnsCount('');
                newDashboard.dirtyFlag().reset();
                activate(routeData, callback, true);
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
                router.navigateTo(config.hashes.dashboards + '/new');
            },
            
            setSelectedDashboard = function (data) {
                var value = data.id || -1;
                selectedDashboard(value);
                // force mutation, so subscribers will be notified (for the nav synch)
                selectedDashboard.valueHasMutated();
            },
            
           saveCmd = ko.asyncCommand({
               execute: function(complete) {
                   $.when(datacontext.dashboards.addData(
                       newDashboard,
                       {
                           success: function(dashboard) {
                               router.navigateTo(config.hashes.dashboards + '/' + dashboard.id());
                           }
                       }))
                       .always(complete);
               },
               canExecute: function(isExecuting) {
                   return !isExecuting && isDirty();
               }
           });

        return {
            activate: activate,
            activateEdit: activateEdit,
            canLeave: canLeave,
            isDirty: isDirty,
            selectedDashboard: selectedDashboard,
            dashboards: dashboards,
            editMode: editMode,
            createDashboard: createDashboard,
            widgets: vmwidgets,
            newDashboard: newDashboard,
            forceRefreshCmd: forceRefreshCmd,
            saveCmd: saveCmd
        };
    });