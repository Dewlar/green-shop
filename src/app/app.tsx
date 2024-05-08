import React from 'react';
import './app.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/about';
import Login from './pages/login';
import Page404 from './pages/page404';
import Product from './pages/product';
import Cart from './pages/cart';
import Catalog from './pages/catalog';
import Home from './pages/home';
import Signup from './pages/signup';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Product />} path="product" />
        <Route element={<Cart />} path="basket" />
        <Route element={<Catalog />} path="catalog" />
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="login" />
        <Route element={<Signup />} path="signup" />
        <Route element={<About />} path="about" />
        <Route element={<Page404 />} path="*" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
