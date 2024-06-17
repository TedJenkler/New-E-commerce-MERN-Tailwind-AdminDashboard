import React, { useState } from 'react';

const OthersRepeater = ({ initialOthers = [], onChange }) => {
    const [others, setOthers] = useState(initialOthers);

    const handleAddOther = () => {
        setOthers([...others, {
            slug: '',
            name: '',
            image: {
                mobile: '',
                tablet: '',
                desktop: ''
            }
        }]);
    };

    const handleRemoveOther = (index) => {
        const updatedOthers = [...others];
        updatedOthers.splice(index, 1);
        setOthers(updatedOthers);
    };

    const handleInputChange = (e, index, field, subField = null) => {
        const { value } = e.target;
        const updatedOthers = [...others];
        
        if (subField) {
            updatedOthers[index][field][subField] = value;
        } else {
            updatedOthers[index][field] = value;
        }
        
        setOthers(updatedOthers);
        onChange(updatedOthers); // Propagate changes to parent component
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-2">Others</h2>
            {others.map((other, index) => (
                <div key={index} className="mb-4 border border-gray-300 p-4 rounded-md">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Slug</label>
                    <input
                        type="text"
                        value={other.slug}
                        onChange={(e) => handleInputChange(e, index, 'slug')}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />

                    <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        value={other.name}
                        onChange={(e) => handleInputChange(e, index, 'name')}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />

                    <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Mobile)</label>
                    <input
                        type="text"
                        value={other.image.mobile}
                        onChange={(e) => handleInputChange(e, index, 'image', 'mobile')}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />

                    <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Tablet)</label>
                    <input
                        type="text"
                        value={other.image.tablet}
                        onChange={(e) => handleInputChange(e, index, 'image', 'tablet')}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />

                    <label className="block mt-2 mb-2 text-sm font-medium text-gray-700">Image (Desktop)</label>
                    <input
                        type="text"
                        value={other.image.desktop}
                        onChange={(e) => handleInputChange(e, index, 'image', 'desktop')}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />

                    <button type="button" onClick={() => handleRemoveOther(index)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none">
                        Remove
                    </button>
                </div>
            ))}
            
            <button type="button" onClick={handleAddOther} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
                Add Other
            </button>
        </div>
    );
};

export default OthersRepeater;
