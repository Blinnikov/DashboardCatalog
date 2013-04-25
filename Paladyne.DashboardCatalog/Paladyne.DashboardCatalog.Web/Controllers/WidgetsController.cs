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

            if (!dashboard.Widgets.Any())
            {
                return Enumerable
                    .Range(1, dashboard.ColumnsCount)
                    .Select(i => new Column
                                     {
                                         ColumnNumber = i,
                                         Widgets = Enumerable.Empty<Widget>()
                                     });
            }

            return dashboard.Widgets
                .GroupBy(w => w.Column)
                .Select(g => new Column
                                 {
                                     ColumnNumber = g.Key,
                                     Widgets = g.OrderBy(w => w.Order)
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
        public HttpResponseMessage Put(Widget widget)
        {
            UnitOfWork.Widgets.Update(widget);
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
