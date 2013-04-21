using System.Data.Entity;
using System.Linq;
using Paladyne.DashboardCatalog.Models;

namespace Paladyne.DashboardCatalog.DataAccess.Repositories
{
    public class DashboardsRepository : RepositoryBase<Dashboard>
    {
        public DashboardsRepository(DbContext context) : base(context)
        {
        }

        public override Dashboard GetById(int id)
        {
            return DbSet.Include(d => d.Widgets).Single(d => d.Id == id);
        }
    }
}