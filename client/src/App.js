import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { useQuery } from '@apollo/client';

import { HomePage, LoginPage, RegisterPage, ErrorPage } from './pages';

import { ProtectedRoute, Footer } from './components';

import { loginUser } from './features/userSlice';

import { GET_USER_DETAILS } from './graphql/Queries/userQueries';

import { useLogout } from './utils/customHooks';

const App = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { data, loading } = useQuery(GET_USER_DETAILS, {
    skip: !userInfo,
  });

  const { handleLogout } = useLogout();
  const dispatch = useDispatch();

  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    if (token && jwtDecode(token)?.exp < Date.now() / 1000) {
      localStorage.removeItem('jwtToken');
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
        <Route exact path='/' element={<HomePage />} />

        <Route path='*' element={<ErrorPage />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
