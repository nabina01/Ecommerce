import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { formatPrice, calculateDiscount, getStockStatus } from '../../lib/utils';
import { useCartStore, useWishlistStore } from '../../store';
import { Rating } from '../ui/Rating';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Heart, ShoppingCart } from 'lucide-react';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const addItem = useCartStore((state) => state.addItem);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  const discountPercentage = product.comparePrice
    ? calculateDiscount(product.price, product.comparePrice)
    : 0;

  const stockStatus = getStockStatus(product.stock, product.lowStockThreshold);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, undefined, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const mainImage = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop';

  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1 dark:bg-secondary-900',
        className
      )}
    >
      {/* Image */}
      <Link to={`/product/${product.slug}`} className="relative aspect-square overflow-hidden">
        <img
          src={mainImage}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {discountPercentage > 0 && (
            <Badge variant="error" size="sm">
              -{discountPercentage}%
            </Badge>
          )}
          {product.isNewArrival && (
            <Badge variant="primary" size="sm">
              New
            </Badge>
          )}
          {product.isBestSeller && (
            <Badge variant="warning" size="sm">
              Best Seller
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={cn(
            'absolute right-3 top-3 rounded-full p-2 transition-all duration-200',
            isWishlisted
              ? 'bg-red-500 text-white'
              : 'bg-white/90 text-secondary-600 hover:bg-red-500 hover:text-white dark:bg-secondary-800/90 dark:text-secondary-300'
          )}
        >
          <Heart className={cn('h-4 w-4', isWishlisted && 'fill-current')} />
        </button>

        {/* Quick Add to Cart */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <div className="bg-gradient-to-t from-black/60 to-transparent p-4 pt-8">
            <Button
              variant="primary"
              size="sm"
              className="w-full"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category */}
        {product.category && (
          <Link
            to={`/category/${product.category.slug}`}
            className="text-xs font-medium text-secondary-500 hover:text-primary-600 dark:text-secondary-400"
          >
            {product.category.name}
          </Link>
        )}

        {/* Name */}
        <Link to={`/product/${product.slug}`}>
          <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-secondary-900 hover:text-primary-600 dark:text-white dark:hover:text-primary-400">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <Rating
          value={product.rating}
          size="sm"
          reviewCount={product.reviewCount}
          className="mt-2"
        />

        {/* Price */}
        <div className="mt-auto flex items-center gap-2 pt-3">
          <span className="text-lg font-bold text-secondary-900 dark:text-white">
            {formatPrice(product.price)}
          </span>
          {product.comparePrice && product.comparePrice > product.price && (
            <span className="text-sm text-secondary-400 line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mt-2">
          {stockStatus.status === 'out-of-stock' && (
            <span className={cn('text-xs font-medium', stockStatus.color)}>
              {stockStatus.label}
            </span>
          )}
          {stockStatus.status === 'low-stock' && (
            <span className={cn('text-xs font-medium', stockStatus.color)}>
              {stockStatus.label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
