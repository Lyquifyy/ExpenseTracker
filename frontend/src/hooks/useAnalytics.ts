import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '../api/analyticsApi';

export function useDashboardSummary() {
  return useQuery({
    queryKey: ['analytics', 'dashboard'],
    queryFn: analyticsApi.getDashboardSummary
  });
}

export function useCategoryTotals(year?: number, month?: number) {
  return useQuery({
    queryKey: ['analytics', 'categories', year, month],
    queryFn: () => analyticsApi.getCategoryTotals(year, month)
  });
}

export function useMonthlyTotals(months = 6) {
  return useQuery({
    queryKey: ['analytics', 'monthly', months],
    queryFn: () => analyticsApi.getMonthlyTotals(months)
  });
}
