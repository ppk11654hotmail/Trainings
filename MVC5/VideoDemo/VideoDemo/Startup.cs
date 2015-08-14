using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(VideoDemo.Startup))]
namespace VideoDemo
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
