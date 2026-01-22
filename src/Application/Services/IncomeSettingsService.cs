using AutoMapper;
using FinanceTracker.Application.DTOs;
using FinanceTracker.Application.Interfaces;
using FinanceTracker.Domain.Entities;

namespace FinanceTracker.Application.Services;

public class IncomeSettingsService
{
    private readonly IIncomeSettingsRepository _repository;
    private readonly IMapper _mapper;

    public IncomeSettingsService(IIncomeSettingsRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IncomeSettingsDto?> GetIncomeSettingsAsync()
    {
        var settings = await _repository.GetAsync();
        return settings == null ? null : _mapper.Map<IncomeSettingsDto>(settings);
    }

    public async Task<IncomeSettingsDto> SaveIncomeSettingsAsync(CreateIncomeSettingsDto dto)
    {
        var existing = await _repository.GetAsync();

        IncomeSettings settings;
        if (existing == null)
        {
            settings = _mapper.Map<IncomeSettings>(dto);
            settings.Id = Guid.NewGuid();
            settings.CreatedAt = DateTime.UtcNow;
        }
        else
        {
            settings = existing;
            settings.BiweeklyAmount = dto.BiweeklyAmount;
            settings.LastPayDate = dto.LastPayDate;
        }

        settings.UpdatedAt = DateTime.UtcNow;

        var saved = await _repository.CreateOrUpdateAsync(settings);
        return _mapper.Map<IncomeSettingsDto>(saved);
    }

    public async Task DeleteIncomeSettingsAsync()
    {
        await _repository.DeleteAsync();
    }
}
