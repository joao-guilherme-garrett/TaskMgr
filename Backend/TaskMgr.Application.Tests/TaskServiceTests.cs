using Moq;
using Xunit;
using TaskMgr.Application.Interfaces; 
using TaskMgr.Application.Services;   
using TaskMgr.Domain.Entities;
using System;
using System.Threading.Tasks;
using Task = TaskMgr.Domain.Entities.Task;


public class TaskServiceTests
{
    private readonly Mock<ITaskRepository> _mockRepository;
    private readonly TaskService _taskService;

    public TaskServiceTests()
    {
        _mockRepository = new Mock<ITaskRepository>();

        _taskService = new TaskService(_mockRepository.Object);
    }

    [Fact]
    public async System.Threading.Tasks.Task CreateTaskAsync_ValidInput_CallsRepositoryAddAndReturnsId()
    {
        string testTitle = "Implement TDD";
        string testDescription = "Write the unit test.";

        _mockRepository.Setup(repo =>
            repo.AddAsync(It.IsAny<Task>()))
            .Returns<Task>(task =>
            {
                task.GetType().GetProperty("Id")?.SetValue(task, 1);
                return System.Threading.Tasks.Task.FromResult(task);
            });


        int taskId = await _taskService.CreateTaskAsync(testTitle, testDescription);

        _mockRepository.Verify(repo =>
            repo.AddAsync(It.Is<Task>(t =>
                t.Title == testTitle)),
            Times.Once());

        Assert.Equal(1, taskId);
    }

    [Fact]
    public async System.Threading.Tasks.Task CreateTaskAsync_EmptyTitle_ThrowsArgumentException()
    {
        string invalidTitle = "";
        string validDescription = "A valid description.";

        await Assert.ThrowsAsync<ArgumentException>(() =>
            _taskService.CreateTaskAsync(invalidTitle, validDescription));

        _mockRepository.Verify(repo =>
            repo.AddAsync(It.IsAny<Task>()),
            Times.Never());
    }


    [Fact]
    public async System.Threading.Tasks.Task GetAllTasksAsync_ReturnsListOfTasks()
    {
        var expectedTasks = new List<TaskMgr.Domain.Entities.Task>
    {
        new TaskMgr.Domain.Entities.Task("Wash car", "Exterior and interior"),
        new TaskMgr.Domain.Entities.Task("Buy milk", "Check expiry date")
    };

        _mockRepository.Setup(repo =>
            repo.GetAllAsync())
            .ReturnsAsync(expectedTasks); 

        var actualTasks = await _taskService.GetAllTasksAsync();

        Xunit.Assert.NotNull(actualTasks);
        Xunit.Assert.Equal(expectedTasks.Count, actualTasks.Count());

        _mockRepository.Verify(repo =>
            repo.GetAllAsync(),
            Times.Once());
    }

    [Fact]
    public async System.Threading.Tasks.Task GetAllTasksAsync_NoTasksExist_ReturnsEmptyList()
    {
        var expectedTasks = new List<TaskMgr.Domain.Entities.Task>();

        _mockRepository.Setup(repo =>
            repo.GetAllAsync())
            .ReturnsAsync(expectedTasks);

        var actualTasks = await _taskService.GetAllTasksAsync();

        Xunit.Assert.NotNull(actualTasks);
        Xunit.Assert.Empty(actualTasks);

        _mockRepository.Verify(repo =>
            repo.GetAllAsync(),
            Times.Once());
    }
}