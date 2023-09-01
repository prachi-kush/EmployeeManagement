// yourReducer.js
import { createSlice } from '@reduxjs/toolkit';

const yourSlice = createSlice({
  name: 'yourSliceName',
  initialState: {
    // Define your initial state here
    data: [],
    isLoading: false,
  },
  reducers: {
    // Define your actions and reducers here
    setData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setData, setLoading } = yourSlice.actions;
export default yourSlice.reducer;
