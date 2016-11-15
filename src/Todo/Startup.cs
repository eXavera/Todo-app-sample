using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Todo.DataAccess;

namespace Todo
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _env;

        public Startup(IHostingEnvironment env)
        {
            if (env == null) throw new ArgumentNullException(nameof(env));

            _env = env;

            _configuration = new ConfigurationBuilder()
               .SetBasePath(env.ContentRootPath)
               .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
               .Build();
        }

        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory, SqlDbContext dbContext)
        {
            if (app == null) throw new ArgumentNullException(nameof(app));
            if (loggerFactory == null) throw new ArgumentNullException(nameof(loggerFactory));
            if (dbContext == null) throw new ArgumentNullException(nameof(dbContext));

            loggerFactory.AddConsole(_configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (_env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();
            app.UseFileServer();

            DbInitializer.Initialize(dbContext);
        }

        public void ConfigureServices(IServiceCollection services)
        {
            if (services == null) throw new ArgumentNullException(nameof(services));

            services.AddMvc();
            services.AddEntityFrameworkSqlServer();

            services.AddDbContext<SqlDbContext>(opt => opt.UseSqlServer(_configuration.GetConnectionString("Default")));
            services.AddTransient<IDatabase, SqlDbContext>();
        }
    }
}