import axios from 'axios';
import type { CategoryTotal, MonthlyTotal, DashboardSummary } from '../types';

const API_BASE = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

export const analyticsApi = {
  getDashboardSummary: () => api.get<DashboardSummary>('/analytics/dashboard').then(res => res.data),
  getCategoryTotals: (year?: number, month?: number) => {
    const params = new URLSearchParams();
    if (year) params.append('year', year.toString());
    if (month) params.append('month', month.toString());
    return api.get<CategoryTotal[]>(`/analytics/categories?${params}`).then(res => res.data);
  },
  getMonthlyTotals: (months = 6) =>
    api.get<MonthlyTotal[]>(`/analytics/monthly?months=${months}`).then(res => res.data)
};
