using AutoMapper;
using FinanceTracker.Application.DTOs;
using FinanceTracker.Application.Interfaces;
using FinanceTracker.Domain.Entities;

namespace FinanceTracker.Application.Services;

public class ExpenseService
{
    private readonly IExpenseRepository _repository;
    private readonly IMapper _mapper;

    public ExpenseService(IExpenseRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<ExpenseDto>> GetAllExpensesAsync()
    {
        var expenses = await _repository.GetAllAsync();
        return _mapper.Map<IEnumerable<ExpenseDto>>(expenses);
    }

    public async Task<ExpenseDto?> GetExpenseByIdAsync(Guid id)
    {
        var expense = await _repository.GetByIdAsync(id);
        return expense == null ? null : _mapper.Map<ExpenseDto>(expense);
    }

    public async Task<ExpenseDto> CreateExpenseAsync(CreateExpenseDto dto)
    {
        var expense = _mapper.Map<Expense>(dto);
        expense.Id = Guid.NewGuid();

        var created = await _repository.CreateAsync(expense);
        return _mapper.Map<ExpenseDto>(created);
    }

    public async Task<ExpenseDto?> UpdateExpenseAsync(Guid id, UpdateExpenseDto dto)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing == null)
            return null;

        existing.Description = dto.Description;
        existing.Amount = dto.Amount;
        existing.Date = dto.Date;
        existing.Category = dto.Category;

        await _repository.UpdateAsync(existing);
        return _mapper.Map<ExpenseDto>(existing);
    }

    public async Task<bool> DeleteExpenseAsync(Guid id)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing == null)
            return false;

        await _repository.DeleteAsync(id);
        return true;
    }
}
