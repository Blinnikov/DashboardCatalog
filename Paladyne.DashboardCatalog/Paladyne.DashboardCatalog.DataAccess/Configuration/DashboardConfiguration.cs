using System.Data.Entity.ModelConfiguration;
using Paladyne.DashboardCatalog.Models;

namespace Paladyne.DashboardCatalog.DataAccess.Configuration
{
    public class DashboardConfiguration : EntityTypeConfiguration<Dashboard>
    {
        public DashboardConfiguration()
        {
            HasMany(d => d.Widgets)
                .WithRequired(w => w.Dashboard)
                .HasForeignKey(w => w.DashboardId)
                .WillCascadeOnDelete(true);
        }
    }
}