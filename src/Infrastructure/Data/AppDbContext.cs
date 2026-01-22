using FinanceTracker.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinanceTracker.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    { }

    public DbSet<Expense> Expenses => Set<Expense>();
    public DbSet<IncomeSettings> IncomeSettings => Set<IncomeSettings>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Expense configuration
        modelBuilder.Entity<Expense>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Description).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Amount).HasPrecision(18, 2);
            entity.Property(e => e.Category).IsRequired().HasMaxLength(50);
            entity.HasIndex(e => e.Date);
            entity.HasIndex(e => e.Category);
        });

        // IncomeSettings configuration
        modelBuilder.Entity<IncomeSettings>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.BiweeklyAmount).HasPrecision(18, 2);
        });
    }
}
