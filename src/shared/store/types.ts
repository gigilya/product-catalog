import type { CartState } from '@/src/entities/cart';
import type { FavoritesState } from '@/src/entities/favorites';
import type { ProductState } from '@/src/entities/product';

export interface RootState {
    products: ProductState;
    cart: CartState;
    favorites: FavoritesState;
}

export type AppDispatch = import('redux').Dispatch;
