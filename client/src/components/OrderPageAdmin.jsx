import React, { useEffect, useState } from 'react';
import SideMenu from './SideMenu';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteOrder } from '../features/adminSlice';
import { deleteAllOrders } from '../features/adminSlice';
import NavBarAdminPage from './NavBarAdminPage';
import FooterAdminPage from './FooterAdminPage';

function OrderPageAdmin() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [btnState, setBtnState] = useState('');
  const dispatch = useDispatch();
  const [deleteForm, setDeleteForm] = useState({ id: "" });
  const [deleteAllForm, setDeleteAllForm] = useState({ pass: "" });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      let apiUrl = '';

      // Replace with your actual API endpoint
      if (process.env.NODE_ENV === 'development') {
        apiUrl = 'http://localhost:2000/order/getAll';
      } else {
        apiUrl = 'https://your-production-api-url/order/getAll';
      }

      const response = await axios.get(apiUrl);
      setOrders(response.data.order);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteOrder(deleteForm.id));
    setDeleteForm({ id: "" });
  }

  const handleDeleteAll = (e) => {
    e.preventDefault();
    dispatch(deleteAllOrders(deleteAllForm.password));
    setDeleteAllForm({ password: "" });
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar (Visible on Medium screens and up) */}
      <div className="hidden md:flex">
        <SideMenu />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 xl:ml-80">
        <NavBarAdminPage />

        <div className="bg-white shadow-lg px-6 py-3 rounded-xl mb-6">
          <h1 className="text-3xl font-bold mb-6 md:mb-8">Order Management</h1>

          {/* Buttons Section */}
          <div className="flex mb-4 space-x-4">
            {/* Delete Button */}
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
              onClick={() => setBtnState('delete')}
            >
              Delete
            </button>
            {/* Delete All Button */}
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
              onClick={() => setBtnState('deleteall')}
            >
              Delete All
            </button>
          </div>

          {/* List of Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Orders</h2>
            {error && <div className="text-red-500">{error}</div>}
            {orders && orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Postal Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        County
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        City
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{order._id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.address}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.postal}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.country}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.city}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.price}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {/* Example of a delete button for each order */}
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
                            onClick={() => dispatch(deleteOrder(order._id))}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-sm text-gray-500 text-center">No orders found.</div>
            )}
          </div>

          {/* Conditional Forms */}
          {btnState === "delete" ? 
            <form className="mt-4 px-4 py-2 bg-white rounded-lg shadow-md" onSubmit={handleDelete}>
              <label className="block mb-2 text-sm font-medium text-gray-700">ID</label>
              <input onChange={(e) => setDeleteForm({ ...deleteForm, id: e.target.value })} value={deleteForm.id} name='id' className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              <button type='submit' className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300">Submit</button>
            </form>
          : null}

          {btnState === "deleteall" ? 
            <form className="mt-4 px-4 py-2 bg-white rounded-lg shadow-md" onSubmit={handleDeleteAll}>
              <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <input onChange={(e) => setDeleteAllForm({ ...deleteAllForm, password: e.target.value })} value={deleteAllForm.password} name='password' type="password" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              <button type='submit' className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300">Submit</button>
            </form>
          : null}

        </div>
        <FooterAdminPage />
      </main>
    </div>
  );
}

export default OrderPageAdmin;