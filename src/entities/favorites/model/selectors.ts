import { RootState } from '@/src/shared/store/types';

export const selectFavorites = (state: RootState) => state.favorites.items;
export const selectFavoritesCount = (state: RootState) =>
    state.favorites.items.length;
export const selectIsFavorite = (state: RootState, productId: number) =>
    state.favorites.items.includes(productId);
