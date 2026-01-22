using FinanceTracker.Application.DTOs;
using FinanceTracker.Application.Interfaces;

namespace FinanceTracker.Application.Services;

public class AnalyticsService
{
    private readonly IExpenseRepository _expenseRepository;
    private readonly IIncomeSettingsRepository _incomeSettingsRepository;

    public AnalyticsService(
        IExpenseRepository expenseRepository,
        IIncomeSettingsRepository incomeSettingsRepository)
    {
        _expenseRepository = expenseRepository;
        _incomeSettingsRepository = incomeSettingsRepository;
    }

    public async Task<IEnumerable<CategoryTotalDto>> GetCategoryTotalsAsync(int? year = null, int? month = null)
    {
        var expenses = await _expenseRepository.GetAllAsync();

        var filtered = expenses.AsEnumerable();

        if (year.HasValue)
            filtered = filtered.Where(e => e.Date.Year == year.Value);

        if (month.HasValue)
            filtered = filtered.Where(e => e.Date.Month == month.Value);

        return filtered
            .GroupBy(e => e.Category)
            .Select(g => new CategoryTotalDto(g.Key, g.Sum(e => e.Amount)))
            .OrderByDescending(c => c.Total);
    }

    public async Task<IEnumerable<MonthlyTotalDto>> GetMonthlyTotalsAsync(int months = 6)
    {
        var expenses = await _expenseRepository.GetAllAsync();
        var startDate = DateTime.UtcNow.AddMonths(-months + 1);
        startDate = new DateTime(startDate.Year, startDate.Month, 1);

        var result = new List<MonthlyTotalDto>();

        for (int i = 0; i < months; i++)
        {
            var monthStart = startDate.AddMonths(i);
            var monthName = monthStart.ToString("MMM yyyy");
            var total = expenses
                .Where(e => e.Date.Year == monthStart.Year && e.Date.Month == monthStart.Month)
                .Sum(e => e.Amount);

            result.Add(new MonthlyTotalDto(monthName, total));
        }

        return result;
    }

    public async Task<DashboardSummaryDto> GetDashboardSummaryAsync()
    {
        var incomeSettings = await _incomeSettingsRepository.GetAsync();
        var monthlyIncome = incomeSettings?.BiweeklyAmount * 26 / 12 ?? 0;

        var now = DateTime.UtcNow;
        var categoryTotals = await GetCategoryTotalsAsync(now.Year, now.Month);
        var monthlyTrends = await GetMonthlyTotalsAsync(6);

        var currentMonthExpenses = categoryTotals.Sum(c => c.Total);
        var balance = monthlyIncome - currentMonthExpenses;

        return new DashboardSummaryDto(
            monthlyIncome,
            currentMonthExpenses,
            balance,
            categoryTotals,
            monthlyTrends
        );
    }
}
