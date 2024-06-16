import { configureStore } from "@reduxjs/toolkit";
import shopSlice from "../features/shopSlice";
import adminSlice from "../features/adminSlice"

export const store = configureStore({
    reducer: {
        shop: shopSlice,
        admin: adminSlice
    }
})