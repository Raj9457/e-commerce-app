
import React from 'react';
import { Button } from './ui/button';
import { X, ShoppingCart } from 'lucide-react';
import { CartItem } from '../services/api';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Cart Drawer */}
      <div
        className={`cart-drawer fixed top-0 right-0 z-50 h-full w-full sm:w-96 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <span className="ml-2 bg-brand-purple text-white text-xs font-semibold px-2 py-1 rounded-full">
                {cartItems.length}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close cart">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <ScrollArea className="flex-grow p-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
                <Button 
                  className="mt-4 bg-brand-purple hover:bg-brand-darkPurple"
                  onClick={onClose}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <ul className="space-y-6">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-medium line-clamp-1">{item.title}</h4>
                      <p className="text-brand-purple font-semibold">${item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto text-red-500 h-7"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </ScrollArea>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t bg-gray-50">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${calculateTotal().toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-bold">
                  <span>Total</span>
                  <span className="text-brand-purple">${calculateTotal().toFixed(2)}</span>
                </div>
                <Button className="w-full bg-brand-purple hover:bg-brand-darkPurple">
                  Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
