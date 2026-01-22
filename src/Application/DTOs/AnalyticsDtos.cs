namespace FinanceTracker.Application.DTOs;
//These are DTOs (Data Transfer Objects) Used to decouple the API from domain entities.
public record CategoryTotalDto(
    string Category,
    decimal Total
);

public record MonthlyTotalDto(
    string Month,
    decimal Total
);

public record DashboardSummaryDto(
    decimal MonthlyIncome,
    decimal CurrentMonthExpenses,
    decimal Balance,
    IEnumerable<CategoryTotalDto> CategoryTotals,
    IEnumerable<MonthlyTotalDto> MonthlyTrends
);
