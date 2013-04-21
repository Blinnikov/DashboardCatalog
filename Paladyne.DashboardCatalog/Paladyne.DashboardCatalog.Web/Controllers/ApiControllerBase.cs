using System.Web.Http;
using Paladyne.DashboardCatalog.DataAccess.Contracts;

namespace Paladyne.DashboardCatalog.Web.Controllers
{
    public abstract class ApiControllerBase : ApiController
    {
        protected IUnitOfWork UnitOfWork { get; set; }
    }
}
