using System.Linq;
using Paladyne.DashboardCatalog.Models;

namespace Paladyne.DashboardCatalog.DataAccess.Contracts
{
    /// <summary>
    /// Widgets repository.
    /// </summary>
    public interface IWidgetsRepository : IRepository<Widget>
    {
        /// <summary>
        /// Gets widgets for dashboard.
        /// </summary>
        /// <param name="dashboardId"> Dashboard id. </param>
        /// <returns> The <see cref="IQueryable"/>. </returns>
        IQueryable<Widget> GetByDashboardId(int dashboardId);
    }
}