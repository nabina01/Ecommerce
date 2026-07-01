import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../store';
import { ProductCard } from '../components/products/ProductCard';
import { Button } from '../components/ui';
import { Heart, ShoppingBag } from 'lucide-react';

// Mock products for wishlist
const mockProducts = [
  { id: '1', name: 'Wireless Headphones', slug: 'wireless-headphones', description: '', price: 299.99, comparePrice: 399.99, sku: 'WH-001', categoryId: 'cat1', images: [{ id: '1', productId: '1', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', alt: '', position: 0 }], variants: [], tags: [], rating: 4.5, reviewCount: 128, stock: 45, lowStockThreshold: 10, isActive: true, isFeatured: true, isNewArrival: true, isBestSeller: false, createdAt: '', updatedAt: '' },
  { id: '2', name: 'Smart Watch Pro', slug: 'smart-watch-pro', description: '', price: 349.99, comparePrice: 449.99, sku: 'SW-001', categoryId: 'cat1', images: [{ id: '2', productId: '2', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', alt: '', position: 0 }], variants: [], tags: [], rating: 4.7, reviewCount: 89, stock: 34, lowStockThreshold: 10, isActive: true, isFeatured: true, isNewArrival: true, isBestSeller: false, createdAt: '', updatedAt: '' },
  { id: '3', name: 'Leather Crossbody Bag', slug: 'leather-bag', description: '', price: 159.99, sku: 'BAG-001', categoryId: 'cat3', images: [{ id: '3', productId: '3', url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop', alt: '', position: 0 }], variants: [], tags: [], rating: 4.6, reviewCount: 67, stock: 78, lowStockThreshold: 15, isActive: true, isFeatured: true, isNewArrival: false, isBestSeller: true, createdAt: '', updatedAt: '' },
];

export const WishlistPage: React.FC = () => {
  const { items, removeFromWishlist } = useWishlistStore();

  // Get wishlist products (in real app, fetch from backend)
  const wishlistProducts = mockProducts.filter(p => items.includes(p.id));

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950">
      <div className="bg-white border-b border-secondary-200 dark:bg-secondary-900 dark:border-secondary-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-500" />
            My Wishlist
          </h1>
          <p className="mt-2 text-secondary-500">
            {items.length === 0 ? 'Your wishlist is empty' : `${items.length} item${items.length > 1 ? 's' : ''} saved`}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="mx-auto h-16 w-16 text-secondary-300" />
            <h2 className="mt-6 text-xl font-semibold text-secondary-900 dark:text-white">
              Your wishlist is empty
            </h2>
            <p className="mt-2 text-secondary-500">
              Save items you love to your wishlist.
            </p>
            <Button variant="primary" className="mt-6" asChild>
              <Link to="/shop">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Start Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {wishlistProducts.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute right-2 top-2 rounded-full bg-white p-2 shadow-md hover:bg-red-50 transition-colors z-10"
                >
                  <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
