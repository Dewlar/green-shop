import React, { useEffect, useState } from 'react';
import { Product } from '@commercetools/platform-sdk';
// import SliderMain from '../../components/product/slider/sliderLayout';
import ProductMain from '../../components/product/mainLayout';
import HeaderWidthMobile from '../../components/header/header-width-mobile';
import Footer from '../../components/footer/footer';
import { getOneProduct, getProductData } from '../../components/product/getProduct/getDataProduct';

const ProductForm = () => {
  const [productStorage, setProduct] = useState({} as Product);

  useEffect(() => {
    async function response() {
      const item = await getProductData();
      console.log(item);

      await getOneProduct('b7e1546f-e7a1-4ab7-9ae7-65bc1c7240f6').then(({ body }) => {
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
