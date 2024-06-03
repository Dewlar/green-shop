import React from 'react';
import Footer from '../components/footer/footer';
import HeaderWidthMobile from '../components/header/header-width-mobile';
import CatalogForm from '../layout/catalog-form/catalog-form';

const Catalog = () => {
  return (
    <div>
      <HeaderWidthMobile></HeaderWidthMobile>
      <CatalogForm></CatalogForm>
      <Footer></Footer>
    </div>
  );
};

export default Catalog;
