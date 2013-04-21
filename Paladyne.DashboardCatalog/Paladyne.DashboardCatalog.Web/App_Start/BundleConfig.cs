using System.Web.Optimization;

namespace Paladyne.DashboardCatalog.Web
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/lib/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                "~/Scripts/lib/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                "~/Scripts/lib/jquery.unobtrusive*",
                "~/Scripts/lib/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/lib/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/jsextlibs").Include(
                "~/Scripts/lib/TrafficCop.js",
                "~/Scripts/lib/infuser.js",
                "~/Scripts/lib/bootbox.js",
                "~/Scripts/lib/knockout-{version}.js",
                "~/Scripts/lib/knockout.activity.js",
                "~/Scripts/lib/knockout.command.js",
                "~/Scripts/lib/knockout.dirtyFlag.js",
                "~/Scripts/lib/knockout.validation.js",
                "~/Scripts/lib/koExternalTemplateEngine.js",
                "~/Scripts/lib/underscore.js",
                "~/Scripts/lib/sammy.*",
                "~/Scripts/lib/amplify.js",
                "~/Scripts/lib/toastr.js"));

            bundles.Add(new ScriptBundle("~/bundles/jsapplibs")
                .IncludeDirectory("~/Scripts/app/", "*.js", searchSubdirectories: false));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/bootstrap.css",
                "~/Content/bootstrap-fix.css",
                "~/Content/bootstrap-responsive.css",
                "~/Content/toastr.css",
                "~/Content/main.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                "~/Content/themes/base/jquery.ui.core.css",
                "~/Content/themes/base/jquery.ui.resizable.css",
                "~/Content/themes/base/jquery.ui.selectable.css",
                "~/Content/themes/base/jquery.ui.accordion.css",
                "~/Content/themes/base/jquery.ui.autocomplete.css",
                "~/Content/themes/base/jquery.ui.button.css",
                "~/Content/themes/base/jquery.ui.dialog.css",
                "~/Content/themes/base/jquery.ui.slider.css",
                "~/Content/themes/base/jquery.ui.tabs.css",
                "~/Content/themes/base/jquery.ui.datepicker.css",
                "~/Content/themes/base/jquery.ui.progressbar.css",
                "~/Content/themes/base/jquery.ui.theme.css"));
        }
    }
}