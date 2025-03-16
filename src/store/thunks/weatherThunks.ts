import { createAsyncThunk } from '@reduxjs/toolkit';
import DummyWeather from '@/data/DummyWeather.json';
import { 
  setLoading, 
  setError, 
  setCurrentLocation, 
  setCities,
  setSelectedCity
} from '../slices/weatherSlice';
import { CityWeather, WeatherData } from '../api/weatherApi';

// Fetch all weather data
export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      const data = DummyWeather as WeatherData;
      
      // Update store with fetched data
      dispatch(setCurrentLocation(data.currentLocation));
      dispatch(setCities(data.cities));
      
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError('Failed to fetch weather data'));
      throw error;
    }
  }
);

// Fetch weather for a specific city
export const fetchCityWeather = createAsyncThunk(
  'weather/fetchCityWeather',
  async (cityName: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const data = DummyWeather as WeatherData;
      
      // Find city in the data
      let cityData: CityWeather | undefined;
      
      if (cityName.toLowerCase() === data.currentLocation.city?.toLowerCase()) {
        cityData = data.currentLocation;
      } else {
        cityData = data.cities.find(
          city => city.name?.toLowerCase() === cityName.toLowerCase()
        );
      }
      
      if (!cityData) {
        throw new Error(`City "${cityName}" not found`);
      }
      
      // Update selected city in store
      dispatch(setSelectedCity(cityData));
      
      dispatch(setLoading(false));
      return cityData;
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(`Failed to fetch weather for ${cityName}`));
      throw error;
    }
  }
);

// Refresh weather data (simulate periodic updates)
export const refreshWeatherData = createAsyncThunk(
  'weather/refreshWeatherData',
  async (_, { dispatch }) => {
    try {
      // Don't set loading to true for refresh operations
      dispatch(setError(null));
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const data = DummyWeather as WeatherData;
      
      // Update store with fresh data
      dispatch(setCurrentLocation(data.currentLocation));
      dispatch(setCities(data.cities));
      
      return data;
    } catch (error) {
      dispatch(setError('Failed to refresh weather data'));
      throw error;
    }
  }
); 