import { useNavigate } from 'react-router-dom';
import { RetroCard } from '../common/RetroCard';
import { RetroButton } from '../common/RetroButton';
import { BudgetSummary } from './BudgetSummary';
import { CategoryChart } from './CategoryChart';
import { TrendChart } from './TrendChart';
import { useExpenses } from '../../hooks/useExpenses';

export function Dashboard() {
  const navigate = useNavigate();
  const { data: expenses, isLoading, error } = useExpenses();

  if (isLoading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="error">
        Failed to load data. Make sure the API is running at http://localhost:5000
      </div>
    );
  }

  const expenseList = expenses || [];

  return (
    <div className="dashboard">
      <div className="dashboard__full">
        <RetroCard title="Budget Overview">
          <BudgetSummary expenses={expenseList} />
          <div style={{ marginTop: '20px' }}>
            <RetroButton variant="primary" onClick={() => navigate('/expenses/new')}>
              + Quick Add Expense
            </RetroButton>
          </div>
        </RetroCard>
      </div>

      <RetroCard title="Spending by Category">
        <CategoryChart expenses={expenseList} />
      </RetroCard>

      <RetroCard title="Monthly Trend">
        <TrendChart expenses={expenseList} />
      </RetroCard>
    </div>
  );
}
