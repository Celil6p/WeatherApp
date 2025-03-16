"use client";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hydrateFromStorage } from '@/store/slices/favoritesSlice';
import { loadFavoritesFromStorage } from '@/store/middleware/localStorageMiddleware';

// This component is responsible for loading saved favorites from localStorage
// and dispatching them to the store. It should be rendered once in the app.
export default function FavoritesHydration() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Load saved favorites from localStorage
    const savedFavorites = loadFavoritesFromStorage();
    if (savedFavorites) {
      // Dispatch action to hydrate the store with saved favorites
      dispatch(hydrateFromStorage(savedFavorites));
    }
  }, [dispatch]);
  
  // This component doesn't render anything
  return null;
} 