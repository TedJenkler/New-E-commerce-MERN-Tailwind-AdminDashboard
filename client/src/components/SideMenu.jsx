import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu = () => {
    return (
        <nav className="bg-gray-800 w-64 min-h-screen flex flex-col lg:flex">
            {/* Logo/Header */}
            <div className="flex items-center justify-center h-16 bg-gray-900 text-white">
                Admin Panel
            </div>

            {/* Menu Items */}
            <ul className="flex-1 overflow-y-auto">
                <li className="px-6 py-2 hover:bg-gray-700">
                    <Link to="/adminpage" className="block text-white">
                        Dashboard
                    </Link>
                </li>
                <li className="px-6 py-2 hover:bg-gray-700">
                    <Link to="/admin/products" className="block text-white">
                        Products
                    </Link>
                </li>
                <li className="px-6 py-2 hover:bg-gray-700">
                    <Link to="/admin/categories" className="block text-white">
                        Categories
                    </Link>
                </li>
                <li className="px-6 py-2 hover:bg-gray-700">
                    <Link to="/admin/orders" className="block text-white">
                        Orders
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default SideMenu;