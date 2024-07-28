import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { useQuery } from "@apollo/client";

import {
  HomePage,
  LoginPage,
  RegisterPage,
  ErrorPage,
  ProductPage,
  CartPage,
  ShopPage,
  OrderPage,
  CheckoutPage,
} from "./pages";

import { ProtectedRoute, Footer } from "./components";

import { loginUser } from "./features/userSlice";

import { GET_USER_DETAILS } from "./graphql/Queries/userQueries";

import { useLogout } from "./utils/customHooks";

import { AdminLayout, EditItem, NewItem } from "./pages/Admin";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

// Import user dashboard components
import UserProfile from "./pages/UserDashboard/UserProfile";
import EditingProfile from "./pages/UserDashboard/EditingProfile";
import UserShipping from "./pages/UserDashboard/UserShipping";
import EditingShipping from "./pages/UserDashboard/EditingShipping";
import MainLayout from "./pages/UserDashboard/MainLayout";
import ProtectedProfileRoute from "./components/ProtectedProfileRoute";
import DeleteItem from "./pages/Admin/DeleteItem";
import { PurchaseHistory } from "./pages/UserDashboard";

const App = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { data, loading } = useQuery(GET_USER_DETAILS, {
    skip: !userInfo,
  });

  const { handleLogout } = useLogout();
  const dispatch = useDispatch();

  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (token && jwtDecode(token)?.exp < Date.now() / 1000) {
      localStorage.removeItem("jwtToken");
      handleLogout();
    }
  }, [token, handleLogout]);

  useEffect(() => {
    if (!loading && data && data?.getUserById.id === userInfo?.id) {
      dispatch(loginUser(data?.getUserById, loading));
    }
  }, [dispatch, data, loading, userInfo?.id]);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route path="/new-item" element={<NewItem />} />
          <Route path="/edit-item" element={<EditItem />} />
          <Route path="/delete-item" element={<DeleteItem />} />
        </Route>
        {/* User dashboard routes */}
        <Route
          path="/"
          element={
            <ProtectedProfileRoute>
              <MainLayout />
            </ProtectedProfileRoute>
          }
        >
          <Route path="profile" element={<UserProfile />} />
          <Route path="editingprofile" element={<EditingProfile />} />
          <Route path="shipping" element={<UserShipping />} /> {/* Add this */}
          <Route path="editingshipping" element={<EditingShipping />} />{" "}
          <Route path="/history" element={<PurchaseHistory />} />
          {/* Add this */}
        </Route>
        <Route
          path="/order"
          element={
            <ProtectedProfileRoute>
              <OrderPage />
            </ProtectedProfileRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedProfileRoute>
              <CheckoutPage />
            </ProtectedProfileRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
