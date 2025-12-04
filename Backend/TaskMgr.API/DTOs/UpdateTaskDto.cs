using System.ComponentModel.DataAnnotations;

namespace TaskMgr.API.DTOs
{
    public class UpdateTaskDto
    {
        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        public string Description { get; set; }

        public bool IsCompleted { get; set; } = false;
    }
}
