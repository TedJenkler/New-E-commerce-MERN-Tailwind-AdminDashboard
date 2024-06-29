import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const login = createAsyncThunk(
    'admin/login',
    async (loginData, thunkAPI) => {
        try {
            const response = await axiosInstance.post(`/admin/login`, loginData);
            const { token } = response.data;
            localStorage.setItem('token', token);
            return response.data
        }catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }
);

export const deleteOrder = createAsyncThunk(
    'order/delete',
    async (id, thunkAPI) => {
        try {
            const response = await axiosInstance.delete(`/order/delete`, { data: { id } });
            return response.data;
        }catch (error) {
            console.error('Error deleting item', error);
            throw error;
        }
    }
);

export const deleteAllOrders = createAsyncThunk(
    'orders/deleteAll',
    async (password, thunkAPI) => {
        try {
            const response = await axiosInstance.delete(`/order/deleteAll`, { data: { password } });
            return response.data;
        } catch (error) {
            console.error('Error deleting all orders:', error);
            throw error;
        }
    }
);

export const addCategory = createAsyncThunk(
    'category/add',
    async (formData, thunkAPI) => {
        try {
            const response = await axiosInstance.post(`/category/add`, formData);
            return response.data;
        }catch (error) {
            console.error('Error adding category', error);
            throw error;
        }
    }
);

export const editCategory = createAsyncThunk(
    'category/edit',
    async (formData, thunkAPI) => {
        try {
            const response = await axiosInstance.put(`/category/update/${formData.oldname}`, formData);
            return response.data;
        }catch (error) {
            console.error('Error editing category', error);
            throw error;
        }
    }
);

export const deleteCategory = createAsyncThunk(
    'category/delete',
    async (name, thunkAPI) => {
        try {
            const response = await axiosInstance.delete(`/category/delete/${name}`);
            return response.data;
        }catch (error) {
            console.error('Error deleting category', error);
            throw error;
        }
    }
);

export const addProduct = createAsyncThunk(
    'product/add',
    async (formData, thunkAPI) => {
        try {
            const response = await axiosInstance.post(`/product/add`, formData);
            return response.data;
        }catch (error) {
            console.error('Error adding product', error);
            throw error;
        }
    }
);

export const editProduct = createAsyncThunk(
    'product/update',
    async (formData, thunkAPI) => {
        try {
            const response = await axiosInstance.put(`/product/update`, formData);
            return response.data;
        } catch (error) {
            console.error('Error editing product', error);
            throw error;
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'product/delete',
    async (slug, thunkAPI) => {
        try {
            const response = await axiosInstance.delete(`/product/delete/${slug}`);
            return response.data;
        }catch (error) {
            console.error('Error deleting product', error);
            throw error;
        }
    }
);

export const getDesign = createAsyncThunk(
    'design/get',
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get('/design')
            return response.data;
        }catch (error) {
            console.error('Error fetching design', error);
            throw error;
        }
    }
);

export const updateLogo = createAsyncThunk(
    'logo/update',
    async (formData, thunkAPI) => {
        try {
            const response = await axiosInstance.put('/design/logo', formData);
            return response.data;
        }catch (error) {
            console.error('Error updating logo', error);
            throw error;
        }
    }
);

const initialState = {
    design: {},
    status: 'idle',
    error: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteOrder.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteAllOrders.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteAllOrders.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(deleteAllOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addCategory.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addCategory.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(editCategory.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(editCategory.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(editCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addProduct.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(editProduct.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(editProduct.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getDesign.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getDesign.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.design = action.payload.design;
                state.error = null;
            })
            .addCase(getDesign.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default adminSlice.reducer;