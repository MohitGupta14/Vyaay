// src/store/membersSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchSplits = createAsyncThunk('splits/fetchSplits', async (id : number) => {
  const response = await axios.get(`/api/splits?action=getSpltByTranactionId&transactionId=${id}`);
  return response.data;
});

interface SplitsState {
  splits: any[];  // Define the type of the members (you can refine this based on your API response)
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SplitsState = {
  splits : [],
  status: 'idle',  // Set initial status to idle (not yet loading)
  error: null,
};

export const splitsSlice = createSlice({
  name: 'splits',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle the pending state of the async request
      .addCase(fetchSplits.pending, (state) => {
        state.status = 'loading';
      })
      // Handle the fulfilled state when data is fetched
      .addCase(fetchSplits.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.splits = action.payload;  // Save members to the state
      })
      // Handle any errors that occurred during the fetch
      .addCase(fetchSplits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch members';
      });
  },
});

export default splitsSlice.reducer;