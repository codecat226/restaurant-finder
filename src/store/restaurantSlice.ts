import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Restaurant {
  id: string;
  name: string;
  distance: number;
  photo: string | null;
  rating: number;
}

interface RestaurantState {
  restaurants: Restaurant[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RestaurantState = {
  restaurants: [],
  status: 'idle',
  error: null
};

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    fetchRestaurantsFulfilled: (state, action: PayloadAction<Restaurant[]>) => {
      state.status = 'succeeded';
      state.restaurants = action.payload;
    },
    fetchRestaurantsFailed: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});

export const { fetchRestaurantsFulfilled, fetchRestaurantsFailed } = restaurantSlice.actions;

export default restaurantSlice.reducer;
