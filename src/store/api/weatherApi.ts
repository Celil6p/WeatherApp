import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import DummyWeather from '@/data/DummyWeather.json';

// Define the shape of our weather data types
export interface HourlyForecast {
  time: string;
  temperature: number;
  icon: string;
  precipChance: number;
}

export interface WeeklyForecast {
  day: string;
  icon: string;
  highTemp: number;
  lowTemp: number;
  precipChance: number;
}

export interface CityWeather {
  city?: string;
  name?: string;
  temperature: number;
  description: string;
  highTemp: number;
  lowTemp: number;
  hourlyForecast: HourlyForecast[];
  weeklyForecast?: WeeklyForecast[];
}

export interface WeatherData {
  currentLocation: CityWeather;
  cities: CityWeather[];
}

// Create an API service using RTK Query
export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    // Get all weather data
    getWeatherData: builder.query<WeatherData, void>({
      // Simulate an API request that returns our dummy data
      queryFn: () => {
        // Simulate network delay
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: DummyWeather as WeatherData });
          }, 500);
        });
      },
    }),
    
    // Get current location weather
    getCurrentLocationWeather: builder.query<CityWeather, void>({
      queryFn: () => {
        // Simulate network delay
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: (DummyWeather as WeatherData).currentLocation });
          }, 300);
        });
      },
    }),
    
    // Get weather for a specific city
    getCityWeather: builder.query<CityWeather | undefined, string>({
      queryFn: (cityName) => {
        // Simulate network delay
        return new Promise((resolve) => {
          setTimeout(() => {
            const city = (DummyWeather as WeatherData).cities.find(
              (city) => city.name?.toLowerCase() === cityName.toLowerCase()
            );
            resolve({ data: city });
          }, 300);
        });
      },
    }),
    
    // Get all cities
    getAllCities: builder.query<CityWeather[], void>({
      queryFn: () => {
        // Simulate network delay
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: (DummyWeather as WeatherData).cities });
          }, 300);
        });
      },
    }),
  }),
});

// Export the auto-generated hooks for the endpoints
export const {
  useGetWeatherDataQuery,
  useGetCurrentLocationWeatherQuery,
  useGetCityWeatherQuery,
  useGetAllCitiesQuery,
} = weatherApi; 