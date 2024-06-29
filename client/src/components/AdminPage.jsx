import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideMenu from './SideMenu';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory, fetchData } from '../features/shopSlice';
import FooterAdminPage from './FooterAdminPage';
import NavBarAdminPage from './NavBarAdminPage';

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

        // Function to fetch orders
        const fetchOrders = async () => {
            try {
                let apiUrl = '';

                // Replace with your actual API endpoint
                if (process.env.NODE_ENV === 'development') {
                    apiUrl = 'http://localhost:2000/order/getAll';
                } else {
                    apiUrl = 'https://new-e-commerce-mern-tailwind.onrender.com/order/getAll';
                }

                const response = await axios.get(apiUrl);
                setOrders(response.data.order); // Assuming response.data.order contains the array of orders
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
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar (Visible on Medium screens and up) */}
            <SideMenu />

            {/* Main Content */}
            <div className="flex-1 p-4 xl:ml-80 overflow-y-auto">
                <NavBarAdminPage />

                {/* Orders Section */}
                <div className="bg-white shadow-lg p-6 rounded-xl mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Management</h2>
                    {loadingOrders && <div>Loading...</div>}
                    {errorOrders && <div className="text-red-500">{errorOrders}</div>}
                    {!loadingOrders && !errorOrders && Array.isArray(orders) && orders.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Postal Code</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">County</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
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
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-sm text-gray-500 text-center">No orders found.</div>
                    )}
                </div>

                {/* Product Management */}
                <div className="bg-white shadow-lg p-6 rounded-xl mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Management</h2>
                    <div className="overflow-x-auto">
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
                </div>

                {/* Category Management */}
                <div className="bg-white shadow-lg p-6 rounded-xl mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Category Management</h2>
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

                <FooterAdminPage />
            </div>
        </div>
    );
}

export default AdminPage;
