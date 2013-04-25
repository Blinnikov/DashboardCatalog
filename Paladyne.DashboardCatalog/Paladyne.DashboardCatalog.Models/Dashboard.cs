using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Paladyne.DashboardCatalog.Models
{
    public class Dashboard
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public int ColumnsCount { get; set; }

        public ICollection<Widget> Widgets { get; private set; }
    }
}