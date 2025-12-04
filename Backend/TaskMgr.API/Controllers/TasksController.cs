using Microsoft.AspNetCore.Mvc;
using TaskMgr.Application.Interfaces;
using TaskMgr.API.DTOs;
using TaskMgr.Domain.Entities;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;

    public TasksController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateTask([FromBody] CreateTaskDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            int taskId = await _taskService.CreateTaskAsync(dto.Title, dto.Description);

            return CreatedAtAction(
                nameof(GetTasks),
                new { Id = taskId },
                new { Id = taskId, Message = "Task created successfully." });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { Error = ex.Message });
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks()
    {
        var tasks = await _taskService.GetAllTasksAsync();

        var taskDtos = tasks.Select(t => new TaskDto(
            t.Id,
            t.Title,
            t.Description,
            t.IsCompleted,
            t.CreatedAt
        )).ToList();

        return Ok(taskDtos);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(int id, [FromBody] UpdateTaskDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            await _taskService.UpdateTaskAsync(id, dto.Title, dto.Description, dto.IsCompleted);

            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { Error = ex.Message });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { Error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        try
        {
            await _taskService.DeleteTaskAsync(id);

            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { Error = ex.Message });
        }
    }
}
