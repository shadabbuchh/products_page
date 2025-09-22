import React from 'react';
import { Eye, Edit2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '@/shared/ui';
import type { Product } from '@/entities/product';

interface ProductActionsProps {
  product: Product;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onToggleVisibility: (product: Product) => void;
}

export const ProductActions = React.memo<ProductActionsProps>(
  ({ product, onView, onEdit, onToggleVisibility }) => {
    const handleView = React.useCallback(() => {
      onView(product);
    }, [product, onView]);

    const handleEdit = React.useCallback(() => {
      onEdit(product);
    }, [product, onEdit]);

    const handleToggleVisibility = React.useCallback(() => {
      onToggleVisibility(product);
    }, [product, onToggleVisibility]);

    return (
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleView}
          className="h-8 w-8 p-0"
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleEdit}
          className="h-8 w-8 p-0"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleVisibility}
          className="h-8 w-8 p-0"
        >
          {product.isVisible ? (
            <ToggleRight className="h-4 w-4" />
          ) : (
            <ToggleLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    );
  }
);
