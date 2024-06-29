import React, { useEffect, useState } from 'react';
import SideMenu from './SideMenu';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../features/shopSlice';
import { addCategory, editCategory, deleteCategory } from '../features/adminSlice';
import NavBarAdminPage from './NavBarAdminPage';
import FooterAdminPage from './FooterAdminPage';

function CategoryPageAdmin() {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.shop.category);
    const [btnState, setBtnState] = useState('');
    const [addForm, setAddForm] = useState({ name: "", img: { mobile: "", tablet: "", desktop: "" }});
    const [editForm, setEditForm] = useState({ oldname: "", name: "", img: { mobile: "", tablet: "", desktop: "" }});
    const [deleteForm, setDeleteForm] = useState({ name: "" });

    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch]);

    const handleAdd = (e) => {
        e.preventDefault();
        dispatch(addCategory(addForm));
        setAddForm({ name: "", img: { mobile: "", tablet: "", desktop: "" }});
    }

    const handleEdit = (e) => {
        e.preventDefault();
        dispatch(editCategory(editForm));
        setEditForm({ oldname: "", name: "", img: { mobile: "", tablet: "", desktop: "" }});
    }

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteCategory(deleteForm.name))
        setDeleteForm({ name: "" });
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <SideMenu />
            <div className="flex-1 p-4 xl:ml-80">
                <NavBarAdminPage />
                <div className="bg-white shadow-lg p-6 rounded-xl mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Category Management</h2>

                    <div className="flex mb-4 space-x-4">
                        <button onClick={() => setBtnState('add')} className={`px-4 py-2 text-sm rounded-md focus:outline-none ${
                            btnState === 'add'
                                ? 'bg-green-500 text-white hover:bg-green-600'
                                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                        }`}>
                            Add
                        </button>
                        <button onClick={() => setBtnState('edit')} className={`px-4 py-2 text-sm rounded-md focus:outline-none ${
                            btnState === 'edit'
                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                        }`}>
                            Edit
                        </button>
                        <button onClick={() => setBtnState('delete')} className={`px-4 py-2 text-sm rounded-md focus:outline-none ${
                            btnState === 'delete'
                                ? 'bg-red-500 text-white hover:bg-red-600'
                                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                        }`}>
                            Delete
                        </button>
                    </div>

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

                    {btnState === 'add' && (
                        <form className="mt-4 bg-white shadow-lg rounded-xl p-6" onSubmit={handleAdd}>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Category</h2>
                            <label htmlFor="addCategoryName" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                id="addCategoryName"
                                name="addCategoryName"
                                value={addForm.name}
                                onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter category name"
                            />

                            <label htmlFor="addCategoryImgMobile" className="block text-sm font-medium text-gray-700 mt-4 mb-2">Image (Mobile)</label>
                            <input
                                type="text"
                                id="addCategoryImgMobile"
                                name="addCategoryImgMobile"
                                value={addForm.img.mobile}
                                onChange={(e) => setAddForm({ ...addForm, img: { ...addForm.img, mobile: e.target.value } })}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter mobile image URL"
                            />

                            <label htmlFor="addCategoryImgTablet" className="block text-sm font-medium text-gray-700 mt-4 mb-2">Image (Tablet)</label>
                            <input
                                type="text"
                                id="addCategoryImgTablet"
                                name="addCategoryImgTablet"
                                value={addForm.img.tablet}
                                onChange={(e) => setAddForm({ ...addForm, img: { ...addForm.img, tablet: e.target.value } })}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter tablet image URL"
                            />

                            <label htmlFor="addCategoryImgDesktop" className="block text-sm font-medium text-gray-700 mt-4 mb-2">Image (Desktop)</label>
                            <input
                                type="text"
                                id="addCategoryImgDesktop"
                                name="addCategoryImgDesktop"
                                value={addForm.img.desktop}
                                onChange={(e) => setAddForm({ ...addForm, img: { ...addForm.img, desktop: e.target.value } })}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter desktop image URL"
                            />

                            <button
                                type="submit"
                                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300"
                            >
                                Submit
                            </button>
                        </form>
                    )}

                    {btnState === 'edit' && (
                        <form className="mt-4 bg-white shadow-lg rounded-xl p-6" onSubmit={handleEdit}>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Category</h2>
                            <label htmlFor="editCategoryName" className="block text-sm font-medium text-gray-700 mb-2">Old Name</label>
                            <input
                                type="text"
                                id="editCategoryName"
                                name="editCategoryName"
                                value={editForm.oldname}
                                onChange={(e) => setEditForm({ ...editForm, oldname: e.target.value })}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter old category name"
                            />

                            <label htmlFor="editCategoryNewName" className="block text-sm font-medium text-gray-700 mt-4 mb-2">New Name</label>
                            <input
                                type="text"
                                id="editCategoryNewName"
                                name="editCategoryNewName"
                                value={editForm.name}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter new category name"
                            />

                            <label htmlFor="editCategoryImgMobile" className="block text-sm font-medium text-gray-700 mt-4 mb-2">Image (Mobile)</label>
                            <input
                                type="text"
                                id="editCategoryImgMobile"
                                name="editCategoryImgMobile"
                                value={editForm.img.mobile}
                                onChange={(e) => setEditForm({ ...editForm, img: { ...editForm.img, mobile: e.target.value } })}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter mobile image URL"
                            />

                            <label htmlFor="editCategoryImgTablet" className="block text-sm font-medium text-gray-700 mt-4 mb-2">Image (Tablet)</label>
                            <input
                                type="text"
                                id="editCategoryImgTablet"
                                name="editCategoryImgTablet"
                                value={editForm.img.tablet}
                                onChange={(e) => setEditForm({ ...editForm, img: { ...editForm.img, tablet: e.target.value } })}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter tablet image URL"
                            />

                            <label htmlFor="editCategoryImgDesktop" className="block text-sm font-medium text-gray-700 mt-4 mb-2">Image (Desktop)</label>
                            <input
                                type="text"
                                id="editCategoryImgDesktop"
                                name="editCategoryImgDesktop"
                                value={editForm.img.desktop}
                                onChange={(e) => setEditForm({ ...editForm, img: { ...editForm.img, desktop: e.target.value } })}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter desktop image URL"
                            />

                            <button
                                type="submit"
                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
                            >
                                Submit
                            </button>
                        </form>
                    )}

                    {btnState === 'delete' && (
                        <form className="mt-4 bg-white shadow-lg rounded-xl p-6" onSubmit={handleDelete}>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Delete Category</h2>
                            <label htmlFor="deleteCategoryName" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                id="deleteCategoryName"
                                name="deleteCategoryName"
                                value={deleteForm.name}
                                onChange={(e) => setDeleteForm({ ...deleteForm, name: e.target.value })}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter category name to delete"
                            />

                            <button
                                type="submit"
                                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
                            >
                                Submit
                            </button>
                        </form>
                    )}
                </div>
                <FooterAdminPage />
            </div>
        </div>
    );
}

export default CategoryPageAdmin;