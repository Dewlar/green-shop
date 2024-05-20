import React from 'react';
import './story-section.scss';

const StorySection = () => {
  return (
    <section className="w-full bg-green-50 py-32">
      <div className="flex flex-col mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-base">
        <div className="flex flex-col relative">
          <div aria-hidden="true" className="absolute inset-0 flex dotted-path">
            <div className="relative w-full flex-1">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="./assets/story/dotted-path2.png"
                  alt=""
                  className="h-auto w-full object-cover object-bottom"
                />
              </div>
            </div>
          </div>
          {/* top section */}
          <div className="relative flex flex-wrap">
            <div className="max-w-96">
              <h2 className="text-4xl mb-8 text-gray-900">
                From our greenhouse <br /> <b>to your house.</b>
              </h2>
              <p className="text-xl text-gray-600">
                Grown in a local Aussie environment, indoor plants delivered to a happy Aussie home — our indoor plants
                are cared for like our own children — except better behaved.
              </p>
            </div>
            <div className="flex items-center justify-end ml-auto max-w-md md:w-7/12 mt-12 lg:mt-0">
              <div className="text-sm text-gray-600 pr-6 md:hidden">
                Our babies begin their lives in the safety of the greenhouse.
              </div>
              <div className="max-w-96">
                <img src="./assets/story/greenhouse.png" alt="" className="rounded" />
              </div>
              <div className="text-sm text-gray-600 sm:w-44 hidden md:block">
                Our babies begin their lives in the safety of the greenhouse.
              </div>
            </div>
          </div>
          {/* middle section */}
          <div className="relative flex flex-wrap py-12 sm:py-20">
            <div className="flex w-full items-center max-w-96">
              <div>
                <img src="./assets/story/smile-pot.png" alt="" className="w-full object-contain rounded" />
              </div>
              <div className="sm:w-44 sm:flex-grow-0 sm:flex-shrink-0 lg:w-2/5 pl-6 text-center text-sm text-gray-600">
                Our babies begin their lives in the safety of the greenhouse.
              </div>
            </div>
            <div className="flex w-full ml-auto mt-12 max-w-72 sm:max-w-80 md:mt-0 bg-green-50">
              <img src="./assets/story/box.png" alt="" className="w-full max-w-80 object-contain rounded" />
            </div>
          </div>
          {/* bottom section */}
          <div className="relative flex flex-col self-center">
            <div className="max-w-2xl">
              <img src="./assets/story/enjoy.jpg" alt="" className="rounded" />
            </div>
            <div className="max-w-2xl text-sm text-gray-600 mt-2.5">
              Your new best friend arrives <br /> ready to fill your life with joy.
            </div>
            <div className="absolute -top-16 left-16">
              <img src="./assets/story/smile.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
