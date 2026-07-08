import React, { useState } from 'react';
import { Trash2, Mail, Calendar } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  joinDate: string;
  orders: number;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      joinDate: '2025-01-15',
      orders: 5,
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'admin',
      joinDate: '2025-02-20',
      orders: 12,
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'user',
      joinDate: '2025-03-10',
      orders: 3,
    },
    {
      id: '4',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      role: 'user',
      joinDate: '2025-04-05',
      orders: 8,
    },
  ]);

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Users Management</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Users', count: users.length, color: 'bg-blue-50' },
          { label: 'Admins', count: users.filter((u) => u.role === 'admin').length, color: 'bg-purple-50' },
          { label: 'Regular Users', count: users.filter((u) => u.role === 'user').length, color: 'bg-green-50' },
        ].map((stat, index) => (
          <div key={index} className={`${stat.color} rounded-lg p-4`}>
            <p className="text-gray-600 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-800">{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Role</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Orders</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Join Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium text-gray-800">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-3 text-gray-700 flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" />
                  {user.email}
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.role === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-3 text-gray-700 font-semibold">{user.orders}</td>
                <td className="px-6 py-3 text-gray-600 text-sm flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400" />
                  {user.joinDate}
                </td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded"
                  >
                    <Trash2 size={18} />
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
