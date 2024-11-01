import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFriends } from './friendApi';

interface User {
  id : number;
  email : string;
  password : string;
  createdAt : string
}

interface Friend {
    id: number;
    userId: number;
    friendId : number;
    friend : User;
}

interface FriendsState {
    friends: Friend[];
    loading: boolean;
    error: string | null;
}

const initialState: FriendsState = {
    friends: [],
    loading: false,
    error: null,
};

export const getFriendById = createAsyncThunk('friends/getFriendById', async (id: number) => {
    const friend = await fetchFriends(id);
    return friend;
});

export const friendSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFriendById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFriendById.fulfilled, (state, action) => {
                state.loading = false;
                state.friends.push(action.payload); // Assuming you want to push the friend to the friends array
            })
            .addCase(getFriendById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch friend';
            });
    },
});

