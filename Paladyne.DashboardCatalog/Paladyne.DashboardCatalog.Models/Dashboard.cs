using System.Collections.Generic;

namespace Paladyne.DashboardCatalog.Models
{
    public class Dashboard
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int ColumnsCount { get; set; }

        public ICollection<Widget> Widgets { get; private set; }
    }
}