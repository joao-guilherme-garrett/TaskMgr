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
    public interface ITaskService
    {
        // CREATE
        System.Threading.Tasks.Task<int> CreateTaskAsync(string title, string description);

        // READ
        System.Threading.Tasks.Task<IEnumerable<TaskMgr.Domain.Entities.Task>> GetAllTasksAsync();

        // UPDATE
        System.Threading.Tasks.Task UpdateTaskAsync(int id, string title, string description, bool isCompleted);

        // DELETE
        System.Threading.Tasks.Task DeleteTaskAsync(int id);
    }
}
