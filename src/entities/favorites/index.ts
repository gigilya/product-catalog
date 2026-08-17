export type { FavoritesState } from './model/types';
export { favoritesReducer, favoritesActions } from './model/slice';
export {
    selectFavorites,
    selectFavoritesCount,
    selectIsFavorite,
} from './model/selectors';
