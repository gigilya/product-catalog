import { RootState } from '@/src/shared/store/types';

export const selectProducts = (state: RootState) => state.products.items;
export const selectProductsLoading = (state: RootState) =>
    state.products.loading;
export const selectProductsError = (state: RootState) => state.products.error;
