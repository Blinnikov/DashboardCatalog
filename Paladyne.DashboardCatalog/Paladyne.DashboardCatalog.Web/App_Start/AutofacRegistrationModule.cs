using Autofac;
using Paladyne.DashboardCatalog.DataAccess;
using Paladyne.DashboardCatalog.DataAccess.Contracts;

namespace Paladyne.DashboardCatalog.Web
{
    public class AutofacRegistrationModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder
                .RegisterType<RepositoryFactories>()
                .As<RepositoryFactories>()
                .SingleInstance();

            builder
                .RegisterType<RepositoryProvider>()
                .As<IRepositoryProvider>()
                .InstancePerLifetimeScope();

            builder
                .RegisterType<UnitOfWork>()
                .As<IUnitOfWork>()
                .InstancePerLifetimeScope();
        }
    }
}