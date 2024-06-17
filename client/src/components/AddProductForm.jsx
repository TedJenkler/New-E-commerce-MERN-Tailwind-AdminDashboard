import React from 'react';
import IncludesRepeater from './IncludesRepeater';
import OthersRepeater from './OthersRepeater';

const AddProductForm = ({ categories, addForm, setAddForm, handleIncludesChange, handleOthersChange }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setAddForm({
                ...addForm,
                [parent]: {
                    ...addForm[parent],
                    [child]: value
                }
            });
        } else {
            setAddForm({ ...addForm, [name]: value });
        }
    };

    const handleCategoryChange = (e) => {
        setAddForm({ ...addForm, category: e.target.value });
    };

    return (
        <form className="mt-4 p-6 bg-white rounded-lg shadow-md w-full">
            {['slug', 'name', 'price', 'description', 'features'].map((field, idx) => (
                <div key={idx} className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                        name={field}
                        value={addForm[field]}
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
                                value={addForm.img[device]}
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
                    value={addForm.category}
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
                                value={addForm.categoryImage[device]}
                                onChange={handleInputChange}
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <IncludesRepeater initialIncludes={addForm.includes} onChange={handleIncludesChange} />

            <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Gallery</h2>
                {['first', 'second', 'third'].map((item, idx) => (
                    <div key={idx} className="mb-6">
                        <h3 className="text-md font-medium text-gray-800 mb-2">
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {['mobile', 'tablet', 'desktop'].map((device, idx2) => (
                                <div key={idx2} className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Image ({device.charAt(0).toUpperCase() + device.slice(1)})
                                    </label>
                                    <input
                                        name={`gallery.${item}.${device}`}
                                        value={addForm.gallery[item][device]}
                                        onChange={handleInputChange}
                                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <OthersRepeater initialOthers={addForm.others} onChange={handleOthersChange} />

            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">New Product</label>
                <input
                    type="checkbox"
                    name="newProduct"
                    checked={addForm.newProduct}
                    onChange={(e) => setAddForm({ ...addForm, newProduct: e.target.checked })}
                    className="block px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">Shortname</label>
                <input
                    name="shortname"
                    value={addForm.shortname}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
        </form>
    );
};

export default AddProductForm;

