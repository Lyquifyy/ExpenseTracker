using FinanceTracker.Application.DTOs;
using FinanceTracker.Application.Services;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace FinanceTracker.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IncomeSettingsController : ControllerBase
{
    private readonly IncomeSettingsService _incomeSettingsService;
    private readonly IValidator<CreateIncomeSettingsDto> _validator;

    public IncomeSettingsController(
        IncomeSettingsService incomeSettingsService,
        IValidator<CreateIncomeSettingsDto> validator)
    {
        _incomeSettingsService = incomeSettingsService;
        _validator = validator;
    }

    [HttpGet]
    public async Task<ActionResult<IncomeSettingsDto>> Get()
    {
        var settings = await _incomeSettingsService.GetIncomeSettingsAsync();
        if (settings == null)
            return NotFound();
        return Ok(settings);
    }

    [HttpPost]
    public async Task<ActionResult<IncomeSettingsDto>> Save(CreateIncomeSettingsDto dto)
    {
        var validationResult = await _validator.ValidateAsync(dto);
        if (!validationResult.IsValid)
            return BadRequest(validationResult.Errors.Select(e => e.ErrorMessage));

        var saved = await _incomeSettingsService.SaveIncomeSettingsAsync(dto);
        return Ok(saved);
    }

    [HttpDelete]
    public async Task<IActionResult> Delete()
    {
        await _incomeSettingsService.DeleteIncomeSettingsAsync();
        return NoContent();
    }
}
