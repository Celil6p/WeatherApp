import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Location {
  id: string;
  name: string;
  country: string;
}

interface FavoritesState {
  locations: Location[];
}

const initialState: FavoritesState = {
  locations: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Location>) => {
      const exists = state.locations.some(
        (location) => location.id === action.payload.id
      );
      if (!exists) {
        state.locations.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.locations = state.locations.filter(
        (location) => location.id !== action.payload
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;