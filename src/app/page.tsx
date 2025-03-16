'use client';

import { useEffect } from 'react';
import styles from './page.module.scss';
import WeatherCard from '@/components/WeatherCard/WeatherCard';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchWeatherData } from '@/store/thunks/weatherThunks';
import { useGetCurrentLocationWeatherQuery } from '@/store/api/weatherApi';
import { loadSelectedCityFromStorage } from '@/store/middleware/localStorageMiddleware';
import { setSelectedCity } from '@/store/slices/weatherSlice';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { currentLocation, selectedCity } = useAppSelector((state) => state.weather);
  
  // Using RTK Query for data fetching
  const { data: currentLocationData, isLoading } = useGetCurrentLocationWeatherQuery();
  
  useEffect(() => {
    // Load initial data using thunk action
    dispatch(fetchWeatherData());
    
    // Load selected city from localStorage if available
    const savedSelectedCity = loadSelectedCityFromStorage();
    if (savedSelectedCity) {
      dispatch(setSelectedCity(savedSelectedCity));
    }
  }, [dispatch]);
  
  // If data is still loading and we don't have any from RTK Query yet, show loading
  if (!currentLocation && !currentLocationData && !selectedCity && isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Loading weather data...</p>
      </div>
    );
  }
  
  // Use selected city if available, otherwise use current location or RTK Query data
  const weatherData = selectedCity || currentLocation || currentLocationData;
  
  if (!weatherData) {
    return (
      <div className={styles.errorContainer}>
        <p>Failed to load weather data. Please try again later.</p>
      </div>
    );
  }
  
  // Prepare data to match the WeatherCard props interface
  const cardProps = {
    city: weatherData.city || weatherData.name || 'Unknown Location',
    temperature: weatherData.temperature,
    description: weatherData.description,
    highTemp: weatherData.highTemp,
    lowTemp: weatherData.lowTemp,
    hourlyForecast: weatherData.hourlyForecast,
    weeklyForecast: weatherData.weeklyForecast || [],
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h2 className={styles.cityName}>{cardProps.city}</h2>
        <div className={styles.temperature}>{cardProps.temperature}°</div>
        <div className={styles.weatherDescription}>{cardProps.description}</div>
        <div className={styles.highLowTemp}>
          H:{cardProps.highTemp}° L:{cardProps.lowTemp}°
        </div>
      </div>
      
      <section className={styles.heroSection}>
        <div className={styles.mobileHouseImage}>
          <Image 
            src="/house.png" 
            alt="House" 
            width={200} 
            height={200} 
            priority
          />
        </div>
        
        <div className={styles.cardGrid}>
          <div className={`${styles.weatherCardWrapper} ${styles.featured}`}>
            <WeatherCard {...cardProps} />
          </div>
        </div>
      </section>
    </div>
  );
}