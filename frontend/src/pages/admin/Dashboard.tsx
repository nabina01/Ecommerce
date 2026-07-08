import React from 'react';
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

export default function Dashboard() {
  const stats: StatCard[] = [
    {
      title: 'Total Products',
      value: '150',
      icon: <Package size={24} />,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Orders',
      value: '342',
      icon: <ShoppingCart size={24} />,
      color: 'bg-green-500',
    },
    {
      title: 'Total Users',
      value: '89',
      icon: <Users size={24} />,
      color: 'bg-purple-500',
    },
    {
      title: 'Revenue',
      value: '$28,450',
      icon: <TrendingUp size={24} />,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm text-gray-700">ORD-{1000 + i}</td>
                  <td className="px-6 py-3 text-sm text-gray-700">Customer {i}</td>
                  <td className="px-6 py-3 text-sm text-gray-700">${500 * i}</td>
                  <td className="px-6 py-3 text-sm">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Delivered
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
