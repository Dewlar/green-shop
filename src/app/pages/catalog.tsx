import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Footer from '../components/footer/footer';
import HeaderWidthMobile from '../components/header/header-width-mobile';
import CatalogForm from '../layout/catalog-form/catalog-form';

const Catalog = () => {
  const { category, id } = useParams();
  return id ? (
    <Outlet />
  ) : (
    <div>
      <HeaderWidthMobile></HeaderWidthMobile>
      <CatalogForm movedCategory={category}></CatalogForm>
      <Footer></Footer>
    </div>
  );
};

export default Catalog;
