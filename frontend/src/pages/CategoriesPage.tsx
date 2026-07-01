import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui';
import { ArrowRight } from 'lucide-react';

const categories = [
  { id: '1', name: 'Electronics', slug: 'electronics', description: 'Gadgets, audio, and tech accessories', image: 'https://images.unsplash.com/photo-1498049794561-9780e570acc3?w=600&h=400&fit=crop', count: 245 },
  { id: '2', name: 'Fashion', slug: 'fashion', description: 'Clothing, shoes, and accessories', image: 'https://images.unsplash.com/photo-1445205170120-bae590dc8a9a?w=600&h=400&fit=crop', count: 567 },
  { id: '3', name: 'Home & Living', slug: 'home-living', description: 'Furniture, decor, and lifestyle', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop', count: 189 },
  { id: '4', name: 'Sports & Outdoors', slug: 'sports', description: 'Sports gear and outdoor equipment', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop', count: 312 },
  { id: '5', name: 'Beauty & Personal Care', slug: 'beauty', description: 'Skincare, makeup, and grooming', image: 'https://images.unsplash.com/photo-1596462502278-4bfd2c9b915b?w=600&h=400&fit=crop', count: 423 },
  { id: '6', name: 'Books & Stationery', slug: 'books', description: 'Books, journals, and office supplies', image: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=600&h=400&fit=crop', count: 156 },
];

export const CategoriesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950">
      {/* Header */}
      <div className="bg-white border-b border-secondary-200 dark:bg-secondary-900 dark:border-secondary-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-bold text-secondary-900 dark:text-white">
            Shop by Category
          </h1>
          <p className="mt-4 text-lg text-secondary-500 max-w-2xl mx-auto">
            Browse our curated collections to find exactly what you're looking for
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={`/shop?category=${category.slug}`}>
              <Card variant="hover" className="overflow-hidden p-0 group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold">{category.name}</h3>
                    <p className="mt-1 text-sm text-white/80">{category.description}</p>
                    <div className="mt-3 flex items-center text-sm font-medium text-white/90 group-hover:text-white">
                      <span>{category.count} products</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
