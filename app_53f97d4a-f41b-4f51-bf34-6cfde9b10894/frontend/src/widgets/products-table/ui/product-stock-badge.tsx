import React from 'react';
import { Badge } from '@/shared/ui';
import type { Product } from '@/entities/product';

interface ProductStockBadgeProps {
  product: Product;
}

export const ProductStockBadge = React.memo<ProductStockBadgeProps>(
  ({ product }) => {
    const { stock, lowStockThreshold = 10 } = product;

    if (stock === 0) {
      return (
        <Badge
          variant="secondary"
          className="bg-gray-100 text-gray-800 hover:bg-gray-100"
        >
          Out of Stock (0)
        </Badge>
      );
    }

    if (stock <= lowStockThreshold) {
      return (
        <Badge
          variant="destructive"
          className="bg-red-50 text-red-800 hover:bg-red-50"
        >
          Low Stock ({stock})
        </Badge>
      );
    }

    return (
      <Badge className="bg-green-50 text-green-800 hover:bg-green-50">
        In Stock ({stock})
      </Badge>
    );
  }
);
