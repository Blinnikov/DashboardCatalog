using Paladyne.DashboardCatalog.Models;

namespace Paladyne.DashboardCatalog.DataAccess.Contracts
{
    /// <summary>
    /// Interface for the "Unit of work" pattern.
    /// </summary>
    public interface IUnitOfWork
    {
        /// <summary>
        /// Gets Dashboard repository.
        /// </summary>
        IRepository<Dashboard> Dashboards { get; }

        /// <summary>
        /// Gets Widget repository.
        /// </summary>
        IWidgetsRepository Widgets { get; }

        /// <summary>
        /// Saves pending changes;
        /// </summary>
        void Commit();
    }
}