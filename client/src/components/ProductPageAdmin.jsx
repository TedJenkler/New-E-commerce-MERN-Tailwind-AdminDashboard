import React, { useEffect, useState } from 'react';
import SideMenu from './SideMenu';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory, fetchData } from '../features/shopSlice';
import AddProductForm from './AddProductForm';
import EditProductForm from './EditProductForm';
import { addProduct, editProduct, deleteProduct } from '../features/adminSlice';

function ProductPageAdmin() {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.shop.category);
    const products = useSelector(state => state.shop.data);
    const [btnState, setBtnState] = useState('');
    const [addForm, setAddForm] = useState({
        name: "", 
        price: "", 
        slug: "", 
        description: "", 
        features: "", 
        categoryImage: { mobile: "", tablet: "", desktop: "" }, 
        includes: [], 
        gallery: { 
            first: { mobile: "", tablet: "", desktop: "" }, 
            second: { mobile: "", tablet: "", desktop: "" }, 
            third: { mobile: "", tablet: "", desktop: "" }
        }, 
        others: [], 
        category: "", 
        img: { mobile: "", tablet: "", desktop: "" }, 
        newP: false, 
        shortname: ""
    });

    const [editForm, setEditForm] = useState({
        name: "", 
        price: "", 
        slug: "", 
        description: "", 
        features: "", 
        categoryImage: { mobile: "", tablet: "", desktop: "" }, 
        includes: [], 
        gallery: { 
            first: { mobile: "", tablet: "", desktop: "" }, 
            second: { mobile: "", tablet: "", desktop: "" }, 
            third: { mobile: "", tablet: "", desktop: "" }
        }, 
        others: [], 
        category: "", 
        img: { mobile: "", tablet: "", desktop: "" }, 
        newP: false, 
        shortname: ""
    });

    const [deleteForm, setDeleteForm] = useState({ slug: "" })

    useEffect(() => {
        dispatch(fetchData());
        dispatch(fetchCategory());
    }, [dispatch]);

    const getProductNamesForCategory = (categoryId) => {
        return products.filter(product => product.categoryId === categoryId).map(product => product.name);
    };

    const handleOthersChange = (updatedOthers) => {
        setAddForm({ ...addForm, others: updatedOthers });
        setEditForm({ ...editForm, others: updatedOthers });
    };

    const handleIncludesChange = (updatedIncludes) => {
        setAddForm({ ...addForm, includes: updatedIncludes });
        setEditForm({ ...editForm, includes: updatedIncludes });
    };

    const handleSave = () => {
        dispatch(addProduct(addForm));
        resetForms();
    };

    const handleEdit = () => {
        dispatch(editProduct(editForm));
        resetForms();
    };

    const handleDelete = () => {
        dispatch(deleteProduct(deleteForm.slug));
        resetForms();
    }

    const resetForms = () => {
        setAddForm({
            name: "", 
            price: "", 
            slug: "", 
            description: "", 
            features: "", 
            categoryImage: { mobile: "", tablet: "", desktop: "" }, 
            includes: [], 
            gallery: { 
                first: { mobile: "", tablet: "", desktop: "" }, 
                second: { mobile: "", tablet: "", desktop: "" }, 
                third: { mobile: "", tablet: "", desktop: "" }
            }, 
            others: [], 
            category: "", 
            img: { mobile: "", tablet: "", desktop: "" }, 
            newP: false, 
            shortname: ""
        });

        setEditForm({
            name: "", 
            price: "", 
            slug: "", 
            description: "", 
            features: "", 
            categoryImage: { mobile: "", tablet: "", desktop: "" }, 
            includes: [], 
            gallery: { 
                first: { mobile: "", tablet: "", desktop: "" }, 
                second: { mobile: "", tablet: "", desktop: "" }, 
                third: { mobile: "", tablet: "", desktop: "" }
            }, 
            others: [], 
            category: "", 
            img: { mobile: "", tablet: "", desktop: "" }, 
            newP: false, 
            shortname: ""
        });

        setDeleteForm({ slug: "" });
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="md:flex md:flex-shrink-0">
                <SideMenu />
            </div>

            <main className="flex-1 overflow-y-auto bg-gray-100">
                <div className="container mx-auto px-4 py-6 md:px-8 md:py-10">
                    <h1 className="text-3xl font-bold mb-6 md:mb-8">Product Management</h1>

                    <div className="flex flex-wrap mb-4 space-x-4 md:space-x-0 md:space-y-0 md:flex-row md:mb-8">
                        <button onClick={() => setBtnState('add')} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300">
                            Add
                        </button>
                        <button onClick={() => setBtnState('edit')} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300">
                            Edit
                        </button>
                        <button onClick={() => setBtnState('delete')} className="bg-red hover:bg-red text-white px-4 py-2 rounded-md transition duration-300">
                            Delete
                        </button>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-xl font-semibold mb-4">Products by Category</h2>
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

                    {btnState === 'add' && (
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <AddProductForm
                                categories={categories}
                                addForm={addForm}
                                setAddForm={setAddForm}
                                handleIncludesChange={handleIncludesChange}
                                handleOthersChange={handleOthersChange}
                            />
                            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4">
                                Save Product
                            </button>
                        </div>
                    )}

                    {btnState === 'edit' && (
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <EditProductForm
                                categories={categories}
                                editForm={editForm}
                                setEditForm={setEditForm}
                                handleIncludesChange={handleIncludesChange}
                                handleOthersChange={handleOthersChange}
                            />
                            <button onClick={handleEdit} className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4">
                                Edit Product
                            </button>
                        </div>
                    )}

                    {btnState === 'delete' && (
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <form className="mt-4 px-4 py-2 bg-white rounded-lg shadow-md">
                                <label className="block mb-2 text-sm font-medium text-gray-700">Slug</label>
                                <input onChange={(e) => setDeleteForm({ slug: e.target.value })} value={deleteForm.slug} name="slug" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                            </form>
                            <button onClick={handleDelete} className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4">
                                Delete Product
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default ProductPageAdmin;
