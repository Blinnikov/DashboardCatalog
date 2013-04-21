using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using Paladyne.DashboardCatalog.DataAccess.Configuration;
using Paladyne.DashboardCatalog.DataAccess.Initialization;
using Paladyne.DashboardCatalog.Models;

namespace Paladyne.DashboardCatalog.DataAccess
{
    public class DashboardCatalogDbContext : DbContext
    {
        ////static DashboardCatalogDbContext()
        ////{
        ////    // Database.SetInitializer(new DashboardCatalogDatabaseInitializer());
        ////}

        public DashboardCatalogDbContext()
            : base(nameOrConnectionString: "DashboardCatalog")
        {
        }

        public DbSet<Dashboard> Dashboards { get; set; }

        public DbSet<Widget> Widgets { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Configurations.Add(new WidgetConfiguration());
        }
    }
}