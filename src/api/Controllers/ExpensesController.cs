using FinanceTracker.Application.Services;
using FinanceTracker.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FinanceTracker.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExpensesController : ControllerBase
{
    private readonly ExpenseService _expenseService;

    public ExpensesController(ExpenseService expenseService)
    {
        _expenseService = expenseService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var expenses = await _expenseService.GetAllExpensesAsync();
        return Ok(expenses);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Expense expense)
    {
        var created = await
_expenseService.CreateExpenseAsync(expense);
        return CreatedAtAction(nameof(GetAll), new { id = created.Id
}, created);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var expense = await _expenseService.GetExpenseByIdAsync(id);
        if (expense == null)
            return NotFound();
        return Ok(expense);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, Expense expense)
    {
        if (id != expense.Id)
            return BadRequest();

        await _expenseService.UpdateExpenseAsync(expense);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _expenseService.DeleteExpenseAsync(id);
        return NoContent();
    }
}