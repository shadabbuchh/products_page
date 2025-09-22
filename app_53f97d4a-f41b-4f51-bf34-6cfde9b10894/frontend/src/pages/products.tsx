import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/shared/ui';
import { ProductsTableWidget } from '@/widgets/products-table';

export const ProductsPage = React.memo(() => {
  const handleCreateProduct = React.useCallback(() => {
    console.log('Create product');
    // TODO: Implement product creation modal/form
  }, []);

  return (
    <div className="container mx-auto max-w-screen-xl p-4 sm:p-6 lg:p-8">
      <main className="space-y-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Products
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your product catalog efficiently.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Button onClick={handleCreateProduct}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Product
            </Button>
          </div>
        </header>

        {/* Products Table Widget */}
        <ProductsTableWidget />
      </main>
    </div>
  );
});
