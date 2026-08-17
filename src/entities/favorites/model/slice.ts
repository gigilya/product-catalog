import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
    items: number[];
}

const initialState: FavoritesState = {
    items: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<number>) => {
            const index = state.items.indexOf(action.payload);
            if (index === -1) {
                state.items.push(action.payload);
            } else {
                state.items.splice(index, 1);
            }
        },
        removeFromFavorites: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((id) => id !== action.payload);
        },
        setFavorites: (state, action: PayloadAction<number[]>) => {
            state.items = action.payload;
        },
    },
});

export const favoritesActions = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
