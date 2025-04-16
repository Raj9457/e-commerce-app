
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import Cart from '../components/Cart';
import { fetchProducts, fetchCategories, Product, CartItem } from '../services/api';
import { toast } from '../components/ui/use-toast';

const Index = () => {
  // Products and loading state
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Categories
  const [categories, setCategories] = useState<string[]>([]);
  
  // Filters state
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortOption, setSortOption] = useState('default');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  
  // Cart state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Fetch products and categories on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const productsData = await fetchProducts();
      const categoriesData = await fetchCategories();
      
      setProducts(productsData);
      setFilteredProducts(productsData);
      setCategories(categoriesData);
      
      // Calculate max price for the price range slider
      if (productsData.length > 0) {
        const highestPrice = Math.ceil(
          Math.max(...productsData.map((product) => product.price))
        );
        setMaxPrice(highestPrice);
        setPriceRange([0, highestPrice]);
      }
      
      setLoading(false);
    };
    
    loadData();
  }, []);
  
  // Apply filters and sort
  useEffect(() => {
    // Filter by category
    let result = [...products];
    
    if (selectedCategory !== 'all') {
      result = result.filter((product) => product.category === selectedCategory);
    }
    
    // Filter by price range
    result = result.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'title-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // Default sorting (by id)
        result.sort((a, b) => a.id - b.id);
    }
    
    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategory, priceRange, sortOption, products]);
  
  // Calculate pagination
  useEffect(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    setDisplayProducts(filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct));
  }, [currentPage, filteredProducts, productsPerPage]);
  
  // Page change handler
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Add to cart handler
  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.title.substring(0, 30)}... was added to your cart.`,
      duration: 2000,
    });
  };
  
  // Update cart item quantity
  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  // Remove from cart
  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  
  // Toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };
  
  // Calculate total number of items in cart (for badge display)
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar cartItemsCount={cartItemsCount} toggleCart={toggleCart} />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Our Products</h1>
          <p className="text-gray-600">
            Browse our collection of high-quality products for every need.
          </p>
        </div>
        
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          priceRange={priceRange}
          maxPrice={maxPrice}
          onPriceRangeChange={setPriceRange}
          sortOption={sortOption}
          onSortChange={setSortOption}
        />
        
        <ProductGrid
          products={displayProducts}
          onAddToCart={handleAddToCart}
          loading={loading}
        />
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
      
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
      
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; 2025 CartSavvy. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
