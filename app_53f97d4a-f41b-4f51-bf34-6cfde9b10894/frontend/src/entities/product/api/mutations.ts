import { useMutation, useQueryClient } from '@tanstack/react-query';
import { put, handleError } from '@/shared/api';
import type { components } from '@app/shared/generated-types';

export type ProductUpdate = components['schemas']['ProductUpdate'];
export type Product = components['schemas']['Product'];

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: ProductUpdate;
    }): Promise<Product> => {
      const { data: response, error } = await put('/products/{id}', {
        params: {
          path: { id },
        },
        body: data,
      });

      if (error) handleError(error);

      return response!;
    },
    onSuccess: data => {
      queryClient.setQueryData(['product', data.id], data);
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
