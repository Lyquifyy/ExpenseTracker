export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

export interface CreateExpenseDto {
  description: string;
  amount: number;
  date: string;
  category: string;
}

export interface UpdateExpenseDto {
  description: string;
  amount: number;
  date: string;
  category: string;
}

export interface IncomeSettings {
  id?: string;
  biweeklyAmount: number;
  lastPayDate: string;
  monthlyIncome?: number;
  yearlyIncome?: number;
}

export interface CreateIncomeSettingsDto {
  biweeklyAmount: number;
  lastPayDate: string;
}

export interface CategoryTotal {
  category: string;
  total: number;
}

export interface MonthlyTotal {
  month: string;
  total: number;
}

export interface DashboardSummary {
  monthlyIncome: number;
  currentMonthExpenses: number;
  balance: number;
  categoryTotals: CategoryTotal[];
  monthlyTrends: MonthlyTotal[];
}
