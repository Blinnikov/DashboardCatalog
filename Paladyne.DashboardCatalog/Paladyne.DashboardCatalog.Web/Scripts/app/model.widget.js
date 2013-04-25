define('model.widget',
    ['ko'],
    function (ko) {
        var
            Widget = function () {
                var self = this;
                self.id = ko.observable();
                self.title = ko.observable();
                self.content = ko.observable();
                self.column = ko.observable();
                self.order = ko.observable();
                self.mode = ko.observable();
                self.isNullo = false;
                self.dirtyFlag = new ko.DirtyFlag([
                    self.title,
                    self.content]);
                return self;
            };

        Widget.Nullo = new Widget()
            .id(0)
            .title('Empty widget')
            .content('')
            .column(0)
            .order(0)
            .mode(0);
        Widget.Nullo.isNullo = true;

        return Widget;
    });
