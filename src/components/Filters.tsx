
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Label } from './ui/label';

interface FiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  maxPrice: number;
  onPriceRangeChange: (range: [number, number]) => void;
  sortOption: string;
  onSortChange: (option: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  maxPrice,
  onPriceRangeChange,
  sortOption,
  onSortChange,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Category Filter */}
        <div>
          <Label htmlFor="category-filter" className="mb-2 block">Category</Label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger id="category-filter">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Price Range Filter */}
        <div>
          <Label htmlFor="price-filter" className="mb-2 block">
            Price Range: ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}
          </Label>
          <Slider
            id="price-filter"
            min={0}
            max={maxPrice}
            step={1}
            value={[priceRange[0], priceRange[1]]}
            onValueChange={(value) => onPriceRangeChange(value as [number, number])}
            className="py-4"
          />
        </div>
        
        {/* Sort Options */}
        <div>
          <Label htmlFor="sort-options" className="mb-2 block">Sort By</Label>
          <Select value={sortOption} onValueChange={onSortChange}>
            <SelectTrigger id="sort-options">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="title-asc">Title: A-Z</SelectItem>
              <SelectItem value="title-desc">Title: Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
