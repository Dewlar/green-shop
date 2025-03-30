import React from 'react';
import HeaderWidthMobile from '../components/header/header-width-mobile';
import Footer from '../components/footer/footer';
import BasketForm from '../layout/basket-form/basket-form';

const Cart = () => {
  return (
    <div>
      <HeaderWidthMobile></HeaderWidthMobile>
      <BasketForm></BasketForm>
      <Footer></Footer>
    </div>
  );
};

export default Cart;
