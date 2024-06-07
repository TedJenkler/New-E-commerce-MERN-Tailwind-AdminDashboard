import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
    'shopSlice/product/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:2000/product/get');
            return response.data;
        }catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);

export const fetchCategory = createAsyncThunk(
    'shopSlice/category/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:2000/category/get');
            return response.data;
        }catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const initialState = {
    data: [],
    category: [],
    status: 'idle',
    error: null,
};

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {},
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
                state.status = 'loading'
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.category = action.payload;
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
})

export default shopSlice.reducer;