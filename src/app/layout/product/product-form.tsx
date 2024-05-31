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
      await getOneProduct('3e3b9cbe-6558-4826-b0ee-5b5f408efd8d').then(({ body }) => {
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
