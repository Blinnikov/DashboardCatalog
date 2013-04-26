using Paladyne.DashboardCatalog.Models;

namespace Paladyne.DashboardCatalog.Web.Models
{
    public class WidgetViewModel : Widget
    {
        public bool UpdateOther { get; set; }

        public int OldColumn { get; set; }

        public int OldOrder { get; set; }

        public Widget ToDatabaseWidget()
        {
            return new Widget
            {
                Column = Column,
                Content = Content,
                DashboardId = DashboardId,
                Dashboard = Dashboard,
                Id = Id,
                Mode = Mode,
                Order = Order,
                Title = Title
            };
        }
    }
}