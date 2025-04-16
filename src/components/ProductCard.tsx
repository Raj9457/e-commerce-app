
import React from 'react';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../services/api';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Card className="product-card h-full flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="mb-4 overflow-hidden flex items-center justify-center h-48">
          <img 
            src={product.image} 
            alt={product.title} 
            className="product-image" 
            loading="lazy"
          />
        </div>
        
        <div className="flex-grow">
          <Badge variant="secondary" className="mb-2">
            {product.category}
          </Badge>
          
          <h3 className="font-medium mb-2 line-clamp-2 text-lg" title={product.title}>
            {product.title}
          </h3>
          
          <p className="text-xl font-bold text-brand-purple">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-brand-purple hover:bg-brand-darkPurple"
          onClick={() => onAddToCart(product)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
