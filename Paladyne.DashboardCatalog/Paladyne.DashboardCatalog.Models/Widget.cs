using System.ComponentModel.DataAnnotations;

namespace Paladyne.DashboardCatalog.Models
{
    public class Widget
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        public int DashboardId { get; set; }

        public Dashboard Dashboard { get; set; }

        public int Column { get; set; }

        public int Order { get; set; }

        public Mode Mode { get; set; }
    }
}