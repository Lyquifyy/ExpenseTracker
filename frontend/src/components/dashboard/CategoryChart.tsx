import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { Expense } from '../../types';
import { EXPENSE_CATEGORIES } from '../../utils/categories';
import { formatCurrency } from '../../utils/formatters';

interface CategoryChartProps {
  expenses: Expense[];
}

const COLORS = [
  '#ff00ff', // pink
  '#00ffff', // cyan
  '#9d00ff', // purple
  '#00ff41', // green
  '#ff6600', // orange
  '#ffff00', // yellow
  '#ff0066', // red-pink
  '#0099ff', // blue
];

export function CategoryChart({ expenses }: CategoryChartProps) {
  const data = useMemo(() => {
    const totals = new Map<string, number>();

    expenses.forEach((expense) => {
      const current = totals.get(expense.category) || 0;
      totals.set(expense.category, current + expense.amount);
    });

    return Array.from(totals.entries())
      .map(([category, total]) => ({
        name:
          EXPENSE_CATEGORIES.find((c) => c.value === category)?.label || category,
        value: total,
        category
      }))
      .sort((a, b) => b.value - a.value);
  }, [expenses]);

  if (data.length === 0) {
    return (
      <div className="empty-state">
        <p>No expense data to display</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
          stroke="#0a0a0f"
          strokeWidth={2}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: '#12121a',
            border: '2px solid #9d00ff',
            borderRadius: 0,
            fontFamily: 'VT323, monospace',
            fontSize: '18px'
          }}
          formatter={(value) => formatCurrency(Number(value))}
        />
        <Legend
          wrapperStyle={{
            fontFamily: 'VT323, monospace',
            fontSize: '16px'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
