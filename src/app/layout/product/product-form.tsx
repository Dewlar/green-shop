import React, { useState } from 'react';
import SliderMain from '../../components/product/slider/sliderLayout';
import {
  getProductData,
  // getProductDataTypes,
  // getProductDiscounts,
  getOneProduct,
} from '../../components/product/getProduct/getDataProduct';

const ProductForm = () => {
  const [productStorage, setProduct] = useState('');
  getProductData().then((item) => {
    console.log(item);
  });
  // getProductDataTypes().then((item) => {
  //   console.log(item);
  // });
  // getProductDiscounts().then((item) => {
  //   console.log(item);
  // });
  getOneProduct('8b164fdb-3665-4f13-b3a0-6bb1e23123c2').then(({ body }) => {
    setProduct(JSON.stringify(body));
    console.log(productStorage);
  });
  return <SliderMain data={productStorage}></SliderMain>;
};

export default ProductForm;
