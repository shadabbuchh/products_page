import { useQuery } from '@tanstack/react-query';
import { get, handleError } from '@/shared/api';
import type { components } from '@app/shared/generated-types';

export type Product = components['schemas']['Product'];

interface ProductsResponse {
  products: Product[];
  total: number;
}

interface ProductsParams {
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
  filter?: string;
}

export const useProducts = (params: ProductsParams = {}) =>
  useQuery({
    queryKey: ['products', params],
    queryFn: async (): Promise<ProductsResponse> => {
      const { data, error } = await get('/products', {
        params: {
          query: {
            search: params.search,
            page: params.page,
            limit: params.limit,
            sort: params.sort,
            filter: params.filter,
          },
        },
      });

      if (error) handleError(error);

      if (!data) {
        throw new Error('No data received from products endpoint');
      }

      return data;
    },
  });

export const useProduct = (id: string) =>
  useQuery({
    queryKey: ['product', id],
    queryFn: async (): Promise<Product> => {
      const { data, error } = await get('/products/{id}', {
        params: {
          path: { id },
        },
      });

      if (error) handleError(error);

      if (!data) {
        throw new Error('No data received from product endpoint');
      }

      return data;
    },
    enabled: !!id,
  });
