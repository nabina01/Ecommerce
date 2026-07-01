import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatPrice, calculateDiscount, cn } from '../lib/utils';
import { useCartStore, useWishlistStore } from '../store';
import { Button, Rating, Badge, QuantityPicker, Card } from '../components/ui';
import { Heart, ShoppingBag, Truck, Shield, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product, ProductVariant, Review } from '../types';

// Mock product data
const mockProduct: Product = {
  id: '1',
  name: 'Wireless Noise-Canceling Headphones Pro',
  slug: 'wireless-headphones-pro',
  description: `Experience premium audio with our latest wireless headphones featuring advanced active noise cancellation technology. Enjoy crystal-clear sound quality, deep bass, and immersive listening experience for up to 30 hours on a single charge.

Features:
- Active Noise Cancellation (ANC)
- 30-hour battery life
- Premium driver units for exceptional sound
- Comfortable memory foam ear cushions
- Foldable design for easy storage
- Multi-device connectivity
- Touch controls and voice assistant support
- Premium carry case included`,
  shortDescription: 'Premium wireless headphones with advanced ANC',
  price: 299.99,
  comparePrice: 399.99,
  sku: 'WH-PRO-001',
  categoryId: 'cat1',
  category: { id: 'cat1', name: 'Electronics', slug: 'electronics', isActive: true, displayOrder: 1, createdAt: new Date().toISOString() },
  images: [
    { id: '1', productId: '1', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop', alt: 'Main view', position: 0 },
    { id: '2', productId: '1', url: 'https://images.unsplash.com/photo-1583394838339-ac3714e4b21b?w=800&h=800&fit=crop', alt: 'Side view', position: 1 },
    { id: '3', productId: '1', url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=800&fit=crop', alt: 'Detail view', position: 2 },
    { id: '4', productId: '1', url: 'https://images.unsplash.com/photo-1484704706887-5b1c3e5d6e7c?w=800&h=800&fit=crop', alt: 'With case', position: 3 },
  ],
  variants: [
    { id: 'v1', productId: '1', sku: 'WH-PRO-BLK', name: 'Matte Black', color: 'Black', price: 299.99, stock: 45 },
    { id: 'v2', productId: '1', sku: 'WH-PRO-SLV', name: 'Silver', color: 'Silver', price: 299.99, stock: 32 },
    { id: 'v3', productId: '1', sku: 'WH-PRO-GLD', name: 'Rose Gold', color: 'Rose Gold', price: 329.99, stock: 18 },
  ],
  tags: ['electronics', 'audio', 'wireless', 'headphones'],
  rating: 4.7,
  reviewCount: 328,
  stock: 95,
  lowStockThreshold: 20,
  isActive: true,
  isFeatured: true,
  isNewArrival: true,
  isBestSeller: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockReviews: Review[] = [
  { id: 'r1', userId: 'u1', user: { id: 'u1', name: 'Alex M.', email: '', role: 'user', emailVerified: true, createdAt: '', updatedAt: '' }, productId: '1', rating: 5, title: 'Best headphones ever!', comment: 'Amazing sound quality and the noise cancellation is incredible. Worth every penny!', isVerifiedPurchase: true, isActive: true, createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'r2', userId: 'u2', user: { id: 'u2', name: 'Sarah K.', email: '', role: 'user', emailVerified: true, createdAt: '', updatedAt: '' }, productId: '1', rating: 4, title: 'Great but pricey', comment: 'Sound quality is excellent. Very comfortable for long listening sessions. Battery life is as advertised.', isVerifiedPurchase: true, isActive: true, createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'r3', userId: 'u3', user: { id: 'u3', name: 'John D.', email: '', role: 'user', emailVerified: true, createdAt: '', updatedAt: '' }, productId: '1', rating: 5, title: 'Perfect for work from home', comment: 'The ANC helps me focus in my noisy apartment. Highly recommend for remote workers!', isVerifiedPurchase: true, isActive: true, createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() },
];

const relatedProducts: Product[] = [
  { id: '2', name: 'Portable Bluetooth Speaker', slug: 'bluetooth-speaker', description: '', price: 79.99, comparePrice: 99.99, sku: 'SPK-001', categoryId: 'cat1', images: [{ id: 'img2', productId: '2', url: 'https://images.unsplash.com/photo-1589003077984-894f6b6e075a?w=400&h=400&fit=crop', alt: '', position: 0 }], variants: [], tags: [], rating: 4.5, reviewCount: 156, stock: 89, lowStockThreshold: 10, isActive: true, isFeatured: false, isNewArrival: false, isBestSeller: true, createdAt: '', updatedAt: '' },
  { id: '3', name: 'Wireless Earbuds', slug: 'wireless-earbuds', description: '', price: 149.99, sku: 'EB-001', categoryId: 'cat1', images: [{ id: 'img3', productId: '3', url: 'https://images.unsplash.com/photo-1590658295291-5250a8f5f6db?w=400&h=400&fit=crop', alt: '', position: 0 }], variants: [], tags: [], rating: 4.6, reviewCount: 234, stock: 167, lowStockThreshold: 20, isActive: true, isFeatured: true, isNewArrival: true, isBestSeller: false, createdAt: '', updatedAt: '' },
  { id: '4', name: 'Smart Watch Ultra', slug: 'smart-watch-ultra', description: '', price: 449.99, comparePrice: 549.99, sku: 'SW-002', categoryId: 'cat1', images: [{ id: 'img4', productId: '4', url: 'https://images.unsplash.com/photo-1546869063-59555f77b8b4?w=400&h=400&fit=crop', alt: '', position: 0 }], variants: [], tags: [], rating: 4.8, reviewCount: 89, stock: 45, lowStockThreshold: 10, isActive: true, isFeatured: true, isNewArrival: true, isBestSeller: false, createdAt: '', updatedAt: '' },
];

export const ProductDetailPage: React.FC = () => {
  const { slug: _slug } = useParams<{ slug: string }>();
  const [selectedColor, setSelectedColor] = useState<ProductVariant>(mockProduct.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(mockProduct.id);

  const discountPercentage = calculateDiscount(mockProduct.price, mockProduct.comparePrice ?? 0);

  const handleAddToCart = () => {
    addItem(mockProduct, selectedColor, quantity);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % mockProduct.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + mockProduct.images.length) % mockProduct.images.length);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-secondary-950 pb-16">
      {/* Breadcrumb */}
      <div className="bg-secondary-50 dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-secondary-500">
            <Link to="/" className="hover:text-primary-600">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-primary-600">Shop</Link>
            <span>/</span>
            <Link to={`/category/${mockProduct.category?.slug}`} className="hover:text-primary-600">
              {mockProduct.category?.name}
            </Link>
            <span>/</span>
            <span className="text-secondary-900 dark:text-white">{mockProduct.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
          {/* Image Gallery */}
          <div className="mb-8 lg:mb-0">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary-100 dark:bg-secondary-800">
              <img
                src={mockProduct.images[currentImage].url}
                alt={mockProduct.name}
                className="h-full w-full object-cover"
              />
              {discountPercentage > 0 && (
                <Badge variant="error" className="absolute left-4 top-4" size="lg">
                  -{discountPercentage}% OFF
                </Badge>
              )}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white dark:bg-secondary-900/80 dark:hover:bg-secondary-900"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white dark:bg-secondary-900/80 dark:hover:bg-secondary-900"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {mockProduct.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentImage(index)}
                  className={cn(
                    'h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                    currentImage === index
                      ? 'border-primary-600 ring-2 ring-primary-600/20'
                      : 'border-transparent hover:border-secondary-300'
                  )}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:pt-4">
            {/* Category & Title */}
            {mockProduct.category && (
              <Link
                to={`/category/${mockProduct.category.slug}`}
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                {mockProduct.category.name}
              </Link>
            )}
            <h1 className="mt-2 text-3xl font-bold text-secondary-900 dark:text-white lg:text-4xl">
              {mockProduct.name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-4">
              <Rating value={mockProduct.rating} size="lg" />
              <span className="text-secondary-500">({mockProduct.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-secondary-900 dark:text-white">
                {formatPrice(mockProduct.price)}
              </span>
              {mockProduct.comparePrice && (
                <span className="text-xl text-secondary-400 line-through">
                  {formatPrice(mockProduct.comparePrice)}
                </span>
              )}
              {discountPercentage > 0 && (
                <Badge variant="success">Save {discountPercentage}%</Badge>
              )}
            </div>

            {/* Short Description */}
            <p className="mt-4 text-secondary-600 dark:text-secondary-400">
              {mockProduct.shortDescription}
            </p>

            {/* Color Selection */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-secondary-900 dark:text-white">Color</h3>
              <div className="mt-3 flex gap-3">
                {mockProduct.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedColor(variant)}
                    className={cn(
                      'relative h-10 w-10 rounded-full border-2 transition-all',
                      selectedColor.id === variant.id
                        ? 'border-primary-600 ring-2 ring-primary-600/20'
                        : 'border-secondary-200 hover:border-secondary-300 dark:border-secondary-600 dark:hover:border-secondary-500'
                    )}
                    title={variant.name}
                  >
                    <span
                      className="absolute inset-1 rounded-full"
                      style={{
                        backgroundColor: variant.color?.toLowerCase() === 'black' ? '#000' :
                          variant.color?.toLowerCase() === 'silver' ? '#C0C0C0' :
                          variant.color?.toLowerCase() === 'rose gold' ? '#B76E79' :
                          variant.color?.toLowerCase() || '#ccc',
                      }}
                    />
                  </button>
                ))}
              </div>
              <p className="mt-2 text-sm text-secondary-500">Selected: {selectedColor.name}</p>
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-secondary-900 dark:text-white mb-3">Quantity</h3>
              <QuantityPicker
                value={quantity}
                min={1}
                max={selectedColor.stock}
                onChange={setQuantity}
              />
              <p className="mt-2 text-sm text-secondary-500">
                {selectedColor.stock > 20 ? 'In Stock' : `Only ${selectedColor.stock} left`}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-4">
              <Button variant="primary" size="lg" className="flex-1" onClick={handleAddToCart}>
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant={isWishlisted ? 'danger' : 'outline'}
                size="lg"
                onClick={() => isWishlisted ? removeFromWishlist(mockProduct.id) : addToWishlist(mockProduct.id)}
              >
                <Heart className={cn('h-5 w-5', isWishlisted && 'fill-current')} />
              </Button>
            </div>

            {/* Features */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-lg bg-secondary-50 p-4 dark:bg-secondary-800/50">
                <Truck className="h-6 w-6 text-primary-600" />
                <div>
                  <p className="font-medium text-secondary-900 dark:text-white">Free Shipping</p>
                  <p className="text-sm text-secondary-500">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-secondary-50 p-4 dark:bg-secondary-800/50">
                <RefreshCw className="h-6 w-6 text-primary-600" />
                <div>
                  <p className="font-medium text-secondary-900 dark:text-white">Easy Returns</p>
                  <p className="text-sm text-secondary-500">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-secondary-50 p-4 dark:bg-secondary-800/50">
                <Shield className="h-6 w-6 text-primary-600" />
                <div>
                  <p className="font-medium text-secondary-900 dark:text-white">Warranty</p>
                  <p className="text-sm text-secondary-500">2-year warranty</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-secondary-50 p-4 dark:bg-secondary-800/50">
                <Shield className="h-6 w-6 text-primary-600" />
                <div>
                  <p className="font-medium text-secondary-900 dark:text-white">Secure Payment</p>
                  <p className="text-sm text-secondary-500">100% secure checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-secondary-200 dark:border-secondary-700">
            <nav className="flex gap-8">
              <button className="border-b-2 border-primary-600 py-4 text-sm font-medium text-primary-600">
                Description
              </button>
              <button className="border-b-2 border-transparent py-4 text-sm font-medium text-secondary-500 hover:text-secondary-700">
                Specifications
              </button>
              <button className="border-b-2 border-transparent py-4 text-sm font-medium text-secondary-500 hover:text-secondary-700">
                Reviews ({mockProduct.reviewCount})
              </button>
            </nav>
          </div>
          <div className="py-8">
            <div className="prose prose-secondary max-w-none dark:prose-invert">
              {mockProduct.description.split('\n\n').map((para, idx) => (
                <p key={idx} className="text-secondary-600 dark:text-secondary-400 whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-8">
            Customer Reviews
          </h2>
          <div className="space-y-6">
            {mockReviews.map((review) => (
              <Card key={review.id} padding="md">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-secondary-900 dark:text-white">
                      {review.user?.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      <Rating value={review.rating} size="sm" showValue={false} />
                      <span className="text-sm text-secondary-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                      {review.isVerifiedPurchase && (
                        <Badge variant="success" size="sm">Verified Purchase</Badge>
                      )}
                    </div>
                  </div>
                </div>
                {review.title && (
                  <h4 className="mt-3 font-semibold text-secondary-900 dark:text-white">
                    {review.title}
                  </h4>
                )}
                <p className="mt-2 text-secondary-600 dark:text-secondary-400">
                  {review.comment}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
            Related Products
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((product) => (
              <Card key={product.id} variant="hover" className="overflow-hidden p-0">
                <Link to={`/product/${product.slug}`} className="block">
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="aspect-square w-full object-cover"
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.slug}`}>
                    <h3 className="font-semibold text-secondary-900 dark:text-white hover:text-primary-600 line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-secondary-900 dark:text-white">
                      {formatPrice(product.price)}
                    </span>
                    <Rating value={product.rating} size="sm" showValue={false} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
