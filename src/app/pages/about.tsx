import React from 'react';
import HeaderWidthMobile from '../components/header/header-width-mobile';
import Footer from '../components/footer/footer';
import AboutLayout from '../layout/about/about-layout';

const About = () => {
  return (
    <div>
      <HeaderWidthMobile></HeaderWidthMobile>
      <AboutLayout></AboutLayout>
      <Footer></Footer>
    </div>
  );
};

export default About;
