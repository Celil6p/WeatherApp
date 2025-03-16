import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FavoriteCity {
  id: string;
  name: string;
  temperature?: number;
  description?: string;
}

interface FavoritesState {
  cities: FavoriteCity[];
}

// Create default initial state
const defaultInitialState: FavoritesState = {
  cities: []
};

// Get initial state from localStorage if available (will be done when setting up store)
// We don't directly access localStorage here to avoid SSR issues
const initialState: FavoritesState = defaultInitialState;

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteCity>) => {
      // Check if city already exists in favorites
      const cityExists = state.cities.some(city => city.id === action.payload.id);
      if (!cityExists) {
        state.cities.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter(city => city.id !== action.payload);
    },
    updateFavorite: (state, action: PayloadAction<FavoriteCity>) => {
      const index = state.cities.findIndex(city => city.id === action.payload.id);
      if (index !== -1) {
        state.cities[index] = {
          ...state.cities[index],
          ...action.payload
        };
      }
    },
    clearFavorites: (state) => {
      state.cities = [];
    },
    // New reducer to set favorites state from localStorage on app init
    hydrateFromStorage: (state, action: PayloadAction<FavoritesState>) => {
      // Replace current state with saved state
      return action.payload;
    }
  }
});

export const { 
  addFavorite, 
  removeFavorite, 
  updateFavorite, 
  clearFavorites,
  hydrateFromStorage
} = favoritesSlice.actions;

export default favoritesSlice.reducer;