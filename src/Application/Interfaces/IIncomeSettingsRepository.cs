using FinanceTracker.Domain.Entities;

namespace FinanceTracker.Application.Interfaces;

public interface IIncomeSettingsRepository
{
    Task<IncomeSettings?> GetAsync();
    Task<IncomeSettings> CreateOrUpdateAsync(IncomeSettings settings);
    Task DeleteAsync();
}
