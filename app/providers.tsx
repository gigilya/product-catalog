'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';

import { store } from './store';

import { cartActions } from '@/src/entities/cart';
import { favoritesActions } from '@/src/entities/favorites';

function StorageInit() {
    const dispatch = store.dispatch;

    useEffect(() => {
        try {
            const cart = localStorage.getItem('cart');
            if (cart) {
                dispatch(cartActions.setCart(JSON.parse(cart)));
            }
        } catch {
            // ignore
        }

        try {
            const favorites = localStorage.getItem('favorites');
            if (favorites) {
                dispatch(favoritesActions.setFavorites(JSON.parse(favorites)));
            }
        } catch {
            // ignore
        }
    }, [dispatch]);

    return null;
}

function StorageSync() {
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const state = store.getState();
            localStorage.setItem('cart', JSON.stringify(state.cart.items));
            localStorage.setItem(
                'favorites',
                JSON.stringify(state.favorites.items),
            );
        });

        return () => unsubscribe();
    }, []);

    return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <StorageInit />
            <StorageSync />
            {children}
        </Provider>
    );
}
