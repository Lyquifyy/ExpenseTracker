using FinanceTracker.Application.DTOs;
using FluentValidation;

namespace FinanceTracker.Application.Validators;

public class CreateIncomeSettingsValidator : AbstractValidator<CreateIncomeSettingsDto>
{
    public CreateIncomeSettingsValidator()
    {
        RuleFor(x => x.BiweeklyAmount)
            .GreaterThanOrEqualTo(0).WithMessage("Bi-weekly amount cannot be negative")
            .LessThanOrEqualTo(999999999.99m).WithMessage("Amount is too large");

        RuleFor(x => x.LastPayDate)
            .NotEmpty().WithMessage("Last pay date is required");
    }
}

public class UpdateIncomeSettingsValidator : AbstractValidator<UpdateIncomeSettingsDto>
{
    public UpdateIncomeSettingsValidator()
    {
        RuleFor(x => x.BiweeklyAmount)
            .GreaterThanOrEqualTo(0).WithMessage("Bi-weekly amount cannot be negative")
            .LessThanOrEqualTo(999999999.99m).WithMessage("Amount is too large");

        RuleFor(x => x.LastPayDate)
            .NotEmpty().WithMessage("Last pay date is required");
    }
}
