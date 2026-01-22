import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { format, parseISO, startOfMonth, subMonths } from 'date-fns';
import type { Expense } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface TrendChartProps {
  expenses: Expense[];
}

export function TrendChart({ expenses }: TrendChartProps) {
  const data = useMemo(() => {
    const now = new Date();
    const months: { month: Date; label: string; total: number }[] = [];

    // Last 6 months
    for (let i = 5; i >= 0; i--) {
      const monthDate = startOfMonth(subMonths(now, i));
      months.push({
        month: monthDate,
        label: format(monthDate, 'MMM'),
        total: 0
      });
    }

    expenses.forEach((expense) => {
      const expenseDate = parseISO(expense.date);
      const monthData = months.find(
        (m) =>
          expenseDate.getMonth() === m.month.getMonth() &&
          expenseDate.getFullYear() === m.month.getFullYear()
      );
      if (monthData) {
        monthData.total += expense.amount;
      }
    });

    return months.map((m) => ({
      name: m.label,
      amount: m.total
    }));
  }, [expenses]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#22222f" />
        <XAxis
          dataKey="name"
          stroke="#b0b0c0"
          tick={{ fontFamily: 'VT323, monospace', fontSize: 16 }}
        />
        <YAxis
          stroke="#b0b0c0"
          tick={{ fontFamily: 'VT323, monospace', fontSize: 16 }}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          contentStyle={{
            background: '#12121a',
            border: '2px solid #00ffff',
            borderRadius: 0,
            fontFamily: 'VT323, monospace',
            fontSize: '18px'
          }}
          formatter={(value) => [formatCurrency(Number(value)), 'Spent']}
        />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#00ffff"
          strokeWidth={3}
          dot={{ fill: '#ff00ff', strokeWidth: 2, r: 6 }}
          activeDot={{ fill: '#ff00ff', strokeWidth: 0, r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
