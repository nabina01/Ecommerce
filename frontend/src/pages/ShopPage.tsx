import React, { useState } from 'react';
import { ProductCard } from '../components/products/ProductCard';
import { Button, Input, Select, Checkbox, Rating } from '../components/ui';
import { SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatPrice, cn } from '../lib/utils';
import type { Product, ProductFilters } from '../types';

// Mock products
const allProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise-Canceling Headphones',
    slug: 'wireless-headphones',
    description: 'Premium wireless headphones with active noise cancellation',
    price: 299.99,
    comparePrice: 399.99,
    sku: 'WH-001',
    categoryId: 'cat1',
    images: [{ id: '1', productId: '1', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', alt: 'Headphones', position: 0 }],
    variants: [],
    tags: ['electronics', 'audio'],
    rating: 4.5,
    reviewCount: 128,
    stock: 45,
    lowStockThreshold: 10,
    isActive: true,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Classic White Sneakers',
    slug: 'classic-white-sneakers',
    description: 'Comfortable everyday sneakers',
    price: 89.99,
    comparePrice: 119.99,
    sku: 'SNEAK-001',
    categoryId: 'cat2',
    images: [{ id: '2', productId: '2', url: 'https://images.unsplash.com/photo-1542291026-7eec4c7c5bc1?w=400&h=400&fit=crop', alt: 'Sneakers', position: 0 }],
    variants: [],
    tags: ['fashion', 'shoes'],
    rating: 4.8,
    reviewCount: 256,
    stock: 120,
    lowStockThreshold: 20,
    isActive: true,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Smart Watch Pro',
    slug: 'smart-watch-pro',
    description: 'Advanced smartwatch with health tracking',
    price: 349.99,
    comparePrice: 449.99,
    sku: 'SW-001',
    categoryId: 'cat1',
    images: [{ id: '3', productId: '3', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', alt: 'Watch', position: 0 }],
    variants: [],
    tags: ['electronics', 'wearables'],
    rating: 4.7,
    reviewCount: 89,
    stock: 34,
    lowStockThreshold: 10,
    isActive: true,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Leather Crossbody Bag',
    slug: 'leather-crossbody-bag',
    description: 'Elegant genuine leather bag',
    price: 159.99,
    sku: 'BAG-001',
    categoryId: 'cat3',
    images: [{ id: '4', productId: '4', url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop', alt: 'Bag', position: 0 }],
    variants: [],
    tags: ['fashion', 'accessories'],
    rating: 4.6,
    reviewCount: 67,
    stock: 78,
    lowStockThreshold: 15,
    isActive: true,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Minimalist Desk Lamp',
    slug: 'minimalist-desk-lamp',
    description: 'Modern LED desk lamp with adjustable brightness',
    price: 79.99,
    comparePrice: 99.99,
    sku: 'LAMP-001',
    categoryId: 'cat4',
    images: [{ id: '5', productId: '5', url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop', alt: 'Lamp', position: 0 }],
    variants: [],
    tags: ['home', 'lighting'],
    rating: 4.4,
    reviewCount: 45,
    stock: 56,
    lowStockThreshold: 10,
    isActive: true,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Portable Bluetooth Speaker',
    slug: 'bluetooth-speaker',
    description: 'Waterproof speaker with 24h battery life',
    price: 129.99,
    comparePrice: 169.99,
    sku: 'SPEAKER-001',
    categoryId: 'cat1',
    images: [{ id: '6', productId: '6', url: 'https://images.unsplash.com/photo-1589003077984-894f6b6e075a?w=400&h=400&fit=crop', alt: 'Speaker', position: 0 }],
    variants: [],
    tags: ['electronics', 'audio'],
    rating: 4.3,
    reviewCount: 198,
    stock: 89,
    lowStockThreshold: 15,
    isActive: true,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Premium Yoga Mat',
    slug: 'yoga-mat',
    description: 'Non-slip eco-friendly yoga mat',
    price: 49.99,
    sku: 'YOGA-001',
    categoryId: 'cat5',
    images: [{ id: '7', productId: '7', url: 'https://images.unsplash.com/photo-1601925260368-ae2f66cf2b30?w=400&h=400&fit=crop', alt: 'Yoga Mat', position: 0 }],
    variants: [],
    tags: ['sports', 'fitness'],
    rating: 4.9,
    reviewCount: 312,
    stock: 200,
    lowStockThreshold: 30,
    isActive: true,
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Vintage Denim Jacket',
    slug: 'vintage-denim-jacket',
    description: 'Classic style denim jacket',
    price: 89.99,
    comparePrice: 129.99,
    sku: 'JACKET-001',
    categoryId: 'cat2',
    images: [{ id: '8', productId: '8', url: 'https://images.unsplash.com/photo-1551028719-00167ee16e84?w=400&h=400&fit=crop', alt: 'Jacket', position: 0 }],
    variants: [],
    tags: ['fashion', 'outerwear'],
    rating: 4.5,
    reviewCount: 87,
    stock: 67,
    lowStockThreshold: 15,
    isActive: true,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const categories = [
  { value: 'cat1', label: 'Electronics' },
  { value: 'cat2', label: 'Fashion' },
  { value: 'cat3', label: 'Accessories' },
  { value: 'cat4', label: 'Home & Living' },
  { value: 'cat5', label: 'Sports & Outdoors' },
];

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'bestseller', label: 'Best Sellers' },
];

export const ShopPage: React.FC = () => {
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: [],
    minPrice: 0,
    maxPrice: 500,
    rating: 0,
    sortBy: 'newest',
    page: 1,
    limit: 12,
  });
  const [showFilters, setShowFilters] = useState(false);

  // Filter products
  let filteredProducts = [...allProducts];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
    );
  }

  if (filters.category && filters.category.length > 0) {
    filteredProducts = filteredProducts.filter((p) =>
      filters.category!.includes(p.categoryId)
    );
  }

  if (filters.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter((p) => p.price >= (filters.minPrice || 0));
  }

  if (filters.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter((p) => p.price <= (filters.maxPrice || 1000));
  }

  if (filters.rating) {
    filteredProducts = filteredProducts.filter((p) => p.rating >= (filters.rating || 0));
  }

  // Sort products
  switch (filters.sortBy) {
    case 'price-asc':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'bestseller':
      filteredProducts.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
      break;
    default:
      filteredProducts.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }

  // Pagination
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / (filters.limit || 12));
  const currentPage = filters.page || 1;
  const startIndex = (currentPage - 1) * (filters.limit || 12);
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + (filters.limit || 12)
  );

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: [],
      minPrice: 0,
      maxPrice: 500,
      rating: 0,
      sortBy: 'newest',
      page: 1,
      limit: 12,
    });
  };

  const hasActiveFilters =
    filters.search ||
    (filters.category && filters.category.length > 0) ||
    filters.rating ||
    filters.sortBy !== 'newest';

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950">
      {/* Header */}
      <div className="bg-white border-b border-secondary-200 dark:bg-secondary-900 dark:border-secondary-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">
            Shop All Products
          </h1>
          <p className="mt-2 text-secondary-500 dark:text-secondary-400">
            {totalProducts} products found
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden w-64 flex-shrink-0 lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div>
                <h3 className="text-sm font-semibold text-secondary-900 dark:text-white mb-3">
                  Search
                </h3>
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, search: e.target.value, page: 1 }))
                  }
                />
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-secondary-900 dark:text-white mb-3">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Checkbox
                      key={category.value}
                      label={category.label}
                      checked={filters.category?.includes(category.value)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setFilters((prev) => ({
                          ...prev,
                          category: checked
                            ? [...(prev.category || []), category.value]
                            : (prev.category || []).filter((c) => c !== category.value),
                          page: 1,
                        }));
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-semibold text-secondary-900 dark:text-white mb-3">
                  Price Range
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          minPrice: Number(e.target.value),
                          page: 1,
                        }))
                      }
                    />
                    <span className="text-secondary-400">-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          maxPrice: Number(e.target.value),
                          page: 1,
                        }))
                      }
                    />
                  </div>
                  <p className="text-sm text-secondary-500">
                    {formatPrice(filters.minPrice || 0)} - {formatPrice(filters.maxPrice || 1000)}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="text-sm font-semibold text-secondary-900 dark:text-white mb-3">
                  Rating
                </h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          rating: prev.rating === rating ? 0 : rating,
                          page: 1,
                        }))
                      }
                      className={cn(
                        'flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors',
                        filters.rating === rating
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                          : 'hover:bg-secondary-100 dark:hover:bg-secondary-800'
                      )}
                    >
                      <Rating value={rating} size="sm" showValue={false} />
                      <span className="text-secondary-500">& Up</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters} className="w-full">
                  Clear All Filters
                </Button>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              {/* Mobile Filter Button */}
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setShowFilters(true)}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-2 rounded-full bg-primary-600 px-2 py-0.5 text-xs text-white">
                    {(filters.category?.length || 0) + (filters.rating ? 1 : 0) + (filters.search ? 1 : 0)}
                  </span>
                )}
              </Button>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-secondary-500 dark:text-secondary-400">Sort by:</span>
                <Select
                  options={sortOptions}
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, sortBy: e.target.value as ProductFilters['sortBy'] }))
                  }
                  className="w-40"
                />
              </div>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length === 0 ? (
              <div className="rounded-2xl bg-white py-12 text-center dark:bg-secondary-900">
                <p className="text-lg font-medium text-secondary-900 dark:text-white">
                  No products found
                </p>
                <p className="mt-2 text-secondary-500">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <Button variant="primary" onClick={clearFilters} className="mt-4">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowFilters(false)}
          />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white p-6 dark:bg-secondary-900">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
                Filters
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-6">
              {/* Search */}
              <div>
                <h3 className="text-sm font-semibold text-secondary-900 dark:text-white mb-3">
                  Search
                </h3>
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, search: e.target.value, page: 1 }))
                  }
                />
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-secondary-900 dark:text-white mb-3">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Checkbox
                      key={category.value}
                      label={category.label}
                      checked={filters.category?.includes(category.value)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setFilters((prev) => ({
                          ...prev,
                          category: checked
                            ? [...(prev.category || []), category.value]
                            : (prev.category || []).filter((c) => c !== category.value),
                          page: 1,
                        }));
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="text-sm font-semibold text-secondary-900 dark:text-white mb-3">
                  Rating
                </h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          rating: prev.rating === rating ? 0 : rating,
                          page: 1,
                        }))
                      }
                      className={cn(
                        'flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors',
                        filters.rating === rating
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                          : 'hover:bg-secondary-100 dark:hover:bg-secondary-800'
                      )}
                    >
                      <Rating value={rating} size="sm" showValue={false} />
                      <span className="text-secondary-500">& Up</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={clearFilters} className="flex-1">
                  Clear
                </Button>
                <Button variant="primary" onClick={() => setShowFilters(false)} className="flex-1">
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
