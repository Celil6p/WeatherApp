import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slices/weatherSlice';
import favoritesReducer from './slices/favoritesSlice';
import { weatherApi } from './api/weatherApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { localStorageMiddleware } from './middleware/localStorageMiddleware';

// Define state types before creating the store
export interface RootState {
  weather: ReturnType<typeof weatherReducer>;
  favorites: ReturnType<typeof favoritesReducer>;
  [weatherApi.reducerPath]: ReturnType<typeof weatherApi.reducer>;
}

// Create the store
export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    favorites: favoritesReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(weatherApi.middleware)
      .concat(localStorageMiddleware),
});

// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// For useDispatch hook
export type AppDispatch = typeof store.dispatch;