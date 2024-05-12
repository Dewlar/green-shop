import React from 'react';
import { Link } from 'react-router-dom';
import mocks from '../mocks-data/mocks';
import GithubLink from './github-link';

const Footer = () => {
  return (
    <footer aria-labelledby="footer-heading" className="bg-gray-50">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 py-20">
          <div className="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16">
            {/* Sitemap sections */}
            <div className="col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-10 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-8 lg:col-start-4">
              <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Main Categories</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {mocks.footerNavigation.products.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a href={item.href} className="text-gray-500 hover:text-gray-600">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Exclusive</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {mocks.footerNavigation.exclusive.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a href={item.href} className="text-gray-500 hover:text-gray-600">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Usefull Pages</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {mocks.footerNavigation.pages.map((item) => (
                    <li key={item.name} className="text-sm">
                      <Link to={item.href} className="text-gray-500 hover:text-gray-600">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 py-10 flex justify-between items-center gap-2.5 text-sm text-gray-500">
          <div>
            <div>&copy; 2024 Green Shop.</div>
            <div>RS</div>
          </div>
          <div className="flex gap-1.5 flex-col sm:flex-row">
            <GithubLink url="https://github.com/Dewlar" name="Dewlar" />
            <GithubLink url="https://github.com/annsinkevich47" name="Annsinkevich47" />
            <GithubLink url="https://github.com/letanatol" name="Letanatol" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
