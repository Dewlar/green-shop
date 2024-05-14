import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer/footer';
import HeaderWidthMobile from '../components/header/header-width-mobile';
import Policies from '../components/main-page/policies';
import Trending from '../components/main-page/trending';
import Collections from '../components/main-page/collections';

const Home = () => {
  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <HeaderWidthMobile></HeaderWidthMobile>

      <main>
        {/* Hero section */}
        <div className="relative">
          {/* Background image and overlap */}
          <div aria-hidden="true" className="absolute inset-0 hidden sm:flex sm:flex-col">
            <div className="relative w-full flex-1 bg-gray-800">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg"
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="absolute inset-0 bg-gray-900 opacity-50" />
            </div>
            <div className="h-32 w-full bg-white md:h-40 lg:h-48" />
          </div>

          <div className="relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8">
            {/* Background image and overlap */}
            <div aria-hidden="true" className="absolute inset-0 flex flex-col sm:hidden">
              <div className="relative w-full flex-1 bg-gray-800">
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg"
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="absolute inset-0 bg-gray-900 opacity-50" />
              </div>
              <div className="h-48 w-full bg-white" />
            </div>
            <div className="relative py-32">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">Mid-Season Sale</h1>
              <div className="mt-4 sm:mt-6">
                <Link
                  to="/catalog"
                  className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 font-medium text-white hover:bg-indigo-700"
                >
                  Shop Collection
                </Link>
              </div>
            </div>
          </div>

          <Collections></Collections>
        </div>

        <Trending></Trending>

        <Policies></Policies>
      </main>

      <Footer></Footer>
    </div>
  );
};

export default Home;
