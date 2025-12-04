using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskMgr.Domain.Entities
{
    public class Task
    {
        public int Id { get; private set; }
        public string Title { get; private set; }
        public string Description { get; private set; }
        public bool IsCompleted { get; private set; }
        public DateTime CreatedAt { get; private set; }

        private Task() { }

        public Task(string title, string description)
        {
            if (string.IsNullOrWhiteSpace(title))
                throw new ArgumentException("Title cannot be empty.", nameof(title));

            Id = 0; 
            Title = title;
            Description = description;
            IsCompleted = false;
            CreatedAt = DateTime.UtcNow;
        }

        public void MarkAsCompleted()
        {
            IsCompleted = true;
        }

        public void UpdateDetails(string title, string description)
        {
            if (string.IsNullOrWhiteSpace(title))
                throw new ArgumentException("Title cannot be empty.", nameof(title));

            Title = title;
            Description = description;
        }
    }
}
