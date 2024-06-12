import React from 'react';

const AboutLayout = () => {
  return (
    <div className="bg-white">
      <main className="isolate">
        {/* Hero section */}
        <div className="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-teal-100/30 pt-14">
          <div
            className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-teal-600/40 ring-1 ring-green-100 sm:-mr-80 lg:-mr-96"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-7xl px-6 py-32 sm:py-16 lg:px-8">
            <div className="mx-auto lg:mx-0 grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:col-span-2 xl:col-auto">
                We’re a <span className="text-green-500">R.S.</span>
                <span className="text-gray-500">Survivor</span> team.
              </h1>
              <div className="mt-6 max-w-2xl lg:mt-0 xl:col-end-1 xl:row-start-1">
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
                className="mt-10 aspect-[16/9] w-full max-w-none rounded-2xl object-cover sm:mt-16 lg:aspect-[6/5] lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
              />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
        </div>

        {/* Team info section */}
        <div className="bg-white pb-16 pt-24 sm:pb-24 sm:pt-32 xl:pb-32">
          <div className="bg-teal-900/70 pb-20 sm:pb-24 xl:pb-0">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
              <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
                <div className="relative aspect-[2/1] h-full md:-mx-8 xl:mx-0 xl:aspect-[2/3]">
                  <img
                    className="absolute inset-0 h-full w-full rounded-2xl bg-gray-800 object-cover shadow-2xl"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:px-16 xl:py-24">
                <div className="relative isolate pt-6 sm:pt-12">
                  <div className="text-xl font-semibold leading-8 text-white sm:text-2xl sm:leading-9">
                    <p>
                      Gravida quam mi erat tortor neque molestie. Auctor aliquet at porttitor a enim nunc suscipit
                      tincidunt nunc. Et non lorem tortor posuere. Nunc eu scelerisque interdum eget tellus non nibh
                      scelerisque bibendum.
                    </p>
                  </div>
                  <div className="mt-8 text-base">
                    <div className="font-semibold text-white">Judith Black</div>
                    <div className="mt-1 text-gray-600">CEO of Workcation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white pb-16 pt-24 sm:pb-24 sm:pt-32 xl:pb-32">
          <div className="bg-teal-900/70 pb-20 sm:pb-24 xl:pb-0">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row-reverse xl:items-stretch">
              <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
                <div className="relative aspect-[2/1] h-full md:-mx-8 xl:mx-0 xl:aspect-[2/3]">
                  <img
                    className="absolute inset-0 h-full w-full rounded-2xl bg-gray-800 object-cover shadow-2xl"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:px-16 xl:py-24">
                <div className="relative isolate pt-6 sm:pt-12 text-right">
                  <div className="text-xl font-semibold leading-8 text-white sm:text-2xl sm:leading-9">
                    <p>
                      Gravida quam mi erat tortor neque molestie. Auctor aliquet at porttitor a enim nunc suscipit
                      tincidunt nunc. Et non lorem tortor posuere. Nunc eu scelerisque interdum eget tellus non nibh
                      scelerisque bibendum.
                    </p>
                  </div>
                  <div className="mt-8 text-base">
                    <div className="font-semibold text-white">Judith Black</div>
                    <div className="mt-1 text-gray-600">CEO of Workcation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white pb-16 pt-24 sm:pb-24 sm:pt-32 xl:pb-32">
          <div className="bg-teal-900/70 pb-20 sm:pb-24 xl:pb-0">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
              <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
                <div className="relative aspect-[2/1] h-full md:-mx-8 xl:mx-0 xl:aspect-[2/3]">
                  <img
                    className="absolute inset-0 h-full w-full rounded-2xl bg-gray-800 object-cover shadow-2xl"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:px-16 xl:py-24">
                <div className="relative isolate pt-6 sm:pt-12">
                  <div className="text-xl font-semibold leading-8 text-white sm:text-2xl sm:leading-9">
                    <p>
                      Gravida quam mi erat tortor neque molestie. Auctor aliquet at porttitor a enim nunc suscipit
                      tincidunt nunc. Et non lorem tortor posuere. Nunc eu scelerisque interdum eget tellus non nibh
                      scelerisque bibendum.
                    </p>
                  </div>
                  <div className="mt-8 text-base">
                    <div className="font-semibold text-white">Judith Black</div>
                    <div className="mt-1 text-gray-600">CEO of Workcation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team section */}
        <div className="my-24 overflow-hidden sm:mt-24">
          <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8 justify-center">
            <div className="mx-auto max-w-2xl lg:mx-0 grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-2 xl:gap-x-0">
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
                src="./assets/about/tanya2.jpg"
                alt=""
                className="mt-10 justify-self-end aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-lg xl:mt-36"
              />
              <img
                src="./assets/about/anna41.jpg"
                alt=""
                className="mt-10 aspect-[4/6] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:-mt-32 lg:max-w-lg xl:-mt-40"
              />
              <img
                src="./assets/about/tanya1.jpg"
                alt=""
                className="mt-10 justify-self-end aspect-[6/5] w-full max-w-lg rounded-2xl object-cover object-top sm:mt-16 lg:mt-28 lg:max-w-lg xl:mt-36"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutLayout;
