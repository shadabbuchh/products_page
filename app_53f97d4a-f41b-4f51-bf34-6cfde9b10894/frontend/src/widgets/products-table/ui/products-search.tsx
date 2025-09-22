import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/shared/ui';

interface ProductsSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const ProductsSearch = React.memo<ProductsSearchProps>(
  ({ value, onChange, placeholder = 'Search by name, SKU...' }) => {
    return (
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="pl-10"
        />
      </div>
    );
  }
);
