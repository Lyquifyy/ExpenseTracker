using AutoMapper;
using FinanceTracker.Application.DTOs;
using FinanceTracker.Domain.Entities;

namespace FinanceTracker.Application.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Expense mappings
        CreateMap<Expense, ExpenseDto>();
        CreateMap<CreateExpenseDto, Expense>()
            .ForMember(dest => dest.Id, opt => opt.Ignore());
        CreateMap<UpdateExpenseDto, Expense>()
            .ForMember(dest => dest.Id, opt => opt.Ignore());

        // Income settings mappings
        CreateMap<IncomeSettings, IncomeSettingsDto>()
            .ForMember(dest => dest.MonthlyIncome, opt => opt.MapFrom(src => src.BiweeklyAmount * 26 / 12))
            .ForMember(dest => dest.YearlyIncome, opt => opt.MapFrom(src => src.BiweeklyAmount * 26));
        CreateMap<CreateIncomeSettingsDto, IncomeSettings>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
            .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore());
        CreateMap<UpdateIncomeSettingsDto, IncomeSettings>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
            .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore());
    }
}
