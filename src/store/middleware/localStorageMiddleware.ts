import { Middleware } from 'redux';
import { RootState } from '../index';

// Keys for storing data in localStorage
const FAVORITES_STORAGE_KEY = 'weather_app_favorites';
const SELECTED_CITY_STORAGE_KEY = 'weather_app_selected_city';

// Check if window is available (client-side) to avoid SSR issues
const isClient = typeof window !== 'undefined';

// Type guard to check if action has a type property
const hasType = (action: unknown): action is { type: string } => {
  return typeof action === 'object' && action !== null && 'type' in action;
};

// Middleware to save favorites and selectedCity to localStorage
export const localStorageMiddleware: Middleware<unknown, RootState> = store => next => action => {
  // Process the action first
  const result = next(action);
  
  // Only run on client-side
  if (isClient && hasType(action)) {
    // Handle favorites-related actions
    if (
      action.type === 'favorites/addFavorite' || 
      action.type === 'favorites/removeFavorite' || 
      action.type === 'favorites/updateFavorite' || 
      action.type === 'favorites/clearFavorites'
    ) {
      // Get the current favorites state
      const favoritesState = store.getState().favorites;
      
      // Save to localStorage
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoritesState));
      } catch (e) {
        console.error('Failed to save favorites to localStorage:', e);
      }
    }
    
    // Handle selectedCity change
    if (action.type === 'weather/setSelectedCity') {
      const { selectedCity } = store.getState().weather;
      
      try {
        if (selectedCity) {
          localStorage.setItem(SELECTED_CITY_STORAGE_KEY, JSON.stringify(selectedCity));
        } else {
          // If selectedCity is null, remove the item
          localStorage.removeItem(SELECTED_CITY_STORAGE_KEY);
        }
      } catch (e) {
        console.error('Failed to save selected city to localStorage:', e);
      }
    }
  }
  
  return result;
};

// Function to load favorites from localStorage
export const loadFavoritesFromStorage = (): any => {
  if (!isClient) {
    return undefined; // Return undefined on server-side
  }
  
  try {
    const serializedState = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Failed to load favorites from localStorage:', e);
    return undefined;
  }
};

// Function to load selectedCity from localStorage
export const loadSelectedCityFromStorage = (): any => {
  if (!isClient) {
    return null; // Return null on server-side
  }
  
  try {
    const serializedCity = localStorage.getItem(SELECTED_CITY_STORAGE_KEY);
    if (serializedCity === null) {
      return null;
    }
    return JSON.parse(serializedCity);
  } catch (e) {
    console.error('Failed to load selected city from localStorage:', e);
    return null;
  }
}; 