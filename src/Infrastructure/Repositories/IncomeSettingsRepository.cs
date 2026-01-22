using FinanceTracker.Application.Interfaces;
using FinanceTracker.Domain.Entities;
using FinanceTracker.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FinanceTracker.Infrastructure.Repositories;

public class IncomeSettingsRepository : IIncomeSettingsRepository
{
    private readonly AppDbContext _context;

    public IncomeSettingsRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IncomeSettings?> GetAsync()
    {
        return await _context.IncomeSettings.FirstOrDefaultAsync();
    }

    public async Task<IncomeSettings> CreateOrUpdateAsync(IncomeSettings settings)
    {
        var existing = await _context.IncomeSettings.FirstOrDefaultAsync();

        if (existing == null)
        {
            _context.IncomeSettings.Add(settings);
        }
        else
        {
            existing.BiweeklyAmount = settings.BiweeklyAmount;
            existing.LastPayDate = settings.LastPayDate;
            existing.UpdatedAt = settings.UpdatedAt;
            _context.IncomeSettings.Update(existing);
            settings = existing;
        }

        await _context.SaveChangesAsync();
        return settings;
    }

    public async Task DeleteAsync()
    {
        var settings = await _context.IncomeSettings.FirstOrDefaultAsync();
        if (settings != null)
        {
            _context.IncomeSettings.Remove(settings);
            await _context.SaveChangesAsync();
        }
    }
}
