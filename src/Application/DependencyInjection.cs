using FinanceTracker.Application.Mapping;
using FinanceTracker.Application.Services;
using FinanceTracker.Application.Validators;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace FinanceTracker.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // Register AutoMapper
        services.AddAutoMapper(typeof(MappingProfile));

        // Register FluentValidation validators
        services.AddValidatorsFromAssemblyContaining<CreateExpenseValidator>();

        // Register services
        services.AddScoped<ExpenseService>();
        services.AddScoped<IncomeSettingsService>();
        services.AddScoped<AnalyticsService>();

        return services;
    }
}
