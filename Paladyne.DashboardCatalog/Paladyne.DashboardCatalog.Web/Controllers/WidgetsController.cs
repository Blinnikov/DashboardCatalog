using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Paladyne.DashboardCatalog.DataAccess.Contracts;
using Paladyne.DashboardCatalog.Models;

namespace Paladyne.DashboardCatalog.Web.Controllers
{
    public class WidgetsController : ApiControllerBase
    {
        public WidgetsController(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
        }

        // GET api/widgets/5
        public IEnumerable<Widget> GetByDashboardId(int id)
        {
            return UnitOfWork.Widgets.GetByDashboardId(id)
                .OrderBy(w => w.Column)
                .ThenBy(w => w.Order)
                .ToList();
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
