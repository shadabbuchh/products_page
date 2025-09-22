import React from 'react';
import { Button } from '@/shared/ui';

interface ProductsPaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export const ProductsPagination = React.memo<ProductsPaginationProps>(
  ({ currentPage, totalPages, total, limit, onPageChange }) => {
    const startItem = Math.min((currentPage - 1) * limit + 1, total);
    const endItem = Math.min(currentPage * limit, total);

    const handlePrevious = React.useCallback(() => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    }, [currentPage, onPageChange]);

    const handleNext = React.useCallback(() => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    }, [currentPage, totalPages, onPageChange]);

    if (total === 0) {
      return null;
    }

    return (
      <nav className="flex items-center justify-between border-t border-border px-4 py-3 sm:px-0">
        <div className="hidden sm:block">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{startItem}</span> to{' '}
            <span className="font-medium">{endItem}</span> of{' '}
            <span className="font-medium">{total}</span> results
          </p>
        </div>
        <div className="flex flex-1 justify-between sm:justify-end">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentPage <= 1}
            className="relative inline-flex items-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={handleNext}
            disabled={currentPage >= totalPages}
            className="relative ml-3 inline-flex items-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
          >
            Next
          </Button>
        </div>
      </nav>
    );
  }
);
