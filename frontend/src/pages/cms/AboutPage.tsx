import React from 'react';
import { Card } from '../../components/ui';
import { Users, Target, Heart, Award, TrendingUp, Globe } from 'lucide-react';

const features = [
  { icon: Users, title: '50K+', description: 'Happy Customers' },
  { icon: Target, title: '10K+', description: 'Products Available' },
  { icon: Globe, title: '100+', description: 'Countries Served' },
  { icon: Award, title: '4.8', description: 'Average Rating' },
];

const values = [
  { icon: Heart, title: 'Customer First', description: 'Every decision we make starts with our customers in mind.' },
  { icon: Award, title: 'Quality Focus', description: 'We curate only the best products for our customers.' },
  { icon: TrendingUp, title: 'Constant Innovation', description: 'We never stop improving our platform and services.' },
];

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-secondary-950">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="absolute inset-0 bg-[size:20px_20px] bg-grid-white/10 opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">About ShopHub</h1>
          <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
            We're on a mission to make shopping accessible, enjoyable, and trustworthy
            for everyone, everywhere.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <feature.icon className="h-10 w-10 mx-auto text-primary-600" />
                <p className="mt-4 text-3xl font-bold text-secondary-900 dark:text-white">{feature.title}</p>
                <p className="text-secondary-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white">Our Story</h2>
            <p className="mt-6 text-secondary-600 dark:text-secondary-400 leading-relaxed">
              Founded in 2020, ShopHub began with a simple mission: to provide customers with
              access to high-quality products at unbeatable prices. What started as a small
              online store has grown into a thriving e-commerce platform serving thousands
              of customers worldwide.
            </p>
            <p className="mt-4 text-secondary-600 dark:text-secondary-400 leading-relaxed">
              We believe that shopping online should be easy, enjoyable, and trustworthy.
              That's why we've built ShopHub with the customer in mind, focusing on quality,
              selection, and convenience. Today, we're proud to offer a wide range of products
              from trusted brands, all delivered with exceptional customer service.
            </p>
          </div>
          <div className="mt-10 lg:mt-0">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4376d25?w=600&h=400&fit=crop"
              alt="Team"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-secondary-50 dark:bg-secondary-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white">Our Values</h2>
            <p className="mt-4 text-secondary-500 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <Card key={value.title} variant="bordered" padding="lg" className="text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-secondary-900 dark:text-white">{value.title}</h3>
                <p className="mt-3 text-secondary-500">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900 dark:text-white">Meet Our Team</h2>
          <p className="mt-4 text-secondary-500">
            The passionate people behind ShopHub
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Sarah Johnson', 'Mike Chen', 'Emily Davis', 'Alex Kumar'].map((name, i) => (
            <Card key={name} variant="bordered" padding="md" className="text-center">
              <div className="h-24 w-24 mx-auto rounded-full bg-secondary-200 dark:bg-secondary-700" />
              <h3 className="mt-4 font-semibold text-secondary-900 dark:text-white">{name}</h3>
              <p className="text-sm text-secondary-500">{['CEO', 'CTO', 'CMO', 'COO'][i]}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
