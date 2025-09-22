import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/app/layouts';
import { ProductsPage } from '@/pages/products';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Default redirect to main page */}
        <Route path="/" element={<Navigate to="/products" replace />} />

        {/* Main application page */}
        <Route path="/products" element={<ProductsPage />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Route>
    </Routes>
  );
};
