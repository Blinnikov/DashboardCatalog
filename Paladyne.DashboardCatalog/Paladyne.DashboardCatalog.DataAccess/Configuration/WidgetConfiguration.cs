using System.Data.Entity.ModelConfiguration;
using Paladyne.DashboardCatalog.Models;

namespace Paladyne.DashboardCatalog.DataAccess.Configuration
{
    public class WidgetConfiguration : EntityTypeConfiguration<Widget>
    {
        public WidgetConfiguration()
        {
            HasRequired(w => w.Dashboard)
                .WithMany(d => d.Widgets)
                .HasForeignKey(w => w.DashboardId)
                .WillCascadeOnDelete(false);
        }
    }
}