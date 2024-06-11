import React from 'react';

const AboutLayout = () => {
  return (
    <div className="bg-white">
      <main className="isolate">
        {/* Hero section */}
        <div className="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-green-100/30 pt-14">
          <div
            className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-green-600/10 ring-1 ring-green-100 sm:-mr-80 lg:-mr-96"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:col-span-2 xl:col-auto">
                We’re a <span className="text-green-500">R.S.</span>
                <span className="text-gray-500">Survivor</span> team.
              </h1>
              <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                <p className="text-xl leading-8 text-gray-600 text-justify">
                  We present a project created as part of the RSSchool coursework. The project is a web application for
                  an online store. The project was created using the React library and uses the eCommerce tools API.
                  Successful implementation was influenced by such factors as: clear division of tasks among the team.
                  Regular meetings to discuss current progress, possible problems and exchange ideas. Helping and
                  supporting each other throughout the project.
                </p>
              </div>
              <img
                src="./assets/about/about.jpg"
                alt=""
                className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
              />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
        </div>

        {/* Content section */}
        <div className="my-32 overflow-hidden sm:mt-40">
          <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-2 xl:gap-x-8">
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:col-span-2">
                Our team.
              </h1>
              <div className="mt-6 max-w-xl lg:mt-0">
                <p className="text-xl leading-8 text-gray-600 text-justify">
                  All members of our team are very friendly and sociable. The team&apos;s positive mood and support for
                  each other help to overcome any difficulties. As a team, we are very different. But we are united by
                  one common goal.
                </p>
                <p className="mt-6 font-semibold text-xl leading-7 text-gray-600">
                  We are a team, we are <span className="text-green-500">R.S.</span>
                  <span className="text-gray-500">Survivor!</span>
                </p>
              </div>
              <img
                src="./assets/about/about.jpg"
                alt=""
                className="mt-10 justify-self-end aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:mt-36"
              />
              <img
                src="./assets/about/photo.jpg"
                alt=""
                className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:-mt-32 lg:max-w-none xl:-mt-40"
              />
              <img
                src="./assets/about/about.jpg"
                alt=""
                className="mt-10 justify-self-end aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:mt-36"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutLayout;
