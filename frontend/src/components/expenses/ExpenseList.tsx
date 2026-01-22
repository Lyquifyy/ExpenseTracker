import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RetroCard } from '../common/RetroCard';
import { RetroButton } from '../common/RetroButton';
import { ExpenseItem } from './ExpenseItem';
import { useExpenses, useDeleteExpense } from '../../hooks/useExpenses';

export function ExpenseList() {
  const navigate = useNavigate();
  const { data: expenses, isLoading, error } = useExpenses();
  const deleteMutation = useDeleteExpense();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (deleteConfirm === id) {
      await deleteMutation.mutateAsync(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading expenses...</div>;
  }

  if (error) {
    return <div className="error">Failed to load expenses. Is the API running?</div>;
  }

  const sortedExpenses = [...(expenses || [])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <RetroCard title="Expenses">
      <div style={{ marginBottom: '20px' }}>
        <RetroButton variant="primary" onClick={() => navigate('/expenses/new')}>
          + Add Expense
        </RetroButton>
      </div>

      {sortedExpenses.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state__title">No expenses yet</p>
          <p>Add your first expense to get started!</p>
        </div>
      ) : (
        <div className="expense-list">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedExpenses.map((expense) => (
                <ExpenseItem
                  key={expense.id}
                  expense={expense}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteConfirm && (
        <div style={{ marginTop: '12px', color: 'var(--neon-orange)', fontSize: '14px' }}>
          Click delete again to confirm
        </div>
      )}
    </RetroCard>
  );
}
