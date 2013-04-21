using System;
using Paladyne.DashboardCatalog.DataAccess.Contracts;
using Paladyne.DashboardCatalog.Models;

namespace Paladyne.DashboardCatalog.DataAccess
{
    /// <summary>
    /// Represents the "Unit of Work" pattern.
    /// </summary>
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        public UnitOfWork(IRepositoryProvider repositoryProvider)
        {
            CreateDbContext();
            repositoryProvider.DbContext = DbContext;
            RepositoryProvider = repositoryProvider;
        }

        private DashboardCatalogDbContext DbContext { get; set; }

        protected IRepositoryProvider RepositoryProvider { get; set; }

        /// <summary>
        /// Gets Dashboard repository.
        /// </summary>
        public IRepository<Dashboard> Dashboards
        {
            get { return GetRepository<IRepository<Dashboard>>(); }
        }

        /// <summary>
        /// Gets Widget repository.
        /// </summary>
        public IWidgetsRepository Widgets
        {
            get { return GetRepository<IWidgetsRepository>(); }
        }

        /// <summary>
        /// Saves pending changes;
        /// </summary>
        public void Commit()
        {
            DbContext.SaveChanges();
        }

        protected void CreateDbContext()
        {
            DbContext = new DashboardCatalogDbContext();
            DbContext.Configuration.ProxyCreationEnabled = false;
            DbContext.Configuration.LazyLoadingEnabled = false;
            DbContext.Configuration.ValidateOnSaveEnabled = false;
        }

        private IRepository<T> GetStandardRepository<T>() where T : class
        {
            return RepositoryProvider.GetRepositoryForEntityType<T>();
        }

        private T GetRepository<T>() where T : class
        {
            return RepositoryProvider.GetRepository<T>();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposing)
            {
                return;
            }

            if (DbContext != null)
            {
                DbContext.Dispose();
            }
        }
    }
}