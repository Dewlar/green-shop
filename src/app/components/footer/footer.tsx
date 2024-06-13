import React from 'react';
import { Link } from 'react-router-dom';
import mocks from '../mocks-data/mocks';
import RsLogoSvg from '../svg/rs-logo-svg';
import GithubLink from './github-link';
import { useStateContext } from '../../state/state-context';

const Footer = () => {
  const { isAuth } = useStateContext();
  return (
    <footer aria-labelledby="footer-heading" className="bg-gray-50">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 py-20">
          <div className="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16">
            {/* Sitemap sections */}
            <div className="col-span-10 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4 md:col-span-10 md:col-start-2 md:row-start-1 md:mt-0 lg:col-span-10 lg:col-start-2">
              <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Main Categories</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {mocks.footerNavigation.categories.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a href={item.href} className="text-gray-500 hover:text-gray-600">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Products</h3>
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
              </div>
              <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Usefull Pages</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {mocks.footerNavigation.pages.map((item) => {
                      const link = { ...item };

                      if (item.name === 'Your account') {
                        link.href = isAuth ? '/profile' : '/login';
                      }

                      return (
                        <li key={link.name} className="text-sm">
                          <Link to={link.href} className="text-gray-500 hover:text-gray-600">
                            {link.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Follow us</h3>
                  <ul role="list" className="mt-6 space-y-6 text-gray-500 hover:text-gray-600">
                    {mocks.footerNavigation.follow.map((item) => (
                      <li key={item.name} className="text-sm">
                        <GithubLink url={item.href} name={item.name} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 py-10 flex justify-between items-center gap-2.5 text-sm text-gray-500">
          <div>&copy; 2024 Green Shop.</div>
          <a href="https://rs.school/" target={'_blank'} rel="noreferrer" className="flex items-center gap-1">
            <RsLogoSvg color="#3d3d3d" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
