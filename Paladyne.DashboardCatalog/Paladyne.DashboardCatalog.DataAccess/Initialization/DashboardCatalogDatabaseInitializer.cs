using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Paladyne.DashboardCatalog.Models;

namespace Paladyne.DashboardCatalog.DataAccess.Initialization
{
    public class DashboardCatalogDatabaseInitializer
        : DropCreateDatabaseIfModelChanges<DashboardCatalogDbContext>
    {
        protected override void Seed(DashboardCatalogDbContext context)
        {
            var dashboards = new List<Dashboard>
            {
                new Dashboard
                    {
                        Title = "First dashboard",
                        ColumnsCount = 3
                    },
                new Dashboard
                    {
                        Title = "Second dashboard",
                        ColumnsCount = 2
                    }
            };
            dashboards.ForEach(d => context.Dashboards.Add(d));
            var widgets = CreateWidgets(context, dashboards);
            context.SaveChanges();
        }

        private List<Widget> CreateWidgets(DashboardCatalogDbContext context, List<Dashboard> dashboards)
        {
            var widgets = new List<Widget>
                              {
                                  new Widget
                                      {
                                          Dashboard = dashboards.ElementAt(0),
                                          Title = "Widget 1-1",
                                          Column = 1,
                                          Order = 1,
                                          Content =
                                              "Content Content Content Content Content Content Content Content Content Content",
                                          Mode = Mode.View
                                      },
                                  new Widget
                                      {
                                          Dashboard = dashboards.ElementAt(0),
                                          Title = "Widget 1-2",
                                          Column = 1,
                                          Order = 2,
                                          Content =
                                              "Content Content Content Content Content Content Content Content Content Content",
                                          Mode = Mode.View
                                      },
                                  new Widget
                                      {
                                          Dashboard = dashboards.ElementAt(0),
                                          Title = "Widget 2-1",
                                          Column = 2,
                                          Order = 1,
                                          Content =
                                              "Content Content Content Content Content Content Content Content Content Content",
                                          Mode = Mode.View
                                      },
                                  new Widget
                                      {
                                          Dashboard = dashboards.ElementAt(0),
                                          Title = "Widget 2-2",
                                          Column = 2,
                                          Order = 2,
                                          Content =
                                              "Content Content Content Content Content Content Content Content Content Content",
                                          Mode = Mode.View
                                      },
                                  new Widget
                                      {
                                          Dashboard = dashboards.ElementAt(0),
                                          Title = "Widget 3-1",
                                          Column = 3,
                                          Order = 1,
                                          Content =
                                              "Content Content Content Content Content Content Content Content Content Content",
                                          Mode = Mode.View
                                      },
                                  new Widget
                                      {
                                          Dashboard = dashboards.ElementAt(0),
                                          Title = "Widget 3-2",
                                          Column = 3,
                                          Order = 2,
                                          Content =
                                              "Content Content Content Content Content Content Content Content Content Content",
                                          Mode = Mode.View
                                      },
                                  new Widget
                                      {
                                          Dashboard = dashboards.ElementAt(1),
                                          Title = "Widget 1-1",
                                          Column = 1,
                                          Order = 1,
                                          Content =
                                              "Content Content Content Content Content Content Content Content Content Content",
                                          Mode = Mode.View
                                      },
                                  new Widget
                                      {
                                          Dashboard = dashboards.ElementAt(1),
                                          Title = "Widget 1-2",
                                          Column = 1,
                                          Order = 2,
                                          Content =
                                              "Content Content Content Content Content Content Content Content Content Content",
                                          Mode = Mode.View
                                      },
                                  new Widget
                                      {
                                          Dashboard = dashboards.ElementAt(1),
                                          Title = "Widget 2-1",
                                          Column = 2,
                                          Order = 1,
                                          Content =
                                              "Content Content Content Content Content Content Content Content Content Content",
                                          Mode = Mode.Edit
                                      }
                              };
            widgets.ForEach(w => context.Widgets.Add(w));
            return widgets;
        }
    }
}