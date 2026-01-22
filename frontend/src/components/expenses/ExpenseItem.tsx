import { useNavigate } from 'react-router-dom';
import type { Expense } from '../../types';
import { RetroButton } from '../common/RetroButton';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { EXPENSE_CATEGORIES } from '../../utils/categories';

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

export function ExpenseItem({ expense, onDelete }: ExpenseItemProps) {
  const navigate = useNavigate();

  const categoryLabel =
    EXPENSE_CATEGORIES.find((c) => c.value === expense.category)?.label ||
    expense.category;

  return (
    <tr>
      <td>{formatDate(expense.date)}</td>
      <td>{expense.description}</td>
      <td className="expense-table__category">{categoryLabel}</td>
      <td className="expense-table__amount">{formatCurrency(expense.amount)}</td>
      <td>
        <div className="expense-table__actions">
          <RetroButton
            size="small"
            onClick={() => navigate(`/expenses/${expense.id}/edit`)}
          >
            Edit
          </RetroButton>
          <RetroButton
            size="small"
            variant="danger"
            onClick={() => onDelete(expense.id)}
          >
            Del
          </RetroButton>
        </div>
      </td>
    </tr>
  );
}
