import React from 'react';
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
