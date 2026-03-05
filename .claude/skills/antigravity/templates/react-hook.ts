import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { {{ServiceName}} } from '@/services/{{ServiceName}}';
import { {{EntityName}} } from '@/types';

export const use{{FormName}} = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Partial<{{EntityName}}>>({});

  // Queries
  const { data, isLoading, error } = useQuery({
    queryKey: ['{{entityName}}'],
    queryFn: () => {{ServiceName}}.fetchData(),
  });

  // Mutations
  const submitMutation = useMutation({
    mutationFn: {{ServiceName}}.saveData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['{{entityName}}'] });
    },
  });

  // Handlers
  const handleSubmit = useCallback(async () => {
    await submitMutation.mutateAsync(formData);
  }, [formData, submitMutation]);

  const handleCancel = useCallback(() => {
    setFormData({});
  }, []);

  const handleChange = useCallback((field: keyof {{EntityName}}, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  return {
    data,
    loading: isLoading || submitMutation.isPending,
    error: error || submitMutation.error,
    formData,
    handleSubmit,
    handleCancel,
    handleChange,
  };
};
