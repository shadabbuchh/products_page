import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui';
import { ProductStockBadge } from './product-stock-badge';
import { ProductActions } from './product-actions';
import type { Product } from '@/entities/product';

interface ProductsTableProps {
  products: Product[];
  loading?: boolean;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onToggleVisibility: (product: Product) => void;
}

export const ProductsTable = React.memo<ProductsTableProps>(
  ({ products, loading = false, onView, onEdit, onToggleVisibility }) => {
    if (loading) {
      return (
        <div className="rounded-lg border bg-card">
          <div className="p-8 text-center text-muted-foreground">
            Loading products...
          </div>
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="rounded-lg border bg-card">
          <div className="p-8 text-center text-muted-foreground">
            No products found
          </div>
        </div>
      );
    }

    return (
      <div className="overflow-hidden rounded-lg border shadow-sm bg-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-left font-semibold text-foreground">
                  Product
                </TableHead>
                <TableHead className="text-left font-semibold text-foreground">
                  SKU
                </TableHead>
                <TableHead className="text-left font-semibold text-foreground">
                  Price
                </TableHead>
                <TableHead className="text-left font-semibold text-foreground">
                  Stock
                </TableHead>
                <TableHead className="w-[120px]">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(product => {
                const isLowStock =
                  product.stock > 0 &&
                  product.stock <= (product.lowStockThreshold || 10);

                return (
                  <TableRow
                    key={product.id}
                    className={isLowStock ? 'bg-red-50/50' : undefined}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md">
                          <img
                            className="h-full w-full object-cover"
                            src={
                              product.image ||
                              'https://assets.appsmith.com/widgets/default.png'
                            }
                            alt={product.name}
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-foreground truncate">
                            {product.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Category
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {product.sku}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      ${product.price.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <ProductStockBadge product={product} />
                    </TableCell>
                    <TableCell>
                      <ProductActions
                        product={product}
                        onView={onView}
                        onEdit={onEdit}
                        onToggleVisibility={onToggleVisibility}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
);
