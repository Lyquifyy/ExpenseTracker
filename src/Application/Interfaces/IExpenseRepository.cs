  using FinanceTracker.Domain.Entities;

  namespace FinanceTracker.Application.Interfaces;

  public interface IExpenseRepository
  {
      Task<IEnumerable<Expense>> GetAllAsync();
      Task<Expense?> GetByIdAsync(Guid id);
      Task<Expense> CreateAsync(Expense expense);
      Task UpdateAsync(Expense expense);
      Task DeleteAsync(Guid id);
  }