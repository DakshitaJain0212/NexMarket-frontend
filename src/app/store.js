import { configureStore,createReducer } from '@reduxjs/toolkit';
import productReducer from '../features/product/PrductListSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/CartSlice';
import orderReducer from '../features/order/orderSlice';
import userReducer from '../features/user/userSlice'

export const store = configureStore({
    reducer: {
        product: productReducer,
        auth: authReducer,
        cart: cartReducer,
        order: orderReducer,
        user : userReducer,
    },
});