import React from 'react';
import { Link, Routes, Route, NavLink } from 'react-router-dom';
import { Card } from '../../components/ui';
import { LayoutDashboard, Package, Users, Settings, ShoppingCart, DollarSign } from 'lucide-react';

// Dashboard Overview
const DashboardOverview: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">Dashboard Overview</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card padding="md" className="bg-gradient-to-br from-primary-500 to-primary-600 text-white">
          <DollarSign className="h-8 w-8 mb-4" />
          <p className="text-sm opacity-80">Total Revenue</p>
          <p className="text-3xl font-bold">$45,231.89</p>
          <p className="text-xs mt-2 opacity-80">+12.5% from last month</p>
        </Card>
        <Card padding="md">
          <ShoppingCart className="h-8 w-8 text-primary-600 mb-4" />
          <p className="text-sm text-secondary-500">Total Orders</p>
          <p className="text-3xl font-bold text-secondary-900 dark:text-white">1,856</p>
          <p className="text-xs text-green-600 mt-2">+8.2% from last month</p>
        </Card>
        <Card padding="md">
          <Users className="h-8 w-8 text-primary-600 mb-4" />
          <p className="text-sm text-secondary-500">Total Customers</p>
          <p className="text-3xl font-bold text-secondary-900 dark:text-white">3,462</p>
          <p className="text-xs text-green-600 mt-2">+5.7% from last month</p>
        </Card>
        <Card padding="md">
          <Package className="h-8 w-8 text-amber-500 mb-4" />
          <p className="text-sm text-secondary-500">Low Stock</p>
          <p className="text-3xl font-bold text-secondary-900 dark:text-white">23</p>
          <p className="text-xs text-amber-600 mt-2">Products need restock</p>
        </Card>
      </div>

      {/* Chart placeholder */}
      <Card padding="md" className="mb-8">
        <h3 className="font-semibold text-secondary-900 dark:text-white mb-4">Sales Overview</h3>
        <div className="h-64 bg-secondary-50 dark:bg-secondary-800 rounded-lg flex items-center justify-center">
          <p className="text-secondary-500">Sales chart will be rendered here</p>
        </div>
      </Card>

      {/* Recent orders */}
      <Card padding="md">
        <h3 className="font-semibold text-secondary-900 dark:text-white mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-secondary-200 dark:border-secondary-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">Order</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">Status</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-secondary-500">Total</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'ORD-1234', customer: 'John Doe', status: 'delivered', total: '$299.99' },
                { id: 'ORD-1235', customer: 'Jane Smith', status: 'shipped', total: '$149.99' },
                { id: 'ORD-1236', customer: 'Bob Wilson', status: 'processing', total: '$89.99' },
              ].map((order) => (
                <tr key={order.id} className="border-b border-secondary-100 dark:border-secondary-800">
                  <td className="py-3 px-4 text-secondary-900 dark:text-white">{order.id}</td>
                  <td className="py-3 px-4 text-secondary-600 dark:text-secondary-400">{order.customer}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>{order.status}</span>
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-secondary-900 dark:text-white">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Products Management
const ProductsManagement: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">Products</h2>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700">
          Add Product
        </button>
      </div>
      <Card padding="md">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-secondary-200 dark:border-secondary-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">Product</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">Category</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">Stock</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-secondary-500">Price</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-secondary-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Wireless Headphones', category: 'Electronics', stock: 45, price: '$299.99' },
                { name: 'Smart Watch Pro', category: 'Electronics', stock: 23, price: '$349.99' },
                { name: 'Classic Sneakers', category: 'Fashion', stock: 120, price: '$89.99' },
              ].map((product, i) => (
                <tr key={i} className="border-b border-secondary-100 dark:border-secondary-800">
                  <td className="py-3 px-4 text-secondary-900 dark:text-white">{product.name}</td>
                  <td className="py-3 px-4 text-secondary-600 dark:text-secondary-400">{product.category}</td>
                  <td className="py-3 px-4 text-secondary-600 dark:text-secondary-400">{product.stock}</td>
                  <td className="py-3 px-4 text-right font-medium text-secondary-900 dark:text-white">{product.price}</td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-primary-600 hover:text-primary-700 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Orders Management
const OrdersManagement: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">Orders</h2>
      <Card padding="md">
        <p className="text-secondary-500">Orders management interface</p>
      </Card>
    </div>
  );
};

// Customers
const CustomersManagement: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">Customers</h2>
      <Card padding="md">
        <p className="text-secondary-500">Customers management interface</p>
      </Card>
    </div>
  );
};

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/products', icon: Package, label: 'Products' },
  { to: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  { to: '/admin/customers', icon: Users, label: 'Customers' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

export const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-secondary-100 dark:bg-secondary-950">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-secondary-900 min-h-screen border-r border-secondary-200 dark:border-secondary-800 p-4">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
            ShopHub
          </Link>
          <p className="text-xs text-secondary-500 mt-1 mb-6">Admin Dashboard</p>

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
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Routes>
            <Route index element={<DashboardOverview />} />
            <Route path="products" element={<ProductsManagement />} />
            <Route path="orders" element={<OrdersManagement />} />
            <Route path="customers" element={<CustomersManagement />} />
            <Route path="settings" element={
              <div>
                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">Settings</h2>
                <Card padding="md">
                  <p className="text-secondary-500">Store settings interface</p>
                </Card>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </div>
  );
};
