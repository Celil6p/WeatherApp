import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherState {
  currentWeather: any | null;
  forecast: any[];
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  currentWeather: null,
  forecast: [],
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
    setCurrentWeather: (state, action: PayloadAction<any>) => {
      state.currentWeather = action.payload;
    },
    setForecast: (state, action: PayloadAction<any[]>) => {
      state.forecast = action.payload;
    },
  },
});

export const { setLoading, setError, setCurrentWeather, setForecast } = weatherSlice.actions;

export default weatherSlice.reducer;