import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideMenu from './SideMenu';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory, fetchData } from '../features/shopSlice';

function AdminPage() {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.shop.category);
    const products = useSelector(state => state.shop.data);

    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [errorOrders, setErrorOrders] = useState(null);

    useEffect(() => {
        dispatch(fetchData());
        dispatch(fetchCategory());

        // Fetch orders
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/orders');
                setOrders(response.data);
                setLoadingOrders(false);
            } catch (err) {
                setErrorOrders(err.message);
                setLoadingOrders(false);
            }
        };

        fetchOrders();
    }, [dispatch]);

    const getProductNamesForCategory = (categoryId) => {
        return products.filter(product => product.categoryId === categoryId).map(product => product.name);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Sidebar (Visible on Medium screens and up) */}
            <div className="hidden md:flex">
                <SideMenu />
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-100">
                <div className="container mx-auto px-4 py-6 md:px-8 md:py-10">
                    <h1 className="text-3xl font-bold mb-6 md:mb-8">Admin Panel</h1>

                    {/* Product Management */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Product Management</h2>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {categories && categories.map(category => (
                                        <th key={category._id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {category.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products && products.length > 0 ? (
                                    <tr>
                                        {categories.map(category => (
                                            <td key={category._id} className="px-6 py-4 whitespace-nowrap">
                                                <ul className="text-sm text-gray-900">
                                                    {getProductNamesForCategory(category._id).map(name => (
                                                        <li key={name}>{name}</li>
                                                    ))}
                                                </ul>
                                            </td>
                                        ))}
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan={categories ? categories.length : 1} className="px-6 py-4 text-sm text-gray-500 text-center">
                                            No products found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Category Management */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Category Management</h2>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category Name
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {categories && categories.length > 0 ? (
                                    categories.map(category => (
                                        <tr key={category._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{category.name}</div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="1" className="px-6 py-4 text-sm text-gray-500 text-center">
                                            No categories found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Order Management */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Order Management</h2>
                        {loadingOrders && <div>Loading...</div>}
                        {errorOrders && <div className="text-red-500">{errorOrders}</div>}
                        {!loadingOrders && !errorOrders && Array.isArray(orders) && orders.length > 0 ? (
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
                                            Order Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{order.id}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{order.customerName}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{new Date(order.orderDate).toLocaleDateString()}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{order.status}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-sm text-gray-500 text-center">No orders found.</div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminPage;

