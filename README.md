📝 Task Manager Application

This is a full-stack Task Management application built using .NET Web API for the backend and React + TypeScript for the frontend.

The project emphasizes modern software development principles: Clean Architecture, SOLID Principles, Test-Driven Development (TDD), and a focus on accessibility (a11y) and performance.

🏗️ Architecture and Design Principles

The application is split into two distinct services communicating via a RESTful API:

#1. Backend: .NET 7.0 Web API (Clean Architecture)#

The backend employs an Onion/Clean Architecture structure to ensure high testability, maintainability, and clear separation of concerns (SOLID Principles). 

The project is structured into four layers:

Domain (TaskMgr.Domain)

  Responsibility: Core business entities (Task).

  Key Principles: Encapsulation, Single Responsibility Principle (SRP).

Application (TaskMgr.Application)

  Responsibility: Business logic, use cases, service interfaces (ITaskService).

  Key Principles: TDD focus, Dependency Inversion Principle (DIP).

Infrastructure (TaskMgr.Infrastructure)

  Responsibility: Data access using Entity Framework (EF) Core and SQLite.

  Focus: Implementation details, isolating business logic from technology.

API (TaskMgr.API)

  Responsibility: Handles HTTP communication (RESTful Controllers), CORS, and Dependency Injection setup.

  Focus: Presentation layer.

#2. Frontend: React, TypeScript, and Tailwind CSS#

The frontend prioritizes user experience, performance, and accessibility (a11y).

  Language: TypeScript for compile-time type safety.

  Styling: Tailwind CSS for modern, responsive, utility-first design, including Dark/Light Mode support.

State Management: Utilizes React Context API and Performance Hooks (useCallback, useMemo) for efficient state handling (error/loading states, optimistic updates).

  Accessibility (A11y): Components use proper semantic HTML, ARIA attributes (aria-label, aria-live), and adhere to strong color contrast standards.

🛠️ Getting Started

Prerequisites

You need the following software installed:

.NET 7.0 SDK or later

Node.js (npm/npx)

Visual Studio 2022 (Recommended for C# development)

#1. Backend Setup (.NET API)#

Open the solution file (TaskMgr.sln) in Visual Studio.

Run EF Core Migrations to create the SQLite database:

Open the Package Manager Console (PMC).

Set the Default project to TaskMgr.API.

Execute the commands:

Add-Migration InitialCreate -Project TaskMgr.Infrastructure -StartupProject TaskMgr.API
Update-Database -Project TaskMgr.Infrastructure -StartupProject TaskMgr.API


Run the API:

Set TaskMgr.API as the Startup Project.

Press F5 (Start Debugging).

The API will run on ports http://localhost:5211 and https://localhost:7284. Keep this console window running.

#2. Frontend Setup (React/TypeScript)#

Navigate to the frontend directory:

    cd Frontend/taskmgr-frontend


Install dependencies:

    npm install


Run the Frontend:

    npm run dev


The application will open in your browser (usually http://localhost:5173).

⚙️ Key API Endpoints (Full CRUD)

The API exposes a standard RESTful interface for the Task resource at the base path /api/tasks:

POST /api/tasks: Creates a new task.

GET /api/tasks: Retrieves all tasks.

PUT /api/tasks/{id}: Updates an existing task (used for toggling completion status).

DELETE /api/tasks/{id}: Deletes a task by ID.

🧪 Testing

Unit Tests (Backend)

The TaskMgr.Application.Tests project contains unit tests verifying the core business logic of the TaskService, adhering to TDD principles by using Moq to isolate the service layer from the database implementation.

  Front End Testing (Manual)

  Confirm the following features are working after launching the application:

  Data Fetching: Tasks load from the API (or display the "No tasks yet!" message).

  CRUD Operations: Tasks can be added (POST), completed/uncompleted (PUT), and deleted (DELETE).

  States: Loading indicators and Error messages appear correctly during API requests.

  UX/A11y: The application is responsive, and the Dark/Light Mode toggle functions correctly.
