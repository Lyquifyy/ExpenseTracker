namespace FinanceTracker.Application.DTOs;
//These are DTOs (Data Transfer Objects) Used to decouple the API from domain entities.

public record IncomeSettingsDto(
    Guid Id,
    decimal BiweeklyAmount,
    DateTime LastPayDate,
    decimal MonthlyIncome,
    decimal YearlyIncome
);

public record CreateIncomeSettingsDto(
    decimal BiweeklyAmount,
    DateTime LastPayDate
);

public record UpdateIncomeSettingsDto(
    decimal BiweeklyAmount,
    DateTime LastPayDate
);
