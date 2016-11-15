using System;
using System.Linq;

namespace Todo.DataAccess
{
    internal static class DbInitializer
    {
        public static void Initialize(SqlDbContext dbContext)
        {
            if (dbContext == null) throw new ArgumentNullException(nameof(dbContext));

            dbContext.Database.EnsureCreated();

            if (dbContext.TodoItems.Any())
            {
                return;
            }

            dbContext.TodoItems.Add(new Model.TodoItem()
            {
                Text = "Complete the sample app"
            });

            dbContext.TodoItems.Add(new Model.TodoItem()
            {
                Text = "Get the dog for a walk",
                IsCompleted = true
            });

            dbContext.TodoItems.Add(new Model.TodoItem()
            {
                Text = "Change your pants",
                IsCompleted = true
            });

            dbContext.SaveChanges();
        }
    }
}