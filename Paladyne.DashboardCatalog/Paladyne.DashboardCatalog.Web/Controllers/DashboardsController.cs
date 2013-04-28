using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using Paladyne.DashboardCatalog.DataAccess.Contracts;
using Paladyne.DashboardCatalog.Models;

namespace Paladyne.DashboardCatalog.Web.Controllers
{
    public class DashboardsController : ApiControllerBase
    {
        public DashboardsController(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
        }

        // GET api/dashboards
        public IEnumerable<Dashboard> Get()
        {
            var dashboards = UnitOfWork.Dashboards.GetAll().ToList();
            return dashboards;
        }

        // GET api/dashboards/5
        public Dashboard Get(int id)
        {
            var item = UnitOfWork.Dashboards.GetById(id);
            return item;
        }

        // POST api/dashboards
        public HttpResponseMessage Post(Dashboard dashboard)
        {
            UnitOfWork.Dashboards.Add(dashboard);
            UnitOfWork.Commit();

            var response = Request.CreateResponse(HttpStatusCode.Created, dashboard);

            // Compose location header that tells how to get this dashboard
            // e.g. ~/api/dashboard/5
            response.Headers.Location =
                new Uri(Url.Link(WebApiConfig.DefaultRouteName, new { id = dashboard.Id }));

            return response;
        }

        // PUT api/dashboards/5
        public HttpResponseMessage Put(Dashboard dashboard)
        {
            UnitOfWork.Dashboards.Update(dashboard);
            UnitOfWork.Commit();
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

        // DELETE api/dashboards/5
        public HttpResponseMessage Delete(int id)
        {
            var dashboard = UnitOfWork.Dashboards.GetById(id);

            if (dashboard != null)
            {
                var widgetIds = dashboard.Widgets.Select(w => w.Id);
                dashboard.Widgets = new List<Widget>();
                foreach (var widgetId in widgetIds)
                {
                    UnitOfWork.Widgets.Delete(widgetId);
                }
                UnitOfWork.Dashboards.Delete(dashboard);
                UnitOfWork.Commit();
            }
            
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
