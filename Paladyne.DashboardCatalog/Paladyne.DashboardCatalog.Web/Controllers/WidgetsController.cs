using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using Paladyne.DashboardCatalog.DataAccess.Contracts;
using Paladyne.DashboardCatalog.Models;
using Paladyne.DashboardCatalog.Web.Models;

namespace Paladyne.DashboardCatalog.Web.Controllers
{
    public class WidgetsController : ApiControllerBase
    {
        public WidgetsController(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
        }

        // GET api/widgets/5
        public IEnumerable<Column> GetByDashboardId(int id)
        {
            var dashboard = UnitOfWork.Dashboards.GetById(id);
            if (dashboard == null)
            {
                return null;
            }

            return Enumerable.Range(1, dashboard.ColumnsCount)
                .Select(i => new Column
                {
                    ColumnNumber = i,
                    Widgets = dashboard.Widgets
                        .Where(w => w.Column == i)
                        .OrderBy(w => w.Order)
                });
        }

        // POST api/widgets
        public HttpResponseMessage Post(Widget widget)
        {
            UnitOfWork.Widgets.Add(widget);
            UnitOfWork.Commit();

            return Request.CreateResponse(HttpStatusCode.Created, widget);
        }

        // PUT api/widgets
        public HttpResponseMessage Put(WidgetViewModel widgetViewModel)
        {
            // If widget was moved to the new column 
            // we should update indeces of other widgets in both columns
            if (widgetViewModel.UpdateOther)
            {
                var newColumnWidgets = UnitOfWork.Widgets
                    .GetByDashboardId(widgetViewModel.DashboardId)
                    .Where(w => w.Column == widgetViewModel.Column && w.Order >= widgetViewModel.Order);

                foreach (var widget in newColumnWidgets)
                {
                    widget.Order++;
                    UnitOfWork.Widgets.Update(widget);
                }

                var oldColumnWidgets = UnitOfWork.Widgets
                    .GetByDashboardId(widgetViewModel.DashboardId)
                    .Where(w => w.Column == widgetViewModel.OldColumn && w.Order >= widgetViewModel.OldOrder);

                foreach (var widget in oldColumnWidgets)
                {
                    widget.Order--;
                    UnitOfWork.Widgets.Update(widget);
                }
            }
            UnitOfWork.Widgets.Update(widgetViewModel.ToDatabaseWidget());
            UnitOfWork.Commit();
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

        // DELETE api/widgets/5
        public HttpResponseMessage Delete(int id)
        {
            UnitOfWork.Widgets.Delete(id);
            UnitOfWork.Commit();
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
