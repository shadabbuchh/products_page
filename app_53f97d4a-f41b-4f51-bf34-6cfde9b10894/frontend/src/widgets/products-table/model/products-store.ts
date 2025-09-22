import { create } from 'zustand';

interface ProductsFiltersState {
  search: string;
  categoryFilter: string;
  stockFilter: string;
  page: number;
  limit: number;
  sort: string;
  setSearch: (search: string) => void;
  setCategoryFilter: (category: string) => void;
  setStockFilter: (stock: string) => void;
  setPage: (page: number) => void;
  setSort: (sort: string) => void;
  resetFilters: () => void;
}

export const useProductsFiltersStore = create<ProductsFiltersState>(set => ({
  search: '',
  categoryFilter: 'all',
  stockFilter: 'any',
  page: 1,
  limit: 20,
  sort: 'name',
  setSearch: search => set({ search, page: 1 }),
  setCategoryFilter: categoryFilter => set({ categoryFilter, page: 1 }),
  setStockFilter: stockFilter => set({ stockFilter, page: 1 }),
  setPage: page => set({ page }),
  setSort: sort => set({ sort, page: 1 }),
  resetFilters: () =>
    set({
      search: '',
      categoryFilter: 'all',
      stockFilter: 'any',
      page: 1,
      sort: 'name',
    }),
}));
