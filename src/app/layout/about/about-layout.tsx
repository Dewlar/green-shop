import React from 'react';

const AboutLayout = () => {
  return (
    <div className="bg-white">
      <main className="isolate">
        {/* Hero section */}
        <div className="relative isolate -z-10 overflow-hidden bg-gradient-to-t from-teal-900/70 pt-14">
          <div
            className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-teal-200/30 ring-1 ring-teal-100 sm:-mr-80 lg:-mr-96"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-7xl px-6 py-32 sm:pt-28 sm:pb-40 lg:px-8">
            <div className="mx-auto lg:mx-0 grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
              <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:col-span-2 xl:col-auto">
                We’re a <span className="text-green-500">R.S.</span>
                <span className="text-gray-500">Survivor</span> team.
              </h1>
              <div className="mt-6 max-w-2xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                <p className="text-base sm:text-xl leading-8 text-gray-600 text-justify">
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
          {/* <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-teal-900/50 sm:h-32" /> */}
        </div>

        {/* Team info section */}
        <div className="relative bg-white pb-16 sm:pb-24 xl:pb-32">
          {/* <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-t from-teal-900/70 sm:h-32" /> */}
          <div className="bg-teal-900/70 pb-20 sm:pb-24 xl:pb-0">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
              <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
                <div className="relative aspect-[3/2] h-full md:-mx-8 xl:mx-0 xl:aspect-[2/3]">
                  <img
                    className="absolute inset-0 h-full w-full rounded-2xl bg-gray-800 object-cover object-top shadow-2xl"
                    src="assets/about/sword.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:p-12">
                <div className="relative isolate pt-6">
                  <div className="mb-8">
                    <div className="font-semibold text-white text-2xl">Andrei Markouski</div>
                    <div className="mt-1 text-gray-900">Frontend Developer</div>
                  </div>
                  <div className="text-sm font-semibold leading-8 text-white sm:text-lg sm:leading-9">
                    <p className="text-justify">
                      2 higher education where I studied Delphi and C#. 7 years of experience as a system administrator.
                      Now I aspire to become FrontEnd developer with immersion in technologies.{' '}
                      <span className="m-1 h-44 w-44 sm:w-60 float-right relative block text-center">
                        <img
                          src="assets/about/pic/lead.png"
                          alt=""
                          className="absolute h-auto w-44 sm:w-72 -top-5 sm:-top-8 left-1/2 transform -translate-x-1/2 max-w-none"
                        />
                        <span className="text-sm text-gray-900">R.S.Survivor Lead</span>
                      </span>
                    </p>
                    <p>On the project I fulfill the role of team lead.</p>
                    <p>My slogan is &#171;no problem is unsolvable!&#187;</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Anya */}
        <div className="bg-white pb-16 pt-24 sm:pb-24 sm:pt-32 xl:pb-32">
          <div className="bg-teal-900/70 pb-20 sm:pb-24 xl:pb-0">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row-reverse xl:items-stretch">
              <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
                <div className="relative aspect-[3/2] h-full md:-mx-8 xl:mx-0 xl:aspect-[2/3]">
                  <img
                    className="absolute inset-0 h-full w-full rounded-2xl bg-gray-800 object-cover object-top xl:object-cover xl:object-top shadow-2xl"
                    src="assets/about/anya4.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:p-12">
                <div className="relative isolate pt-6 text-right">
                  <div className="mb-8">
                    <div className="font-semibold text-white text-2xl">Anna Filenichik</div>
                    <div className="mt-1 text-gray-900">Frontend Developer</div>
                  </div>
                  <div className="text-sm font-semibold leading-8 text-white sm:text-lg sm:leading-9 text-justify">
                    <p>
                      Gravida quam mi erat tortor neque molestie. Auctor aliquet at porttitor a enim nunc suscipit
                      tincidunt nunc. Et non lorem tortor posuere.{' '}
                      <span className="m-1 h-44 w-56 float-left relative block text-center">
                        <img
                          src="assets/about/pic/commerce2.png"
                          alt=""
                          className="absolute h-auto w-52 sm:w-72 -top-4 left-1/2 transform -translate-x-1/2 max-w-none"
                        />
                        <span className="text-sm text-gray-900">R.S.Survivor developer</span>
                      </span>
                      Nunc eu scelerisque interdum eget tellus non nibh scelerisque bibendum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tanya */}
        <div className="bg-white pb-16 pt-24 sm:pb-24 sm:pt-32 xl:pb-32">
          <div className="bg-teal-900/70 pb-20 sm:pb-24 xl:pb-0">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
              <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
                <div className="relative aspect-[3/2] h-full md:-mx-8 xl:mx-0 xl:aspect-[2/3]">
                  <img
                    className="absolute inset-0 h-full w-full rounded-2xl bg-gray-800 object-cover object-top shadow-2xl"
                    src="assets/about/tanya4.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:py-12 xl:px-8">
                <div className="relative isolate">
                  <div className="mb-8">
                    <div className="font-semibold text-white text-2xl">Tatiana</div>
                    <div className="mt-1 text-gray-900">Frontend Developer</div>
                  </div>
                  <div className="text-sm font-semibold leading-8 text-white sm:text-lg sm:leading-9 text-justify">
                    <p>
                      10 years of experience in a manufacturing company. Expert knowledge in the field of organization
                      of labor and wages, accounting, tax accounting. I have the skills of self-organization and
                      self-discipline.
                      <span className="m-1 h-56 w-60 float-right relative block text-center">
                        <img
                          src="assets/about/pic/dev2.png"
                          alt=""
                          className="absolute h-auto w-52 sm:w-60 top-8 left-1/2 transform -translate-x-1/2 max-w-none"
                        />
                        <span className="text-sm text-right text-gray-900">R.S.Survivor developer</span>
                      </span>
                      Web development and programming are very responsive and therefore ready to learn a lot and make
                      maximum efforts. I came to the realization that I could do it. Dream will come true.
                    </p>
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
                src="./assets/about/moto1.jpg"
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
