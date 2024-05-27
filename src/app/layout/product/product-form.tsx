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

      await getOneProduct('08bb1b50-0429-46e2-80ec-18f6d00c4d89').then(({ body }) => {
        setProduct(body);
      });
    }
    response();
  }, []);

  return (
    <div>
      <HeaderWidthMobile></HeaderWidthMobile>
      {/* <SliderMain {...productStorage}></SliderMain> */}
      <ProductMain {...productStorage}></ProductMain>
      <Footer></Footer>
    </div>
  );
};

export default ProductForm;
