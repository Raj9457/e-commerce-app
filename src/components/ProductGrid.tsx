
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../services/api';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  loading: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-gray-100 animate-pulse rounded-lg h-96"></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-500">No products found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
