import React, { useState } from 'react';
import { Product, Image } from '@commercetools/platform-sdk';

const SliderMain = (data: Product) => {
  console.log(data);
  const imagesOfSlides: Image[] = data?.masterData?.current?.masterVariant?.images || [];
  const [indexSlide, setIndexSlide] = useState(0);

  const toForward = () => {
    const index = indexSlide === imagesOfSlides.length - 1 ? 0 : indexSlide + 1;
    setIndexSlide(index);
    console.log(indexSlide);
  };

  const toPrevious = () => {
    const index = indexSlide === 0 ? imagesOfSlides.length - 1 : indexSlide - 1;
    setIndexSlide(index);
    console.log(indexSlide);
  };

  return (
    <div id="default-carousel" className="relative w-3/6 mt-0 ml-auto mb-0 mr-auto" data-carousel="slide">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96 slides">
        {imagesOfSlides?.map((image, index) => (
          <div id={`Slide item ${index}`} className=" duration-700 ease-in-out" key={index} data-carousel-item>
            <img
              src={`${image.url}`}
              className="absolute block w-max-auto h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-md"
              alt="..."
            />
          </div>
        ))}
      </div>
      <div className="buttonSlideBottomWrapper flex w-fit absolute z-30 -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {imagesOfSlides?.map((_image, index) => (
          <button
            key={index}
            type="button"
            className="w-3 h-3 rounded-full bg-green-600 hover:bg-green-700"
            aria-current="true"
            aria-label={`Slide ${index}`}
            data-carousel-slide-to={index}
          ></button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => toPrevious()}
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none previous"
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-600 dark:bg-gray-800/30 group-hover:bg-green-700 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        onClick={() => toForward()}
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none next"
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-600 dark:bg-gray-800/30 group-hover:bg-green-700 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default SliderMain;
