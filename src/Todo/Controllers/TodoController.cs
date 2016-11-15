using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Todo.DataAccess;
using Todo.Model;
using Todo.ViewModel;

namespace Todo.Controllers
{
    [Route("api/[controller]")]
    public sealed class TodoController : Controller
    {
        private readonly IDatabase _database;

        public TodoController(IDatabase database)
        {
            if (database == null) throw new ArgumentNullException(nameof(database));

            _database = database;
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            TodoItem item = await _database.Query<TodoItem>().FirstOrDefaultAsync(i => i.Id == id);
            if (item == null) return;

            _database.Remove(item);
            await _database.SaveChangesAsync();
        }

        [HttpGet]
        public async Task<IReadOnlyCollection<TodoItem>> GetAll()
        {
            return await _database.Query<TodoItem>().AsNoTracking().ToListAsync();
        }

        [HttpPost]
        public async Task<TodoItem> Post([FromBody]NewTodoItem viewModel)
        {
            var newItem = new TodoItem() { Text = viewModel.Text };

            _database.Add(newItem);
            await _database.SaveChangesAsync();

            return newItem;
        }

        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody]UpdateTodoItem viewModel)
        {
            TodoItem itemToUpdate = await _database.Query<TodoItem>().FirstOrDefaultAsync(i => i.Id == id);
            if (itemToUpdate == null) return;

            itemToUpdate.IsCompleted = viewModel.IsCompleted;

            _database.Update(itemToUpdate);
            await _database.SaveChangesAsync();
        }
    }
}