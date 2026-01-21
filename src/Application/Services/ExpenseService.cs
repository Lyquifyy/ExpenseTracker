  using FinanceTracker.Application.Interfaces;
  using FinanceTracker.Domain.Entities;

  namespace FinanceTracker.Application.Services;

  public class ExpenseService
  {
      private readonly IExpenseRepository _repository;

      public ExpenseService(IExpenseRepository repository)
      {
          _repository = repository;
      }

      public Task<IEnumerable<Expense>> GetAllExpensesAsync()
          => _repository.GetAllAsync();

      public Task<Expense?> GetExpenseByIdAsync(Guid id)
          => _repository.GetByIdAsync(id);

      public Task<Expense> CreateExpenseAsync(Expense expense)
      {
          expense.Id = Guid.NewGuid();
          return _repository.CreateAsync(expense);
      }

    public Task UpdateExpenseAsync(Expense expense)
      => _repository.UpdateAsync(expense);

    public Task DeleteExpenseAsync(Guid id)
      => _repository.DeleteAsync(id);

      // Add validation, business logic here
  }