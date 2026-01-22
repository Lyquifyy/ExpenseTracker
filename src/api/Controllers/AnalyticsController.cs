using FinanceTracker.Application.DTOs;
using FinanceTracker.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinanceTracker.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnalyticsController : ControllerBase
{
    private readonly AnalyticsService _analyticsService;

    public AnalyticsController(AnalyticsService analyticsService)
    {
        _analyticsService = analyticsService;
    }

    [HttpGet("dashboard")]
    public async Task<ActionResult<DashboardSummaryDto>> GetDashboardSummary()
    {
        var summary = await _analyticsService.GetDashboardSummaryAsync();
        return Ok(summary);
    }

    [HttpGet("categories")]
    public async Task<ActionResult<IEnumerable<CategoryTotalDto>>> GetCategoryTotals(
        [FromQuery] int? year,
        [FromQuery] int? month)
    {
        var totals = await _analyticsService.GetCategoryTotalsAsync(year, month);
        return Ok(totals);
    }

    [HttpGet("monthly")]
    public async Task<ActionResult<IEnumerable<MonthlyTotalDto>>> GetMonthlyTotals(
        [FromQuery] int months = 6)
    {
        var totals = await _analyticsService.GetMonthlyTotalsAsync(months);
        return Ok(totals);
    }
}
