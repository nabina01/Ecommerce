import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store';
import { Card } from '../../components/ui';
import { User, Package, MapPin, Heart, Settings } from 'lucide-react';

// Account Overview
const AccountOverview: React.FC = () => {
  const { user } = useAuthStore();
  return (
    <div>
      <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">Account Overview</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card padding="md">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <User className="h-8 w-8 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-secondary-900 dark:text-white">{user?.name || 'Guest User'}</h3>
              <p className="text-secondary-500">{user?.email || 'guest@example.com'}</p>
            </div>
          </div>
        </Card>
        <Card padding="md">
          <Package className="h-8 w-8 text-primary-600 mb-4" />
          <h3 className="font-semibold text-secondary-900 dark:text-white">Recent Orders</h3>
          <p className="text-secondary-500 mt-1">You have 3 active orders</p>
        </Card>
      </div>
    </div>
  );
};

// Orders Page
const OrdersPage: React.FC = () => {
  const mockOrders = [
    { id: 'ORD-001', date: '2024-01-15', total: 299.99, status: 'delivered', items: 2 },
    { id: 'ORD-002', date: '2024-01-10', total: 149.99, status: 'shipped', items: 1 },
    { id: 'ORD-003', date: '2024-01-05', total: 89.99, status: 'processing', items: 3 },
  ];

  const statusColors: Record<string, string> = {
    delivered: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    shipped: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    processing: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">My Orders</h2>
      <div className="mt-6 space-y-4">
        {mockOrders.map((order) => (
          <Card key={order.id} padding="md">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-semibold text-secondary-900 dark:text-white">{order.id}</p>
                <p className="text-sm text-secondary-500">{order.date} • {order.items} items</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
                <span className="font-semibold text-secondary-900 dark:text-white">${order.total}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Addresses Page
const AddressesPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">Addresses</h2>
      <Card padding="md" className="mt-6">
        <p className="text-secondary-500">No saved addresses yet.</p>
      </Card>
    </div>
  );
};

// Settings Page
const SettingsPage: React.FC = () => {
  const { user } = useAuthStore();
  return (
    <div>
      <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">Account Settings</h2>
      <Card padding="md" className="mt-6 space-y-4">
        <p className="text-secondary-600 dark:text-secondary-400">Name: {user?.name || 'Guest User'}</p>
        <p className="text-secondary-600 dark:text-secondary-400">Email: {user?.email || 'guest@example.com'}</p>
      </Card>
    </div>
  );
};

const navItems = [
  { to: '/account', icon: User, label: 'Overview', end: true },
  { to: '/account/orders', icon: Package, label: 'Orders' },
  { to: '/account/addresses', icon: MapPin, label: 'Addresses' },
  { to: '/account/wishlist', icon: Heart, label: 'Wishlist' },
  { to: '/account/settings', icon: Settings, label: 'Settings' },
];

export const AccountPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 flex items-center justify-center">
        <Card className="text-center py-16 px-6">
          <User className="mx-auto h-16 w-16 text-secondary-300" />
          <h2 className="mt-6 text-xl font-semibold text-secondary-900 dark:text-white">
            Please Log In
          </h2>
          <p className="mt-2 text-secondary-500">
            You need to be logged in to view your account.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950">
      {/* Header */}
      <div className="bg-white border-b border-secondary-200 dark:bg-secondary-900 dark:border-secondary-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">My Account</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3 mb-8 lg:mb-0">
            <Card padding="md">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                        isActive
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                          : 'text-secondary-600 hover:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-secondary-800'
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </Card>
          </aside>

          {/* Content */}
          <div className="lg:col-span-9">
            <Routes>
              <Route index element={<AccountOverview />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="addresses" element={<AddressesPage />} />
              <Route path="wishlist" element={<div className="text-center py-8">Wishlist content</div>} />
              <Route path="settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};
