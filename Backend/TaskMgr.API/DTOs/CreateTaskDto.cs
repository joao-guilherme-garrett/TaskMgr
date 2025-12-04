using System.ComponentModel.DataAnnotations;

namespace TaskMgr.API.DTOs
{
    public class CreateTaskDto
    {
        [Required]
        [StringLength(100, ErrorMessage = "Title cannot be longer than 100 characters.")]
        public string Title { get; set; }

        public string Description { get; set; }
    }
}
