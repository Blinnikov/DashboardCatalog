using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Paladyne.DashboardCatalog.Models
{
    public class Dashboard : IEntity
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public int ColumnsCount { get; set; }

        public ICollection<Widget> Widgets { get; set; }
    }
}