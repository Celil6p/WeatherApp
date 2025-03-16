"use client";

import React, { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { fetchWeatherData } from "@/store/thunks/weatherThunks";
import { setSelectedCity } from "@/store/slices/weatherSlice";
import styles from "./MobileMenu.module.scss";
import SearchCityModal from "@/components/SearchCityModal/SearchCityModal";
import FavoritesModal from "@/components/Layout/FavoritesModal/FavoritesModal";

interface MobileMenuProps {
  isExpanded: boolean;
  onAddLocation?: () => void;
}

export default function MobileMenu({ isExpanded, onAddLocation }: MobileMenuProps) {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  if (isExpanded) {
    return null; // Don't render when card is expanded
  }

  const handleAddButtonClick = () => {
    // Open the search modal
    setIsSearchModalOpen(true);
    
    // Still call the onAddLocation if provided (for backward compatibility)
    if (onAddLocation) {
      onAddLocation();
    }
  };

  const handleLocationButtonClick = async () => {
    // Reset selectedCity to null to show current location
    dispatch(setSelectedCity(null));
    // Load current location weather
    await dispatch(fetchWeatherData()).unwrap();
    // Close any open modals
    setIsSearchModalOpen(false);
    setIsFavoritesModalOpen(false);
  };

  const handleMenuButtonClick = () => {
    // Open favorites modal
    setIsFavoritesModalOpen(true);
  };

  return (
    <>
      <div className={styles.mobileMenu}>
        {/* Explicit curve separator */}
        <svg 
          className={styles.curveSeparator}
          width="100%" 
          height="30" 
          viewBox="0 0 100 30" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0,1 C30,28 70,28 100,1" 
            stroke="rgba(255,255,255,0.4)" 
            strokeWidth="0.9" 
            fill="none" 
          />
        </svg>

        <button 
          className={styles.menuButton} 
          aria-label="Current Location"
          onClick={handleLocationButtonClick}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" 
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 21C16 17 20 13.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 13.4183 8 17 12 21Z" 
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button
          className={`${styles.menuButton} ${styles.addButton}`}
          aria-label="Add location"
          onClick={handleAddButtonClick}
        >
          <div className={styles.addButtonCircle}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="#2D2251" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>

        <button 
          className={styles.menuButton} 
          aria-label="Favorites Menu"
          onClick={handleMenuButtonClick}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Search city modal */}
      <SearchCityModal 
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />

      {/* Favorites modal */}
      <FavoritesModal 
        isOpen={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
      />
    </>
  );
}
