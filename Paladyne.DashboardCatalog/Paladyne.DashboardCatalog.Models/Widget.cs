namespace Paladyne.DashboardCatalog.Models
{
    public class Widget
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public int DashboardId { get; set; }

        public Dashboard Dashboard { get; set; }

        public int Column { get; set; }

        public int Order { get; set; }

        public Mode Mode { get; set; }
    }
}