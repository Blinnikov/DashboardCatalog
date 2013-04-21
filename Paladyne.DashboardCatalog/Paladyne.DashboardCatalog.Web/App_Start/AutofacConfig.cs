using System.Web.Http;
using System.Web.Mvc;
using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;

namespace Paladyne.DashboardCatalog.Web
{
    public static class AutofacConfig
    {
        public static void Register(HttpConfiguration config)
         {
             var builder = new ContainerBuilder();
             var executingAssembly = typeof(MvcApplication).Assembly;
             builder.RegisterControllers(executingAssembly);
             builder.RegisterApiControllers(executingAssembly);
             builder.RegisterAssemblyModules(executingAssembly);
             var container = builder.Build();
             DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
             var webApiResolver = new AutofacWebApiDependencyResolver(container);
             config.DependencyResolver = webApiResolver;
         }
    }
}