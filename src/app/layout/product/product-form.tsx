import React, { useEffect, useState } from 'react';
import { Product } from '@commercetools/platform-sdk';
import { useParams } from 'react-router-dom';
import ProductMain from '../../components/product/mainLayout';
import HeaderWidthMobile from '../../components/header/header-width-mobile';
import Footer from '../../components/footer/footer';
import { getOneProduct } from '../../api/catalog/getProductsAll';

const ProductForm = () => {
  const { id } = useParams();
  const [productStorage, setProduct] = useState({} as Product);
  const depth = '2';

  useEffect(() => {
    async function response() {
      if (!id) return;
      await getOneProduct(id).then(({ body }) => {
        setProduct(body);
      });
    }
    response();
  }, [id]);

  return (
    <div>
      <HeaderWidthMobile depth={depth}></HeaderWidthMobile>
      <ProductMain {...productStorage}></ProductMain>
      <Footer></Footer>
    </div>
  );
};

export default ProductForm;
