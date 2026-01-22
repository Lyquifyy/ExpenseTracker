namespace FinanceTracker.Domain.Entities;

public class IncomeSettings
{
    public Guid Id { get; set; }
    public decimal BiweeklyAmount { get; set; }
    public DateTime LastPayDate { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
