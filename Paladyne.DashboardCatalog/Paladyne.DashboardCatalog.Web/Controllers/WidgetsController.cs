using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
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
                    .Range(1, 3)
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
        public void Post([FromBody]string value)
        {
        }

        // PUT api/widgets/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/widgets/5
        public void Delete(int id)
        {
        }
    }
}
