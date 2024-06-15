import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the base URLs for development and production environments
const apiUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:2000'
    : 'http://localhost:2000';

export const placeOrder = createAsyncThunk(
    'shop/placeOrder',
    async (orderData, thunkAPI) => {
        try {
            const response = await axios.post(`${apiUrl}/order/add`, orderData);
            return response.data.order;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    }
);

export const fetchData = createAsyncThunk(
    'shopSlice/product/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/product/get`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchCategory = createAsyncThunk(
    'shopSlice/category/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/category/get`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    data: [],
    category: [],
    cartOpen: false,
    navOpen: false,
    status: 'idle',
    error: null,
    cart: []
};

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        toggleNav: (state, action) => {
            if(action.payload.toggle === true){
                if(state.navOpen === true){
                    state.navOpen = false
                }else {
                    state.cartOpen = false
                    state.navOpen = true
                }
            }else {
                state.navOpen = false
            }
            
        },
        toggleCart: (state, action) => {
            if(action.payload.toggle === true){
                if(state.cartOpen === true){
                    state.cartOpen = false
                }else {
                    state.navOpen = false
                    state.cartOpen = true
                }
            }else {
                state.cartOpen = false
            }
            
        },
        addItem: (state, action) => {
            const existingItem = state.cart.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity = action.payload.quantity;
            } else {
                state.cart.push({
                    ...action.payload,
                    quantity: action.payload.quantity,
                    price: action.payload.price,
                    name: action.payload.name,
                    img: action.payload.img
                });
            }
        },
        incrementItem: (state, action) => {
            const existingItem = state.cart.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            }
        },
        decrementItem: (state, action) => {
            const existingItem = state.cart.find(item => item.id === action.payload.id);
            if (existingItem && existingItem.quantity > 0) {
                existingItem.quantity -= 1;
                if (existingItem.quantity === 0) {
                    state.cart = state.cart.filter(item => item.id !== action.payload.id);
                }
            } 
        },
        removeAll: (state) => {
            state.cart = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchCategory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.category = action.payload;
            })
            .addCase(placeOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(placeOrder.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { toggleNav, toggleCart, addItem, incrementItem, decrementItem, removeAll } = shopSlice.actions;
export default shopSlice.reducer;