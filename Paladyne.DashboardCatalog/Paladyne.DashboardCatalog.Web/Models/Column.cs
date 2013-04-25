using System.Collections.Generic;
using Paladyne.DashboardCatalog.Models;

namespace Paladyne.DashboardCatalog.Web.Models
{
    public class Column
    {
        public int ColumnNumber { get; set; }

        public IEnumerable<Widget> Widgets { get; set; }
    }
}