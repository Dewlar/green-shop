import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline';
import mocks from '../mocks-data/mocks';
import { useStateContext } from '../../state/state-context';

interface HeaderProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header: FC<HeaderProps> = ({ setOpen }) => {
  const { auth } = useStateContext();

  return (
    <header className="relative">
      <nav aria-label="Top">
        {/* Navigation */}
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo (lg+) */}
              <div className="hidden lg:flex lg:flex-1 lg:items-center">
                <Link to="/">
                  <span className="sr-only">Green shop</span>
                  <img className="h-8 w-auto" src="./assets/logo/logo.png" alt="logo" />
                </Link>
              </div>

              <div className="hidden h-full lg:flex">
                <div className="flex h-full justify-center items-center space-x-8">
                  {mocks.navigation.pages.map((item) => {
                    return (
                      <Link key={item.name} to={item.href} className="text-gray-500 hover:text-gray-600">
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Mobile menu and search (lg-) */}
              <div className="flex flex-1 items-center lg:hidden">
                <button
                  type="button"
                  className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setOpen(true)}
                >
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Logo (lg-) */}
              <Link to="/" className="lg:hidden">
                <span className="sr-only">Green shop</span>
                <img src="./assets/logo/logo.png" alt="logo" className="h-8 w-auto" />
              </Link>

              <div className="flex flex-1 items-center justify-end">
                {auth.get.isAuth ? (
                  <div className="flex items-center lg:ml-8">
                    <button onClick={auth.logout} className="text-sm font-medium text-gray-500 hover:text-gray-700">
                      Logout
                    </button>
                    {/* Account */}
                    <div className="flex">
                      <Link to="/profile" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Account</span>
                        <UserIcon className="h-6 w-6" aria-hidden="true" />
                      </Link>
                    </div>

                    {/* Cart */}
                    <div className="ml-4 flow-root lg:ml-8">
                      <Link to="/cart" className="group -m-2 flex items-center p-2">
                        <ShoppingBagIcon
                          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                        <span className="sr-only">items in cart, view bag</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-6">
                    <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-gray-700">
                      Sign in
                    </Link>
                    <Link to="/signup" className="text-sm font-medium text-gray-500 hover:text-gray-700">
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
