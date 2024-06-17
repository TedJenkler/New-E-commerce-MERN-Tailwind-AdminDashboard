import React, { useState } from 'react';

const IncludesRepeater = ({ initialIncludes, onChange }) => {
    const [includes, setIncludes] = useState(initialIncludes);

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedIncludes = [...includes];
        updatedIncludes[index] = { ...updatedIncludes[index], [name]: value };
        setIncludes(updatedIncludes);
        onChange(updatedIncludes);
    };

    const handleAddInclude = () => {
        setIncludes([...includes, { quantity: '', item: '' }]);
    };

    const handleRemoveInclude = (index) => {
        const updatedIncludes = [...includes];
        updatedIncludes.splice(index, 1);
        setIncludes(updatedIncludes);
        onChange(updatedIncludes);
    };

    return (
        <div>
            <h2>Includes</h2>
            {includes.map((include, index) => (
                <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Quantity</label>
                        <input
                            type="text"
                            name="quantity"
                            value={include.quantity}
                            onChange={(e) => handleInputChange(index, e)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter quantity"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Item</label>
                        <input
                            type="text"
                            name="item"
                            value={include.item}
                            onChange={(e) => handleInputChange(index, e)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter item"
                        />
                    </div>
                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={() => handleRemoveInclude(index)}
                            className="ml-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md transition duration-300"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleAddInclude}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300"
                >
                    Add Include
                </button>
            </div>
        </div>
    );
};

export default IncludesRepeater;