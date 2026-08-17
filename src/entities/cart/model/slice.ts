import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartItem } from './types';

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<number>) => {
            const existing = state.items.find(
                (item) => item.productId === action.payload,
            );
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ productId: action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                (item) => item.productId !== action.payload,
            );
        },
        increaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(
                (item) => item.productId === action.payload,
            );
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(
                (item) => item.productId === action.payload,
            );
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.items = state.items.filter(
                        (i) => i.productId !== action.payload,
                    );
                }
            }
        },
        setCart: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
        },
    },
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
