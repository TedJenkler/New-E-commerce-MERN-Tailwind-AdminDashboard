import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
    'shopSlice/product/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:2000/product/get');
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
            const response = await axios.get('http://localhost:2000/category/get');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    data: [],
    category: [],
    status: 'idle',
    error: null,
    cart: [{
        id: "666036f7b1788b61a5cb9ec9",
        quantity: 1,
        img: "../src/assets/product-yx1-earphonesmobile.jpg",
        price: 599,
        name: "YX1"
      }],
};

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
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
            .addCase(fetchCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { addItem, incrementItem, decrementItem, removeAll } = shopSlice.actions;
export default shopSlice.reducer;