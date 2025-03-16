import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityWeather, HourlyForecast, WeeklyForecast } from '../api/weatherApi';

interface WeatherState {
  currentLocation: CityWeather | null;
  selectedCity: CityWeather | null;
  cities: CityWeather[];
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  currentLocation: null,
  selectedCity: null,
  cities: [],
  loading: false,
  error: null,
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCurrentLocation: (state, action: PayloadAction<CityWeather>) => {
      state.currentLocation = action.payload;
    },
    setSelectedCity: (state, action: PayloadAction<CityWeather | null>) => {
      state.selectedCity = action.payload;
    },
    setCities: (state, action: PayloadAction<CityWeather[]>) => {
      state.cities = action.payload;
    },
    updateHourlyForecast: (state, action: PayloadAction<{ cityId: string, forecast: HourlyForecast[] }>) => {
      const { cityId, forecast } = action.payload;
      
      if (state.currentLocation?.city === cityId || state.currentLocation?.name === cityId) {
        if (state.currentLocation) {
          state.currentLocation.hourlyForecast = forecast;
        }
      }
      
      const cityIndex = state.cities.findIndex(
        city => city.city === cityId || city.name === cityId
      );
      
      if (cityIndex !== -1) {
        state.cities[cityIndex].hourlyForecast = forecast;
      }
      
      if (state.selectedCity?.city === cityId || state.selectedCity?.name === cityId) {
        if (state.selectedCity) {
          state.selectedCity.hourlyForecast = forecast;
        }
      }
    },
    updateWeeklyForecast: (state, action: PayloadAction<{ cityId: string, forecast: WeeklyForecast[] }>) => {
      const { cityId, forecast } = action.payload;
      
      if (state.currentLocation?.city === cityId || state.currentLocation?.name === cityId) {
        if (state.currentLocation && state.currentLocation.weeklyForecast) {
          state.currentLocation.weeklyForecast = forecast;
        }
      }
      
      const cityIndex = state.cities.findIndex(
        city => city.city === cityId || city.name === cityId
      );
      
      if (cityIndex !== -1 && state.cities[cityIndex].weeklyForecast) {
        state.cities[cityIndex].weeklyForecast = forecast;
      }
      
      if (state.selectedCity?.city === cityId || state.selectedCity?.name === cityId) {
        if (state.selectedCity && state.selectedCity.weeklyForecast) {
          state.selectedCity.weeklyForecast = forecast;
        }
      }
    },
  },
});

export const { 
  setLoading, 
  setError, 
  setCurrentLocation,
  setSelectedCity,
  setCities,
  updateHourlyForecast,
  updateWeeklyForecast
} = weatherSlice.actions;

export default weatherSlice.reducer;