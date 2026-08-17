import { RootState } from '@/src/shared/store/types';

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartCount = (state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectIsInCart = (state: RootState, productId: number) =>
    state.cart.items.some((item) => item.productId === productId);
