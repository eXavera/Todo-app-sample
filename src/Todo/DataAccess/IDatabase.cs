using System;
using System.Linq;
using System.Threading.Tasks;

namespace Todo.DataAccess
{
    public interface IDatabase : IDisposable
    {
        void Add(object entity);

        void Remove(object entity);

        Task SaveChangesAsync();

        IQueryable<T> Query<T>() where T : class;

        void Update(object entity);
    }
}