import axios from 'axios';
import type { Expense, CreateExpenseDto, UpdateExpenseDto } from '../types';

const API_BASE = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

export const expenseApi = {
  getAll: () => api.get<Expense[]>('/expenses').then(res => res.data),
  getById: (id: string) => api.get<Expense>(`/expenses/${id}`).then(res => res.data),
  create: (expense: CreateExpenseDto) => api.post<Expense>('/expenses', expense).then(res => res.data),
  update: (id: string, expense: UpdateExpenseDto) => api.put<Expense>(`/expenses/${id}`, expense).then(res => res.data),
  delete: (id: string) => api.delete(`/expenses/${id}`)
};
