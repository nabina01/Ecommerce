import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/products/ProductCard';
import { ArrowRight, Truck, RefreshCw, Shield, Headphones } from 'lucide-react';
import type { Product, Category } from '../types';

// Mock data for demo
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise-Canceling Headphones',
    slug: 'wireless-headphones',
    description: 'Premium wireless headphones with active noise cancellation',
    shortDescription: 'Premium wireless headphones',
    price: 299.99,
    comparePrice: 399.99,
    sku: 'WH-001',
    categoryId: '1',
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
    shortDescription: 'Comfortable everyday sneakers',
    price: 89.99,
    comparePrice: 119.99,
    sku: 'SNEAK-001',
    categoryId: '2',
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
    shortDescription: 'Advanced smartwatch',
    price: 349.99,
    comparePrice: 449.99,
    sku: 'SW-001',
    categoryId: '1',
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
    shortDescription: 'Elegant leather bag',
    price: 159.99,
    sku: 'BAG-001',
    categoryId: '3',
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
];

const categories: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics', description: 'Gadgets and electronics', image: 'https://images.unsplash.com/photo-1498049794561-9780e570acc3?w=400&h=300&fit=crop', isActive: true, displayOrder: 1, createdAt: new Date().toISOString() },
  { id: '2', name: 'Fashion', slug: 'fashion', description: 'Clothing and accessories', image: 'https://images.unsplash.com/photo-1445205170120-bae590dc8a9a?w=400&h=300&fit=crop', isActive: true, displayOrder: 2, createdAt: new Date().toISOString() },
  { id: '3', name: 'Home & Living', slug: 'home-living', description: 'Home decor and furniture', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', isActive: true, displayOrder: 3, createdAt: new Date().toISOString() },
  { id: '4', name: 'Sports & Outdoors', slug: 'sports', description: 'Sports equipment', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', isActive: true, displayOrder: 4, createdAt: new Date().toISOString() },
];

const features = [
  { icon: Truck, title: 'Free Shipping', description: 'Free shipping on orders over $100' },
  { icon: RefreshCw, title: 'Easy Returns', description: '30-day hassle-free returns' },
  { icon: Shield, title: 'Secure Shopping', description: '100% secure payment' },
  { icon: Headphones, title: '24/7 Support', description: 'Dedicated customer support' },
];

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 dark:from-primary-900 dark:via-secondary-900 dark:to-secondary-950">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
                </span>
                New Collection 2024
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Discover Your Perfect{' '}
                <span className="bg-gradient-to-r from-accent-400 to-accent-500 bg-clip-text text-transparent">
                  Style
                </span>
              </h1>
              <p className="mt-6 text-lg text-white/80 max-w-xl mx-auto lg:mx-0">
                Explore our curated collection of premium products. From electronics to fashion,
                find everything you need at unbeatable prices.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row justify-center lg:justify-start">
                <Button size="lg" variant="accent" asChild>
                  <Link to="/shop">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary-700" asChild>
                  <Link to="/categories">Browse Categories</Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd6d55a?w=600&h=500&fit=crop"
                  alt="Hero"
                  className="rounded-3xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 z-20">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop"
                  alt="Featured"
                  className="rounded-2xl shadow-xl border-4 border-white dark:border-secondary-800"
                />
              </div>
              <div className="absolute -right-6 top-10 z-20">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop"
                  alt="Product"
                  className="rounded-xl shadow-lg border-3 border-white dark:border-secondary-800"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Decorative shapes */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary-400/20 blur-3xl" />
      </section>

      {/* Features Bar */}
      <section className="border-b border-secondary-200 bg-white dark:border-secondary-800 dark:bg-secondary-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 dark:text-white">{feature.title}</h3>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 dark:bg-secondary-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white sm:text-3xl">
                Featured Products
              </h2>
              <p className="mt-2 text-secondary-500 dark:text-secondary-400">
                Discover our hand-picked selection of trending items
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/shop">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-secondary-50 py-16 dark:bg-secondary-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-white sm:text-3xl">
              Shop by Category
            </h2>
            <p className="mt-2 text-secondary-500 dark:text-secondary-400">
              Find what you're looking for in our curated categories
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary-200 dark:bg-secondary-800"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                  <p className="text-sm text-white/80">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 dark:bg-secondary-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent-500 to-accent-600 p-8 sm:p-10">
              <h3 className="text-2xl font-bold text-white sm:text-3xl">New Arrivals</h3>
              <p className="mt-2 text-white/80">
                Check out our latest additions to the collection
              </p>
              <Button
                variant="outline"
                className="mt-6 border-white text-white hover:bg-white hover:text-accent-600"
                asChild
              >
                <Link to="/shop?filter=new">Shop New Arrivals</Link>
              </Button>
              <img
                src="https://images.unsplash.com/photo-1445205170120-bae590dc8a9a?w=300&h=300&fit=crop"
                alt="New Arrivals"
                className="absolute -bottom-10 -right-10 h-48 w-48 rotate-12 object-contain opacity-30"
              />
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-700 p-8 sm:p-10">
              <h3 className="text-2xl font-bold text-white sm:text-3xl">Best Sellers</h3>
              <p className="mt-2 text-white/80">
                See what our customers love most
              </p>
              <Button
                variant="outline"
                className="mt-6 border-white text-white hover:bg-white hover:text-primary-600"
                asChild
              >
                <Link to="/shop?filter=bestseller">Shop Best Sellers</Link>
              </Button>
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"
                alt="Best Sellers"
                className="absolute -bottom-10 -right-10 h-48 w-48 -rotate-12 object-contain opacity-30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary-600 py-16 dark:bg-primary-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Stay Updated
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-white/80">
              Subscribe to our newsletter and get 10% off your first order, plus exclusive access to new arrivals and special offers.
            </p>
            <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border-0 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <Button
                variant="accent"
                size="lg"
                className="bg-white text-primary-600 hover:bg-white/90"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
