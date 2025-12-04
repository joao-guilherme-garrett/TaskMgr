using TaskMgr.Application.Interfaces;
using TaskMgr.Application.Services;
using TaskMgr.Infrastructure.Data;
using TaskMgr.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TaskDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<ITaskService, TaskService>();

builder.Services.AddControllers();


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                         
                          policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

var app = builder.Build();


app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.MapControllers();


app.Run();
