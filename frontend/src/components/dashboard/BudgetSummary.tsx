import { useMemo } from 'react';
import type { Expense } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { useIncome } from '../../hooks/useIncome';

interface BudgetSummaryProps {
  expenses: Expense[];
}

export function BudgetSummary({ expenses }: BudgetSummaryProps) {
  const { monthlyIncome } = useIncome();

  const totalExpenses = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return expenses
      .filter((e) => {
        const date = new Date(e.date);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      })
      .reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  const balance = monthlyIncome - totalExpenses;
  const isNegative = balance < 0;

  return (
    <div className="budget-summary">
      <div className="budget-summary__item">
        <div className="budget-summary__label">Monthly Income</div>
        <div className="budget-summary__value budget-summary__value--income">
          {formatCurrency(monthlyIncome)}
        </div>
      </div>
      <div className="budget-summary__item">
        <div className="budget-summary__label">This Month</div>
        <div className="budget-summary__value budget-summary__value--expenses">
          {formatCurrency(totalExpenses)}
        </div>
      </div>
      <div className="budget-summary__item">
        <div className="budget-summary__label">Balance</div>
        <div
          className={`budget-summary__value ${
            isNegative ? 'budget-summary__value--negative' : 'budget-summary__value--balance'
          }`}
        >
          {formatCurrency(balance)}
        </div>
      </div>
    </div>
  );
}
