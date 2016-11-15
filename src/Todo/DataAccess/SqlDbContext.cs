using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Todo.Model;

namespace Todo.DataAccess
{
    public sealed class SqlDbContext : DbContext, IDatabase
    {
        public SqlDbContext(DbContextOptions<SqlDbContext> options) : base(options)
        {
        }

        public DbSet<TodoItem> TodoItems { get; set; }

        void IDatabase.Add(object entity)
        {
            Add(entity);
        }

        void IDatabase.Remove(object entity)
        {
            Remove(entity);
        }

        Task IDatabase.SaveChangesAsync()
        {
            return SaveChangesAsync();
        }

        IQueryable<T> IDatabase.Query<T>()
        {
            return Set<T>();
        }

        void IDatabase.Update(object entity)
        {
            Update(entity);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var todoTable = modelBuilder.Entity<TodoItem>().ToTable("Todo");
            todoTable.HasKey(p => p.Id);

            todoTable.Property(p => p.Text)
                .HasMaxLength(100)
                .IsRequired();

            todoTable.Property(p => p.IsCompleted)
                .IsRequired();

            base.OnModelCreating(modelBuilder);
        }
    }
}