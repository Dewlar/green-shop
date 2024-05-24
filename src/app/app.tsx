import React from 'react';
import './app.scss';
import { Route, Routes } from 'react-router-dom';
import About from './pages/about';
import Login from './pages/login';
import Page404 from './pages/page404';
import Product from './pages/product';
import Cart from './pages/cart';
import Catalog from './pages/catalog';
import Home from './pages/home';
import Signup from './pages/signup';
import UserProfile from './pages/user-profile';
import RouteGuard from './route/route-guard';
// import { useStateContext } from './state/state-context';

const App = () => {
  // const { auth } = useStateContext();
  return (
    <Routes>
      <Route element={<Product />} path="product" />
      <Route element={<Cart />} path="cart" />
      <Route element={<Catalog />} path="catalog" />
      <Route element={<Home />} path="/" />
      <Route
        element={
          <RouteGuard redirectPath={'/'}>
            <Login />
          </RouteGuard>
        }
        path="login"
      />
      <Route element={<Signup />} path="signup" />
      <Route element={<About />} path="about" />
      <Route element={<UserProfile />} path="profile" />
      <Route element={<Page404 />} path="*" />
    </Routes>
  );
};

export default App;
