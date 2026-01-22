import axios from 'axios';
import type { IncomeSettings, CreateIncomeSettingsDto } from '../types';

const API_BASE = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

export const incomeApi = {
  get: () => api.get<IncomeSettings>('/incomesettings').then(res => res.data),
  save: (settings: CreateIncomeSettingsDto) => api.post<IncomeSettings>('/incomesettings', settings).then(res => res.data),
  delete: () => api.delete('/incomesettings')
};
