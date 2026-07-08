import React, { useState } from 'react';
import { Eye, CheckCircle, Truck, Package } from 'lucide-react';

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  date: string;
  items: number;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-1001',
      customer: 'John Doe',
      amount: 2450,
      status: 'delivered',
      date: '2025-07-01',
      items: 3,
    },
    {
      id: 'ORD-1002',
      customer: 'Jane Smith',
      amount: 1230,
      status: 'shipped',
      date: '2025-07-05',
      items: 2,
    },
    {
      id: 'ORD-1003',
      customer: 'Mike Johnson',
      amount: 890,
      status: 'confirmed',
      date: '2025-07-06',
      items: 1,
    },
    {
      id: 'ORD-1004',
      customer: 'Sarah Williams',
      amount: 3450,
      status: 'pending',
      date: '2025-07-07',
      items: 4,
    },
  ]);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
  };

  const statusIcons = {
    pending: <Package size={16} />,
    confirmed: <CheckCircle size={16} />,
    shipped: <Truck size={16} />,
    delivered: <CheckCircle size={16} />,
  };

  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Orders Management</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Pending', count: orders.filter((o) => o.status === 'pending').length, color: 'bg-yellow-50' },
          { label: 'Confirmed', count: orders.filter((o) => o.status === 'confirmed').length, color: 'bg-blue-50' },
          { label: 'Shipped', count: orders.filter((o) => o.status === 'shipped').length, color: 'bg-purple-50' },
          { label: 'Delivered', count: orders.filter((o) => o.status === 'delivered').length, color: 'bg-green-50' },
        ].map((stat, index) => (
          <div key={index} className={`${stat.color} rounded-lg p-4`}>
            <p className="text-gray-600 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-800">{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Order ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Items</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 font-semibold text-gray-800">{order.id}</td>
                <td className="px-6 py-3 text-gray-700">{order.customer}</td>
                <td className="px-6 py-3 text-gray-700">${order.amount}</td>
                <td className="px-6 py-3 text-gray-700">{order.items}</td>
                <td className="px-6 py-3">
                  <select
                    value={order.status}
                    onChange={(e) => handleUpdateStatus(order.id, e.target.value as Order['status'])}
                    className={`px-3 py-1 rounded-full text-sm font-medium border-0 cursor-pointer ${
                      statusColors[order.status]
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
                <td className="px-6 py-3 text-gray-600 text-sm">{order.date}</td>
                <td className="px-6 py-3">
                  <button className="flex items-center gap-2 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
