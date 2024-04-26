import "./App.css";
import React, { useEffect } from "react";
// import Counter from './features/counter/Counter';
// import ProductList from './features/product-list/ProductList';
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import PageNotFound from "./pages/pageNotFound";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Protected from "./features/auth/components/Protected";
import {
  checkAuthAsync,
  selectLoggedInUser,
  selectUserChecked,
} from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/CartSlice";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrderPage from "./pages/UserOrderPage";
import UserProfilePage from "./pages/UserProfilePage";

import ForgetPaswordPage from "./pages/ForgetPasswordPage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import { fetchProducts } from "./features/product/ProductListAPI";
import StripeCheckout from "./pages/StripeCheckout";
import { fetchAllProductsAsync } from "./features/product/PrductListSlice";

import ResetPasswordPage from "./pages/ResetPasswordPage"
 
// const options = {
//   timeout: 5000,
//   position: positions.BOTTOM_LEFT,
// };

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Protected>
        <Home/>
       </Protected>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage>,
  },
  {
    path: '/signup',
    element: <SignupPage></SignupPage>,
  },
  {
    path: '/cart',
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: '/checkout',
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: '/product-detail/:id',
    element: (
      <Protected>
        <ProductDetailsPage></ProductDetailsPage>
      </Protected>
    ),
  },
  {
    path: '/admin/product-detail/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/orders',
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form/edit/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/order-success/:id',
    element: (
      <Protected>
        <OrderSuccessPage></OrderSuccessPage>{' '}
      </Protected>
    ),
  },
  {
    path: '/my-orders',
    element: (
      <Protected>
        <UserOrderPage></UserOrderPage>{' '}
      </Protected>
    ),
  },
  {
    path: '/profile',
    element: (
      <Protected>
        <UserProfilePage></UserProfilePage>{' '}
      </Protected>
    ),
  },
  {
    path: '/stripe-checkout/',
    element: (
      <Protected>
        <StripeCheckout></StripeCheckout>
      </Protected>
    ),
  },
  {
    path: '/forgot-password',
    element: <ForgetPaswordPage></ForgetPaswordPage>,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage></ResetPasswordPage>,
  },
  {
    path: '*',
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  const dispatch = useDispatch();
  // const user = useSelector(selectLoggedInUser);
  const user = JSON.parse(localStorage.getItem("user"));
  // const userChecked = useSelector(selectUserChecked);
  console.log(user);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if(token){
      dispatch(checkAuthAsync(token));
    }
  }, [dispatch]);

  useEffect(() => {

    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      // we can get req.user by token on backend so no need to give in front-end
      dispatch(fetchLoggedInUserAsync(user.id));
      // dispatch(fetchAllProductsAsync());
    }
  }, [dispatch, user]);

  return (
    <>
    {/* {!token && <LoginPage></LoginPage>} */}
      <div className="App">
        {/* {userChecked && ( */}
          {/* <Provider template={AlertTemplate} {...options}> */}
            <RouterProvider router={router} />
          {/*  </Provider> */}
        {/* )} */}
        {/* Link must be inside the Provider */}
      </div>
    </>
  );
}

export default App;