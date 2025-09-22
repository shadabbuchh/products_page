import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';

interface ProductsFiltersProps {
  categoryFilter: string;
  stockFilter: string;
  onCategoryChange: (value: string) => void;
  onStockChange: (value: string) => void;
}

export const ProductsFilters = React.memo<ProductsFiltersProps>(
  ({ categoryFilter, stockFilter, onCategoryChange, onStockChange }) => {
    return (
      <div className="flex gap-4">
        <Select value={categoryFilter} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full">
            <div className="flex items-center justify-between w-full">
              <SelectValue placeholder="Category: All" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Category: All</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
          </SelectContent>
        </Select>

        <Select value={stockFilter} onValueChange={onStockChange}>
          <SelectTrigger className="w-full">
            <div className="flex items-center justify-between w-full">
              <SelectValue placeholder="Stock Status: Any" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Stock Status: Any</SelectItem>
            <SelectItem value="in-stock">In Stock</SelectItem>
            <SelectItem value="low-stock">Low Stock</SelectItem>
            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  }
);
