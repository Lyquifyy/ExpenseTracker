# ExpenseTracker

A full-stack expense tracking application built with .NET 8 and React.

## Tech Stack

**Backend:**
- .NET 8 Web API
- Entity Framework Core
- PostgreSQL
- FluentValidation
- AutoMapper

**Frontend:**
- React 19 with TypeScript
- Vite
- TanStack React Query
- Axios
- Tailwind CSS

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for PostgreSQL)
- [EF Core Tools](https://learn.microsoft.com/en-us/ef/core/cli/dotnet) (optional, for migrations)

## Getting Started

### 1. Start the Database

```bash
# Start PostgreSQL using Docker Compose
docker-compose -f .devcontainer/docker-compose.yml up -d db
```

**Connection Details:**
- Host: `localhost`
- Port: `5432`
- Database: `expensetracker`
- Username: `postgres`
- Password: `postgres`

### 2. Run the Backend

```bash
# Navigate to the API project
cd src/api

# Restore dependencies and run
dotnet run
```

The API will be available at `http://localhost:5000` (or the port shown in console).

### 3. Run the Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## Common Commands

### Backend Commands

```bash
# Build the solution
dotnet build

# Run the API
cd src/api && dotnet run

# Run with hot reload
cd src/api && dotnet watch run

# Run tests (if any)
dotnet test
```

### Frontend Commands

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Database Commands

```bash
# Start database
docker-compose -f .devcontainer/docker-compose.yml up -d db

# Stop database
docker-compose -f .devcontainer/docker-compose.yml down

# Stop and remove data
docker-compose -f .devcontainer/docker-compose.yml down -v

# View database logs
docker-compose -f .devcontainer/docker-compose.yml logs -f db
```

### Entity Framework Migrations

```bash
# Install EF Core tools (first time only)
dotnet tool install --global dotnet-ef

# Create a new migration
cd src/api
dotnet ef migrations add MigrationName --project ../Infrastructure/FinanceTracker.Infrastructure.csproj

# Apply migrations
cd src/api
dotnet ef database update --project ../Infrastructure/FinanceTracker.Infrastructure.csproj

# Remove last migration (if not applied)
cd src/api
dotnet ef migrations remove --project ../Infrastructure/FinanceTracker.Infrastructure.csproj
```

## Project Structure

```
ExpenseTracker/
├── .devcontainer/           # Dev container configuration
│   └── docker-compose.yml   # PostgreSQL setup
├── frontend/                # React frontend
│   ├── src/
│   │   ├── api/            # API client functions
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── styles/         # CSS styles
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   └── package.json
├── src/
│   ├── Domain/             # Domain entities
│   ├── Application/        # Business logic, DTOs, services
│   ├── Infrastructure/     # Database context, repositories
│   └── api/                # Web API controllers
└── README.md
```

## API Endpoints

### Expenses
- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/{id}` - Get expense by ID
- `POST /api/expenses` - Create expense
- `PUT /api/expenses/{id}` - Update expense
- `DELETE /api/expenses/{id}` - Delete expense

### Income Settings
- `GET /api/incomesettings` - Get income settings
- `POST /api/incomesettings` - Create/update income settings

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard summary
- `GET /api/analytics/categories` - Get category totals
- `GET /api/analytics/monthly` - Get monthly trends

## Environment Configuration

The backend uses `appsettings.json` for configuration. For local development, you can create an `appsettings.Development.json` file that won't be committed to git.

Key configuration:
- `ConnectionStrings:DefaultConnection` - PostgreSQL connection string
- `Logging` - Log levels

## Troubleshooting

### Database connection issues
1. Ensure Docker is running
2. Verify PostgreSQL container is up: `docker ps`
3. Check connection string uses `localhost` (not `db`)

### Migrations not applied
Run migrations manually:
```bash
cd src/api
dotnet ef database update --project ../Infrastructure/FinanceTracker.Infrastructure.csproj
```

### Port conflicts
- Backend default: 5000
- Frontend default: 5173
- PostgreSQL: 5432

Modify `launchSettings.json` or environment variables if needed.
