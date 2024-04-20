import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrders, fetchOrder, updateOrder } from './orderAPI';

const initialState = {
  orders: [],
  status: 'idle',
  curentOrder : null,
  totalOrders : 0,
};


export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchOrderAsync = createAsyncThunk(
  'order/fetchOrder',
  async () => {
    const response = await fetchOrder();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async (order) => {
    const response = await fetchAllOrders(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state)=>{
      state.curentOrder = null;
    } 
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.curentOrder = action.payload;;
      })
      // .addCase(fetchAllOrdersAsync.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.orders = action.payload.orders ;
      //   state.totalOrders = action.payload.totalOrders;
      // })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
       const index =  state.orders.findIndex(order => order.id === action.payload.id);
       state.orders[index] = action.payload;
      })
      .addCase(fetchOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload;
        state.totalOrders = action.payload.totalOrders;
      });
  },
});


export const { resetOrder } = orderSlice.actions;
export const selectCurrentOrder = (state) => state.order.curentOrder;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;
export const selectStatus = (state) => state.order.status;

export default orderSlice.reducer;