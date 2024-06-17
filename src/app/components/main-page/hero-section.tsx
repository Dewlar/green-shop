import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <>
      {/* Background image and overlap lg */}
      <div aria-hidden="true" className="absolute inset-0 hidden sm:flex sm:flex-col">
        <div className="relative w-full flex-1 bg-gray-800">
          <div className="absolute inset-0 overflow-hidden">
            <video className="w-full h-full object-cover object-center" autoPlay={true} loop={true}>
              <source src="./assets/video/hero1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="absolute inset-0 bg-gray-900 opacity-50" />
        </div>
        <div className="h-48 w-full bg-green-50 md:h-56 lg:h-56" />
      </div>

      <div className="relative mx-auto max-w-2xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8">
        {/* Background image and overlap sm */}
        <div aria-hidden="true" className="absolute inset-0 flex flex-col sm:hidden">
          <div className="relative w-full flex-1 bg-gray-800">
            <div className="absolute inset-0 overflow-hidden">
              <img src="./assets/video/hero1.jpg" alt="" className="h-full w-full object-cover object-bottom" />
            </div>
            <div className="absolute inset-0 bg-gray-900 opacity-50" />
          </div>
          <div className="h-56 w-full bg-green-50" />
        </div>
        <div className="relative pt-60 pb-20">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            Breathe life into your décor,
            <br /> with plants delivered to your door
          </h1>
          <div className="mt-4 sm:mt-6 relative">
            <Link
              to="/catalog"
              className="inline-block rounded-md border border-transparent bg-green-600 px-8 py-3 font-medium text-white hover:bg-green-700"
            >
              Shop Collection
            </Link>

            <div className="inline-block rounded-md border border-transparent bg-green-600 px-8 py-3 font-medium text-white absolute -bottom-16 whitespace-nowrap transform left-1/2 -translate-x-1/2">
              10% discount promo code: <span className="font-bold">plant-coupon</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
