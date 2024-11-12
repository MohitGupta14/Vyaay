// src/store/membersSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTransactions } from './transactionApi';

// 1. Create an async thunk for fetching group members
export const fetchTransaction = createAsyncThunk('transactions/fetchTransactions', async (id: number) => {
    const transactions = await fetchTransactions(id);
    return transactions;
});


// 2. Create the slice for members state
interface TransctionState {
  transactions: any[];  // Define the type of the members (you can refine this based on your API response)
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TransctionState = {
  transactions: [],
  status: 'idle',  // Set initial status to idle (not yet loading)
  error: null,
};

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle the pending state of the async request
      .addCase(fetchTransaction.pending, (state) => {
        state.status = 'loading';
      })
      // Handle the fulfilled state when data is fetched
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions = action.payload;  // Save members to the state
      })
      // Handle any errors that occurred during the fetch
      .addCase(fetchTransaction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch members';
      });
  },
});

export default transactionSlice.reducer;