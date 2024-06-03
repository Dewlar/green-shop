import React, { useEffect, useState } from 'react';
import { Product } from '@commercetools/platform-sdk';
import ProductMain from '../../components/product/mainLayout';
import HeaderWidthMobile from '../../components/header/header-width-mobile';
import Footer from '../../components/footer/footer';
import { getOneProduct, getProductData } from '../../components/product/getProduct/getDataProduct';

const ProductForm = () => {
  const [productStorage, setProduct] = useState({} as Product);

  useEffect(() => {
    async function response() {
      await getProductData();
      await getOneProduct('76f95e70-0cd4-4b42-94d5-de5f2c288b55').then(({ body }) => {
        setProduct(body);
      });
    }
    response();
  }, []);

  return (
    <div>
      <HeaderWidthMobile></HeaderWidthMobile>
      <ProductMain {...productStorage}></ProductMain>
      <Footer></Footer>
    </div>
  );
};

export default ProductForm;
