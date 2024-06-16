import React, { useEffect } from 'react';
import SideMenu from './SideMenu';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../features/shopSlice';

function CategoryPageAdmin() {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.shop.category);

    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch]);

    return (
        <div className="flex">
            {/* Sidebar (Visible on Medium screens and up) */}
            <div className="hidden md:flex">
                <SideMenu />
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-100">
                <div className="container mx-auto px-4 py-6 md:px-8 md:py-10">
                    <h1 className="text-3xl font-bold mb-6 md:mb-8">Category Management</h1>

                    {/* List of Categories */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Categories</h2>
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
                </div>
            </main>
        </div>
    );
}

export default CategoryPageAdmin;
