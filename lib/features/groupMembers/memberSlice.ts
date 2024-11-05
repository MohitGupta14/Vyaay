// src/store/membersSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGroupMembers } from './membersApi';

// 1. Create an async thunk for fetching group members
export const fetchMembers = createAsyncThunk('members/fetchGroupMembers', async (id: number) => {
    const groupMembers = await fetchGroupMembers(id);
    return groupMembers;
});


// 2. Create the slice for members state
interface MembersState {
  members: any[];  // Define the type of the members (you can refine this based on your API response)
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MembersState = {
  members: [],
  status: 'idle',  // Set initial status to idle (not yet loading)
  error: null,
};

export const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle the pending state of the async request
      .addCase(fetchMembers.pending, (state) => {
        state.status = 'loading';
      })
      // Handle the fulfilled state when data is fetched
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.members = action.payload;  // Save members to the state
      })
      // Handle any errors that occurred during the fetch
      .addCase(fetchMembers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch members';
      });
  },
});

export default membersSlice.reducer;
