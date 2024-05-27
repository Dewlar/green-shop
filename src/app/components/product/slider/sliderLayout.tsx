import React, { useState } from 'react';
import { Product, Image } from '@commercetools/platform-sdk';
import { Tab } from '@headlessui/react';

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

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      {/* Image selector */}
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {imagesOfSlides.map((image, index) => (
            <Tab
              key={index}
              className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
            >
              {({ selected }) => (
                <>
                  <span className="sr-only">{`image${index}`}</span>
                  <span className="absolute inset-0 overflow-hidden rounded-md">
                    <img
                      src={image.url}
                      alt=""
                      className="h-full w-full object-cover object-center"
                      onClick={() => setIndexSlide(index)}
                    />
                  </span>
                  <span
                    className={classNames(
                      selected ? 'ring-indigo-500' : 'ring-transparent',
                      'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </Tab>
          ))}
        </Tab.List>
      </div>
      <div id="default-carousel" className="relative w-5/6 mt-0 ml-auto mb-0 mr-auto" data-carousel="slide">
        <div className="w-100 h-100 flex">
          <div className="relative overflow-hidden rounded-lg w-100 h-100 flex">
            {imagesOfSlides?.map((image, index) => (
              <img
                src={`${image.url}`}
                className={`block w-max-auto h-full shrink-0 grow-0 transition-[translate] ease-in-out duration-700`}
                alt="..."
                key={index}
                style={{ translate: `${-100 * indexSlide}%` }}
              />
            ))}
          </div>
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
              onClick={() => setIndexSlide(index)}
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
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
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
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </Tab.Group>
  );
};

export default SliderMain;
