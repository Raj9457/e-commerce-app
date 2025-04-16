import React from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

interface NavbarProps {
  cartItemsCount: number;
  toggleCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartItemsCount, toggleCart }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-brand-purple">E Commerce</h1>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className="relative"
            onClick={toggleCart}
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItemsCount > 0 && (
              <span className="cart-badge">{cartItemsCount}</span>
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
