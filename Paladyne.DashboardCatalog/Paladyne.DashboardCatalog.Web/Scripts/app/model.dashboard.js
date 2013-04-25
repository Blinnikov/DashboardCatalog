define('model.dashboard',
    ['ko'],
    function (ko) {
        var
            _dc = null,
            
            Dashboard = function () {
            var self = this;
            self.id = ko.observable();
            self.title = ko.observable();
            self.columnsCount = ko.observable();
            self.isNullo = false;
            self.dirtyFlag = new ko.DirtyFlag([
                self.title,
                self.columnsCount]);
            return self;
        };

        Dashboard.Nullo = new Dashboard()
            .id(0)
            .title('')
            .columnsCount('');
        Dashboard.Nullo.isNullo = true;
        
        Dashboard.datacontext = function (dc) {
            if (dc) { _dc = dc; }
            return _dc;
        };
        
        // Prototype is available to all instances.
        // It has access to the properties of the instance of Session.
        Dashboard.prototype = function () {
            var dc = Dashboard.datacontext,
                widgets = function() {
                    return dc().widgets.getData({ param: { id: this.id() } });
                };

            return {
                isNullo: false,
                widgets: widgets
            };
        }();

        return Dashboard;
    });
