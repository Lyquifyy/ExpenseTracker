import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { incomeApi } from '../api/incomeApi';
import type { CreateIncomeSettingsDto } from '../types';

export function useIncome() {
  const queryClient = useQueryClient();

  const { data: income, isLoading, error } = useQuery({
    queryKey: ['income'],
    queryFn: incomeApi.get,
    retry: false
  });

  const saveMutation = useMutation({
    mutationFn: (settings: CreateIncomeSettingsDto) => incomeApi.save(settings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['income'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: () => incomeApi.delete(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['income'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    }
  });

  const monthlyIncome = income?.monthlyIncome ?? 0;

  return {
    income: income ?? null,
    isLoading,
    error,
    saveIncome: saveMutation.mutate,
    clearIncome: deleteMutation.mutate,
    monthlyIncome,
    isSaving: saveMutation.isPending
  };
}
