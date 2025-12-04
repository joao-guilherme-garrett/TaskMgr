using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using TaskMgr.Application.Interfaces;
using TaskMgr.Domain.Entities;
using TaskMgr.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TaskMgr.Infrastructure.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly TaskDbContext _context;

        public TaskRepository(TaskDbContext context)
        {
            _context = context;
        }

        // READ (All)
        public async System.Threading.Tasks.Task<IEnumerable<TaskMgr.Domain.Entities.Task>> GetAllAsync()
        {
            return await _context.Tasks
                                 .AsNoTracking()
                                 .ToListAsync();
        }

        // READ (By Id)
        public async System.Threading.Tasks.Task<TaskMgr.Domain.Entities.Task> GetByIdAsync(int id)
        {
            return await _context.Tasks.FindAsync(id);
        }

        // CREATE
        public async System.Threading.Tasks.Task<TaskMgr.Domain.Entities.Task> AddAsync(TaskMgr.Domain.Entities.Task task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        // UPDATE
        public async System.Threading.Tasks.Task UpdateAsync(TaskMgr.Domain.Entities.Task task)
        {
            _context.Tasks.Update(task);
            await _context.SaveChangesAsync();
        }

        // DELETE
        public async System.Threading.Tasks.Task DeleteAsync(TaskMgr.Domain.Entities.Task task)
        {
            _context.Tasks.Remove(task);

            await _context.SaveChangesAsync();
        }
    }
}
