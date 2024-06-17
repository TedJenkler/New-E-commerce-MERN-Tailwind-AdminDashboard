import React from 'react';
import IncludesRepeater from './IncludesRepeater';
import OthersRepeater from './OthersRepeater';

const EditProductForm = ({ categories, editForm, setEditForm, handleIncludesChange, handleOthersChange }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const [outerKey, innerKey] = name.split('.');

        if (innerKey) {
        
            setEditForm({
                ...editForm,
                [outerKey]: {
                    ...editForm[outerKey],
                    [innerKey]: value 
                }
            });
        } else {
            
            setEditForm({ ...editForm, [name]: value });
        }
    };

    const handleCategoryChange = (e) => {
        setEditForm({ ...editForm, category: e.target.value });
    };

    return (
        <form className="mt-4 p-6 bg-white rounded-lg shadow-md w-full">
            {['id', 'slug', 'name', 'price', 'description', 'features'].map((field, idx) => (
                <div key={idx} className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                        name={field}
                        value={editForm[field]}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
            ))}

            <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Main Image</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['mobile', 'tablet', 'desktop'].map((device, idx) => (
                        <div key={idx} className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Image ({device.charAt(0).toUpperCase() + device.slice(1)})
                            </label>
                            <input
                                name={`img.${device}`}
                                value={editForm.img[device]}
                                onChange={handleInputChange}
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
                <select
                    name="category"
                    value={editForm.category}
                    onChange={handleCategoryChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                        <option key={category._id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Category Image</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['mobile', 'tablet', 'desktop'].map((device, idx) => (
                        <div key={idx} className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Image ({device.charAt(0).toUpperCase() + device.slice(1)})
                            </label>
                            <input
                                name={`categoryImage.${device}`}
                                value={editForm.categoryImage[device]}
                                onChange={handleInputChange}
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <IncludesRepeater initialIncludes={editForm.includes} onChange={handleIncludesChange} />

            <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Gallery</h2>
                {['first', 'second', 'third'].map((item, idx) => (
                    <div key={idx} className="mb-6">
                        <h3 className="text-md font-medium text-gray-800 mb-2">{item.charAt(0).toUpperCase() + item.slice(1)}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {['mobile', 'tablet', 'desktop'].map((device, idx2) => (
                                <div key={idx2} className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Image ({device.charAt(0).toUpperCase() + device.slice(1)})
                                    </label>
                                    <input
                                        name={`gallery.${item}.${device}`}
                                        value={editForm.gallery[item][device]}
                                        onChange={handleInputChange}
                                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <OthersRepeater initialOthers={editForm.others} onChange={handleOthersChange} />

            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">New Product</label>
                <input
                    type="checkbox"
                    name="newProduct"
                    checked={editForm.newProduct}
                    onChange={(e) => setEditForm({ ...editForm, newProduct: e.target.checked })}
                    className="block px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">Shortname</label>
                <input
                    name="shortname"
                    value={editForm.shortname}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
        </form>
    );
};

export default EditProductForm;
