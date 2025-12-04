namespace TaskMgr.API.DTOs
{
    public record TaskDto(
        int Id,
        string Title,
        string Description,
        bool IsCompleted,
        DateTime CreatedAt);
}