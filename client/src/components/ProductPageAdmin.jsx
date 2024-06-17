import React, { useEffect, useState } from 'react';
import SideMenu from './SideMenu';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory, fetchData } from '../features/shopSlice';

function ProductPageAdmin() {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.shop.category);
    const products = useSelector(state => state.shop.data);
    const [btnState, setBtnState] = useState('');

    useEffect(() => {
        dispatch(fetchData());
        dispatch(fetchCategory());
    }, [dispatch]);

    // Helper function to get product names for each category
    const getProductNamesForCategory = (categoryId) => {
        return products.filter(product => product.categoryId === categoryId).map(product => product.name);
    };

    return (
        <div className="flex">
            {/* Sidebar (Visible on Medium screens and up) */}
            <div className="hidden md:flex">
                <SideMenu />
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-100">
                <div className="container mx-auto px-4 py-6 md:px-8 md:py-10">
                    <h1 className="text-3xl font-bold mb-6 md:mb-8">Product Management</h1>

                    {/* Buttons Section */}
                    <div className="flex mb-4 space-x-4">
                        {/* Add Button */}
                        <button onClick={() => setBtnState('add')} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300">
                            Add
                        </button>
                        {/* Edit Button */}
                        <button onClick={() => setBtnState('edit')} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300">
                            Edit
                        </button>
                        {/* Delete Button */}
                        <button onClick={() => setBtnState('delete')} className="bg-red hover:bg-red text-white px-4 py-2 rounded-md transition duration-300">
                            Delete
                        </button>
                    </div>

                    {/* Table of Products */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Products by Category</h2>
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
                {/* Conditional Forms */}
                {btnState === "add" ? 
                        <form className="mt-4 px-4 py-2 bg-white rounded-lg shadow-md">
                            <label className="block mb-2 text-sm font-medium text-gray-700">Slug</label>
                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                            <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                            <div>
                                <h2>Main Img</h2>
                                <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Mobile)</label>
                                <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />

                                <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Tablet)</label>
                                <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />

                                <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Desktop)</label>
                                <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                            
                            </div>
                            <div>
                                <label>Category</label>
                                <select>
                                    <option>headphones</option>
                                    <option>earphones</option>
                                    <option>speakers</option>
                                </select>
                            </div>
                            <div>
                                <h2>Caregory img</h2>
                                <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Mobile)</label>
                                <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />

                                <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Tablet)</label>
                                <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />

                                <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Desktop)</label>
                                <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                            </div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Price</label>
                                <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                                <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                                <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                                <label className="block mb-2 text-sm font-medium text-gray-700">Features</label>
                                <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                            <div>
                                <h2>Includes</h2>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Quantity</label>
                                <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                                <label className="block mb-2 text-sm font-medium text-gray-700">Item</label>
                                <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                            </div>
                            <div>
                                <h2>Gallery</h2>
                                <h3>First</h3>
                                <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Mobile)</label>
                                <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />

                                <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Tablet)</label>
                                <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />

                                <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Desktop)</label>
                                <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                                <h3>Second</h3>
                                <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Mobile)</label>
                                <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />

                                <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Tablet)</label>
                                <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />

                                <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Desktop)</label>
                                <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                                <h3>Third</h3>
                                <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Mobile)</label>
                                <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />

                                <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Tablet)</label>
                                <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />

                                <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Desktop)</label>
                                <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                            </div>
                            <div>
                                <h2>Others</h2>
                            </div>
                            <div>
                                <label>New Product</label>
                                <button>True or False</button>
                            </div>
                            <div>
                                <label>Shortname</label>
                                <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                            </div>
                        </form>
                    : null}

                    {btnState === "edit" ? 
                        <form className="mt-4 px-4 py-2 bg-white rounded-lg shadow-md">
                        <label>Id</label>
                        <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        <label className="block mb-2 text-sm font-medium text-gray-700">Slug</label>
                        <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                        <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        <div>
                            <h2>Main Img</h2>
                            <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Mobile)</label>
                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />

                            <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Tablet)</label>
                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />

                            <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Desktop)</label>
                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        
                        </div>
                        <div>
                            <label>Category</label>
                            <select>
                                <option>headphones</option>
                                <option>earphones</option>
                                <option>speakers</option>
                            </select>
                        </div>
                        <div>
                            <h2>Caregory img</h2>
                            <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Mobile)</label>
                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />

                            <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Tablet)</label>
                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />

                            <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Desktop)</label>
                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        </div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Price</label>
                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                            <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                            <label className="block mb-2 text-sm font-medium text-gray-700">Features</label>
                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        <div>
                            <h2>Includes</h2>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Quantity</label>
                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                            <label className="block mb-2 text-sm font-medium text-gray-700">Item</label>
                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        </div>
                        <div>
                            <h2>Gallery</h2>
                            <h3>First</h3>
                            <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Mobile)</label>
                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />

                            <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Tablet)</label>
                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />

                            <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Desktop)</label>
                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                            <h3>Second</h3>
                            <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Mobile)</label>
                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />

                            <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Tablet)</label>
                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />

                            <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Desktop)</label>
                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                            <h3>Third</h3>
                            <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Mobile)</label>
                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />

                            <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Tablet)</label>
                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />

                            <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Desktop)</label>
                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        </div>
                        <div>
                            <h2>Others</h2>
                        </div>
                        <div>
                            <label>New Product</label>
                            <button>True or False</button>
                        </div>
                        <div>
                            <label>Shortname</label>
                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        </div>
                    </form>
                    : null}

                    {btnState === "delete" ? 
                        <form className="mt-4 px-4 py-2 bg-white rounded-lg shadow-md">
                            <label className="block mb-2 text-sm font-medium text-gray-700">ID</label>
                            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        </form>
                    : null}
            </main>
        </div>
    );
}

export default ProductPageAdmin;
