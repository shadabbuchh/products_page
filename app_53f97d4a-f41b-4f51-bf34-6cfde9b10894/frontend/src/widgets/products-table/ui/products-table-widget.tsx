import React from 'react';
import { useProducts, useUpdateProduct } from '@/entities/product';
import { useProductsFiltersStore } from '../model/products-store';
import { ProductsSearch } from './products-search';
import { ProductsFilters } from './products-filters';
import { ProductsTable } from './products-table';
import { ProductsPagination } from './products-pagination';
import type { Product } from '@/entities/product';

export const ProductsTableWidget = React.memo(() => {
  const search = useProductsFiltersStore(state => state.search);
  const categoryFilter = useProductsFiltersStore(state => state.categoryFilter);
  const stockFilter = useProductsFiltersStore(state => state.stockFilter);
  const page = useProductsFiltersStore(state => state.page);
  const limit = useProductsFiltersStore(state => state.limit);
  const sort = useProductsFiltersStore(state => state.sort);
  const setSearch = useProductsFiltersStore(state => state.setSearch);
  const setCategoryFilter = useProductsFiltersStore(
    state => state.setCategoryFilter
  );
  const setStockFilter = useProductsFiltersStore(state => state.setStockFilter);
  const setPage = useProductsFiltersStore(state => state.setPage);

  // Build filter string for API
  const filterString = React.useMemo(() => {
    const filters: string[] = [];

    if (categoryFilter !== 'all') {
      filters.push(`category=${categoryFilter}`);
    }

    if (stockFilter !== 'any') {
      filters.push(`stockStatus=${stockFilter}`);
    }

    return filters.length > 0 ? filters.join('&') : undefined;
  }, [categoryFilter, stockFilter]);

  const { data, isLoading } = useProducts({
    search: search || undefined,
    page,
    limit,
    sort,
    filter: filterString,
  });

  const updateProductMutation = useUpdateProduct();

  const products = data?.products || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const handleView = React.useCallback((product: Product) => {
    console.log('View product:', product);
    // TODO: Implement product details view
  }, []);

  const handleEdit = React.useCallback((product: Product) => {
    console.log('Edit product:', product);
    // TODO: Implement product edit modal/form
  }, []);

  const handleToggleVisibility = React.useCallback(
    (product: Product) => {
      updateProductMutation.mutate({
        id: product.id,
        data: { isVisible: !product.isVisible },
      });
    },
    [updateProductMutation]
  );

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2">
          <ProductsSearch value={search} onChange={setSearch} />
        </div>
        <ProductsFilters
          categoryFilter={categoryFilter}
          stockFilter={stockFilter}
          onCategoryChange={setCategoryFilter}
          onStockChange={setStockFilter}
        />
      </div>

      {/* Table */}
      <ProductsTable
        products={products}
        loading={isLoading}
        onView={handleView}
        onEdit={handleEdit}
        onToggleVisibility={handleToggleVisibility}
      />

      {/* Pagination */}
      <ProductsPagination
        currentPage={page}
        totalPages={totalPages}
        total={total}
        limit={limit}
        onPageChange={setPage}
      />
    </div>
  );
});
