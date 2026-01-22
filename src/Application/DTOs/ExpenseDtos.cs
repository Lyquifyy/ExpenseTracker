namespace FinanceTracker.Application.DTOs;
//These are DTOs (Data Transfer Objects) Used to decouple the API from domain entities.

public record ExpenseDto(
    Guid Id,
    string Description,
    decimal Amount,
    DateTime Date,
    string Category
);

public record CreateExpenseDto(
    string Description,
    decimal Amount,
    DateTime Date,
    string Category
);

public record UpdateExpenseDto(
    string Description,
    decimal Amount,
    DateTime Date,
    string Category
);
