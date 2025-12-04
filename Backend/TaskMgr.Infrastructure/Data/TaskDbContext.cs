using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Task = TaskMgr.Domain.Entities.Task;

namespace TaskMgr.Infrastructure.Data
{
    public class TaskDbContext : DbContext
    {
        public TaskDbContext(DbContextOptions<TaskDbContext> options)
            : base(options)
        {
        }

        public DbSet<Task> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Task>().HasKey(t => t.Id);

            modelBuilder.Entity<Task>()
                .Property(t => t.Title)
                .IsRequired()
                .HasMaxLength(100);

            base.OnModelCreating(modelBuilder);
        }
    }
}
