import React from 'react';
import './app.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/about';
import Login from './pages/login';
import Page404 from './pages/page404';
import Product from './pages/product';
import Basket from './pages/basket';
import Catalog from './pages/catalog';
import Home from './pages/home';
import Signup from './pages/signup';

const App = () => {
  return (
    <BrowserRouter>
      <div className="wrap-header">
        <main className="main">Navigation bar or header</main>
      </div>
      <Routes>
        <Route element={<Product />} path="product" />
        <Route element={<Basket />} path="basket" />
        <Route element={<Catalog />} path="catalog" />
        <Route element={<Home />} path="home" />
        <Route element={<Login />} path="login" />
        <Route element={<Signup />} path="signup" />
        <Route element={<About />} path="about" />
        <Route element={<Page404 />} path="*" />
      </Routes>
    </BrowserRouter>
  );
};

export function testFunction(test: number) {
  return test + 1;
}

console.log(testFunction(2));
export default App;
