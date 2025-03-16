"use client";

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CityWeather } from '@/store/api/weatherApi';
import { RootState } from '@/store/index';
import { addFavorite } from '@/store/slices/favoritesSlice';
import { useGetAllCitiesQuery } from '@/store/api/weatherApi';
import styles from './SearchCityModal.module.scss';

interface SearchCityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchCityModal({ isOpen, onClose }: SearchCityModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CityWeather[]>([]);
  const { data: allCities, isLoading } = useGetAllCitiesQuery();
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.cities);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (!allCities || query.trim().length === 0) {
      setSearchResults([]);
      return;
    }
    
    // Filter cities based on search query
    const results = allCities.filter(city => 
      (city.name?.toLowerCase().includes(query.toLowerCase()) || 
       city.city?.toLowerCase().includes(query.toLowerCase()))
    );
    setSearchResults(results);
  };

  // Add city to favorites
  const handleAddFavorite = (city: CityWeather) => {
    dispatch(addFavorite({ 
      id: city.name || city.city || '', 
      name: city.name || city.city || '', 
      temperature: city.temperature,
      description: city.description
    }));
    onClose();
  };

  // Check if city is already in favorites
  const isFavorite = (city: CityWeather) => {
    return favorites.some(fav => 
      fav.name === city.name || fav.name === city.city || 
      fav.id === city.name || fav.id === city.city
    );
  };

  // Close modal when clicking outside
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleOutsideClick}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.modalHeader}>
          <h2>Search City</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        
        <div className={styles.searchContainer}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for a city..."
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          {searchQuery.length > 0 && (
            <button 
              className={styles.clearSearch} 
              onClick={() => setSearchQuery('')}
            >
              ×
            </button>
          )}
        </div>
        
        <div className={styles.searchResults}>
          {isLoading ? (
            <div className={styles.loadingState}>Loading cities...</div>
          ) : searchQuery.length === 0 ? (
            <div className={styles.emptyState}>
              Enter a city name to search
            </div>
          ) : searchResults.length === 0 ? (
            <div className={styles.noResults}>
              No cities found matching &quot;{searchQuery}&quot;
            </div>
          ) : (
            <ul>
              {searchResults.map((city, index) => (
                <li key={index} className={styles.cityItem}>
                  <div className={styles.cityInfo}>
                    <span className={styles.cityName}>{city.name || city.city}</span>
                    <span className={styles.cityTemp}>{city.temperature}°</span>
                  </div>
                  <button 
                    className={`${styles.addButton} ${isFavorite(city) ? styles.added : ''}`}
                    onClick={() => handleAddFavorite(city)}
                    disabled={isFavorite(city)}
                  >
                    {isFavorite(city) ? 'Added' : 'Add'}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
} 