import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <main className="grid h-dvh min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="flex flex-col items-center justify-center relative w-full h-full -mt-20">
        <h1 className="mt-4 text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-5xl hidden">
          Page not found
        </h1>
        <div className="flex flex-col self-center justify-center relative max-w-xl">
          <img src="./assets/404/404small.png" alt="page not found" className="max-w-xl w-full" />
          <div className="flex w-full px-4 justify-between -mt-16 sm:-mt-32">
            <h2 className="mt-4 text-5xl text-center font-bold tracking-tight text-gray-900 sm:text-5xl">Page</h2>
            <h2 className="mt-4 text-5xl text-center font-bold tracking-tight text-gray-900 sm:text-5xl">
              not <br /> found
            </h2>
          </div>
        </div>
        <div className="text-base text-center leading-7 text-gray-600 mt-12">
          Sorry, we couldn’t find the page you’re looking for.
        </div>
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Page404;
