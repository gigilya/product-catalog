import { configureStore } from '@reduxjs/toolkit';

import { cartReducer } from '@/src/entities/cart';
import { favoritesReducer } from '@/src/entities/favorites';
import { productReducer } from '@/src/entities/product';

export const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        favorites: favoritesReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
