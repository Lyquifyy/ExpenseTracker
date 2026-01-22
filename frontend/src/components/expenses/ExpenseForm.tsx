import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RetroCard } from '../common/RetroCard';
import { RetroButton } from '../common/RetroButton';
import { RetroInput, RetroSelect } from '../common/RetroInput';
import { useCreateExpense, useUpdateExpense, useExpense } from '../../hooks/useExpenses';
import { EXPENSE_CATEGORIES } from '../../utils/categories';
import { formatDateForInput } from '../../utils/formatters';

export function ExpenseForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const { data: existingExpense, isLoading: isLoadingExpense } = useExpense(id || '');
  const createMutation = useCreateExpense();
  const updateMutation = useUpdateExpense();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('food');

  useEffect(() => {
    if (existingExpense) {
      setDescription(existingExpense.description);
      setAmount(existingExpense.amount.toString());
      setDate(formatDateForInput(existingExpense.date));
      setCategory(existingExpense.category);
    }
  }, [existingExpense]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const expenseData = {
      description,
      amount: parseFloat(amount),
      date: new Date(date).toISOString(),
      category
    };

    try {
      if (isEditing && existingExpense) {
        await updateMutation.mutateAsync({
          id: existingExpense.id,
          expense: expenseData
        });
      } else {
        await createMutation.mutateAsync(expenseData);
      }
      navigate('/expenses');
    } catch (error) {
      console.error('Failed to save expense:', error);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  if (isEditing && isLoadingExpense) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <RetroCard title={isEditing ? 'Edit Expense' : 'Add Expense'}>
      <form className="expense-form" onSubmit={handleSubmit}>
        <RetroInput
          id="description"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What did you spend on?"
          required
        />

        <div className="expense-form__row">
          <RetroInput
            id="amount"
            label="Amount"
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            required
          />

          <RetroInput
            id="date"
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <RetroSelect
          id="category"
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={EXPENSE_CATEGORIES.map((cat) => ({
            value: cat.value,
            label: cat.label
          }))}
        />

        <div className="expense-form__actions">
          <RetroButton type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Add Expense'}
          </RetroButton>
          <RetroButton type="button" onClick={() => navigate('/expenses')}>
            Cancel
          </RetroButton>
        </div>
      </form>
    </RetroCard>
  );
}
