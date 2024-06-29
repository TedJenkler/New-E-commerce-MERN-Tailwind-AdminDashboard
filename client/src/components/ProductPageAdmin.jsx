import React, { useEffect, useState } from 'react';
import SideMenu from './SideMenu';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory, fetchData } from '../features/shopSlice';
import { addProduct, editProduct, deleteProduct } from '../features/adminSlice';
import AddProductForm from './AddProductForm';
import EditProductForm from './EditProductForm';
import NavBarAdminPage from './NavBarAdminPage';
import FooterAdminPage from './FooterAdminPage';

function ProductPageAdmin() {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.shop.category);
  const products = useSelector(state => state.shop.data);
  const [btnState, setBtnState] = useState('');
  const [addForm, setAddForm] = useState(getInitialFormState());
  const [editForm, setEditForm] = useState(getInitialFormState());
  const [deleteForm, setDeleteForm] = useState({ slug: "" });

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchCategory());
  }, [dispatch]);

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
  };

  const resetForms = () => {
    setAddForm(getInitialFormState());
    setEditForm(getInitialFormState());
    setDeleteForm({ slug: "" });
  };

  const handleIncludesChange = (updatedIncludes) => {
    setAddForm({ ...addForm, includes: updatedIncludes });
    setEditForm({ ...editForm, includes: updatedIncludes });
  };

  const handleOthersChange = (updatedOthers) => {
    setAddForm({ ...addForm, others: updatedOthers });
    setEditForm({ ...editForm, others: updatedOthers });
  };

  // Helper function to initialize form state
  function getInitialFormState() {
    return {
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
    };
  }

  // Function to group products by category
  const groupProductsByCategory = () => {
    const groupedProducts = {};
    categories.forEach(category => {
      groupedProducts[category._id] = products.filter(product => product.categoryId === category._id);
    });
    return groupedProducts;
  };

  // Render grouped products
  const renderGroupedProducts = () => {
    const groupedProducts = groupProductsByCategory();
    return categories.map(category => (
      <tr key={category._id}>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {groupedProducts[category._id].length > 0 ? (
            <ul>
              {groupedProducts[category._id].map(product => (
                <li key={product._id}>{product.name}</li>
              ))}
            </ul>
          ) : (
            <span>No products</span>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar (Visible on Medium screens and up) */}
      <div className="hidden md:flex">
        <SideMenu />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 xl:ml-80">
        <NavBarAdminPage />

        <div className="bg-white shadow-lg px-6 py-3 rounded-xl mb-6">
          <h1 className="text-3xl font-bold mb-6 md:mb-8">Product Management</h1>

          {/* Buttons Section */}
          <div className="flex mb-4 space-x-4">
            {/* Add Button */}
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300"
              onClick={() => setBtnState('add')}
            >
              Add
            </button>
            {/* Edit Button */}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
              onClick={() => setBtnState('edit')}
            >
              Edit
            </button>
            {/* Delete Button */}
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
              onClick={() => setBtnState('delete')}
            >
              Delete
            </button>
          </div>

          {/* List of Products */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Products by Category</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {renderGroupedProducts()}
                </tbody>
              </table>
            </div>
          </div>

          {/* Conditional Forms */}
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
                <input
                  onChange={(e) => setDeleteForm({ slug: e.target.value })}
                  value={deleteForm.slug}
                  name="slug"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-md mt-4">
                  Delete Product
                </button>
              </form>
            </div>
          )}

        </div>
        <FooterAdminPage />
      </main>
    </div>
  );
}

export default ProductPageAdmin;