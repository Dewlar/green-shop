import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const MultiCarousel = () => {
  return (
    <Carousel
      additionalTransfrom={0}
      arrows={false}
      autoPlay={true}
      autoPlaySpeed={5000}
      centerMode={false}
      className="max-h-96 max-w-7xl mx-auto mb-2"
      containerClass="container-with-dots"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 1,
          partialVisibilityGutter: 10,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 10,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 1,
          partialVisibilityGutter: 10,
        },
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={true}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      <div className="relative w-full max-h-96 h-full mx-auto block">
        <div className="absolute inset-0 flex justify-center items-center z-10">
          <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl transform -translate-x-1/2 -translate-y-1/2">
            Growing <br /> happiness
          </h2>
        </div>
        <img className="w-full h-full object-cover" src="/assets/carousel/caorusel_banner_1.png" alt="" />
      </div>
      <div className="relative w-full max-h-96 h-full mx-auto block">
        <div className="absolute inset-0 items-center justify-end flex z-10 px-2 lg:px-8">
          <h2 className="text-white font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl">
            Get House Plants <br /> to fill your life with joy
          </h2>
        </div>
        <img className="w-full h-full object-cover" src="/assets/carousel/caorusel_banner_2.png" alt="" />
      </div>
      <div className="relative w-full max-h-96 h-full mx-auto block">
        <div className="absolute inset-0 flex justify-center items-center z-10">
          <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl transform -translate-x-2/3 translate-y-1/2">
            Pet <br /> friendly
          </h2>
        </div>
        <img className="w-full h-full object-cover" src="/assets/carousel/caorusel_banner_3.jpg" alt="" />
      </div>
      <div className="relative w-full max-h-96 h-full mx-auto block">
        <div className="absolute inset-0 flex justify-center items-end z-10">
          <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl pb-6 sm:pb-12">
            Raised with love and care
          </h2>
        </div>
        <img className="w-full h-full object-cover" src="/assets/carousel/caorusel_banner_45.jpg" alt="" />
      </div>
      <div className="relative w-full max-h-96 h-full mx-auto block">
        <div className="absolute inset-0 flex flex-col justify-end items-center z-10 pb-6 sm:pb-12">
          <p className="text-white font-semibold text-md sm:text-xl md:text-3xl">Our purpose is simple:</p>
          <p className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            to make you ecstatically happy
          </p>
          <p className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">via our plants</p>
        </div>
        <img className="w-full h-full object-cover" src="/assets/carousel/caorusel_banner_5.jpg" alt="" />
      </div>
    </Carousel>
  );
};

export default MultiCarousel;
