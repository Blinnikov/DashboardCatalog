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
            return self;
        };

        Dashboard.Nullo = new Dashboard()
            .id(0)
            .title('Empty dashboard')
            .columnsCount(0);
        Dashboard.Nullo.isNullo = true;
        
        Dashboard.datacontext = function (dc) {
            if (dc) { _dc = dc; }
            return _dc;
        };

        return Dashboard;
    });
