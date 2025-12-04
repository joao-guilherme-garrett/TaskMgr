using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using TaskMgr.Application.Interfaces;
using TaskMgr.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TaskMgr.Application.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _repository;

        public TaskService(ITaskRepository repository)
        {
            _repository = repository;
        }

        // CREATE
        public async System.Threading.Tasks.Task<int> CreateTaskAsync(string title, string description)
        {
            if (string.IsNullOrWhiteSpace(title))
            {
                throw new ArgumentException("Task title cannot be empty.", nameof(title));
            }

            var newTask = new TaskMgr.Domain.Entities.Task(title, description);

            var persistedTask = await _repository.AddAsync(newTask);

            return persistedTask.Id;
        }

        // READ ALL
        public async System.Threading.Tasks.Task<IEnumerable<TaskMgr.Domain.Entities.Task>> GetAllTasksAsync()
        {
            return await _repository.GetAllAsync();
        }

        // UPDATE
        public async System.Threading.Tasks.Task UpdateTaskAsync(int id, string title, string description, bool isCompleted)
        {
            var taskToUpdate = await _repository.GetByIdAsync(id);

            if (taskToUpdate == null)
            {
                throw new KeyNotFoundException($"Task with ID {id} not found.");
            }

            taskToUpdate.UpdateDetails(title, description);

            if (isCompleted)
            {
                taskToUpdate.MarkAsCompleted();
            }

            await _repository.UpdateAsync(taskToUpdate);
        }

        // DELETE
        public async System.Threading.Tasks.Task DeleteTaskAsync(int id)
        {
            var taskToDelete = await _repository.GetByIdAsync(id);

            if (taskToDelete == null)
            {
                throw new KeyNotFoundException($"Task with ID {id} not found.");
            }

            await _repository.DeleteAsync(taskToDelete);
        }
    }
}
