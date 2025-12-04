using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using TaskMgr.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TaskMgr.Application.Interfaces
{
    public interface ITaskRepository
    {
        // READ
        System.Threading.Tasks.Task<IEnumerable<TaskMgr.Domain.Entities.Task>> GetAllAsync();
        System.Threading.Tasks.Task<TaskMgr.Domain.Entities.Task> GetByIdAsync(int id);

        // CREATE
        System.Threading.Tasks.Task<TaskMgr.Domain.Entities.Task> AddAsync(TaskMgr.Domain.Entities.Task task);

        // UPDATE
        System.Threading.Tasks.Task UpdateAsync(TaskMgr.Domain.Entities.Task task);

        // DELETE
        System.Threading.Tasks.Task DeleteAsync(TaskMgr.Domain.Entities.Task task);
    }
}