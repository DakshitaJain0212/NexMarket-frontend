import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUser,fetchLoggedInUserOrders, updateUser } from './userAPI';


const initialState = {
  userInfo: null,
  status: 'idle',
  userOrders: [],
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (order) => {
    const response = await fetchLoggedInUserOrders(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchLoggedInUserAsync  = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (userId) => {
    const response = await fetchLoggedInUser(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
     
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.userInfo.orders = action.payload;
      state.userOrders.push(action.payload);

    })
      .addCase(fetchLoggedInUserAsync .pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync .fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      });
  },
});

export const { increment } = userSlice.actions;

export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserInfoStatus = (state) => state.user.status;

export default userSlice.reducer;