using System.Data.Entity;
using System.Linq;
using Paladyne.DashboardCatalog.DataAccess.Contracts;
using Paladyne.DashboardCatalog.Models;

namespace Paladyne.DashboardCatalog.DataAccess.Repositories
{
    public class WidgetsRepository : RepositoryBase<Widget>, IWidgetsRepository
    {
        public WidgetsRepository(DbContext context)
            : base(context)
        {
        }

        /// <summary>
        /// Gets widgets for dashboard.
        /// </summary>
        /// <param name="dashboardId"> Dashboard id. </param>
        /// <returns> The <see cref="IQueryable{Widget}"/>. </returns>
        public IQueryable<Widget> GetByDashboardId(int dashboardId)
        {
            return DbSet.Where(w => w.DashboardId == dashboardId);
        }
    }
}