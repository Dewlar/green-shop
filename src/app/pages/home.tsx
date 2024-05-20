import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer/footer';
import HeaderWidthMobile from '../components/header/header-width-mobile';
import Policies from '../components/main-page/policies';
import Trending from '../components/main-page/trending';
import Collections from '../components/main-page/collections';
import HeroSection from '../components/main-page/hero-section';
import StorySection from '../components/main-page/story-section';

const Home = () => {
  return (
    <div className="bg-white">
      {/* Header with mobile burger menu */}
      <div className="bg-green-50">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="text-sm text-gray-500">Cross check links:</div>
          <div className="flex items-center space-x-6">
            <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-gray-700">
              Sign in
            </Link>
            <Link to="/signup" className="text-sm font-medium text-gray-500 hover:text-gray-700">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <HeaderWidthMobile></HeaderWidthMobile>

      <main>
        {/* Hero section */}
        <div className="relative">
          <HeroSection></HeroSection>
          <Collections></Collections>
        </div>
        {/* Story */}
        <StorySection></StorySection>
        {/* Trending */}
        <Trending></Trending>
        {/* Policies */}
        <Policies></Policies>
      </main>

      <Footer></Footer>
    </div>
  );
};

export default Home;
