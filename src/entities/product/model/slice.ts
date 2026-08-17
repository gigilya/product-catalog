import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Product } from './types';

import { fetchProducts } from '@/src/shared/api/base';

interface ProductState {
    items: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    items: [],
    loading: false,
    error: null,
};

export const loadProducts = createAsyncThunk('products/load', async () => {
    const data = await fetchProducts();

    return data.items;
});

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(loadProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка загрузки';
            });
    },
});

export const productReducer = productSlice.reducer;
