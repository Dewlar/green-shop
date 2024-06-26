import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/outline';
import mocks from '../mocks-data/mocks';
import { useStateContext } from '../../state/state-context';
import CartIcon from './cart-icon';
import UserIconDropdown from './user-icon-dropdown';
import logoIconLink from '../../../assets/logo/logo.png';

interface HeaderProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header: FC<HeaderProps> = ({ setOpen }) => {
  const { isAuth } = useStateContext();

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
                  <img className="h-8 w-auto" src={logoIconLink} alt="logo" />
                </Link>
              </div>

              <div className="hidden h-full lg:flex">
                <div className="flex h-full justify-center items-center space-x-8">
                  {mocks.navigation.pages.map((item) => {
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        state={{ isExternal: true }}
                        className="text-gray-400 hover:text-gray-600 font-semibold"
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Mobile menu (lg-) */}
              <div className="flex flex-1 items-center lg:hidden">
                <button
                  type="button"
                  className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setOpen(true)}
                >
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                {/* Cart left */}
                <div className="mx-4 flow-root lg:mx-8 sm:hidden">
                  <Link to="/cart">
                    <CartIcon></CartIcon>
                  </Link>
                </div>
              </div>

              {/* Logo (lg-) */}
              <Link to="/" className="lg:hidden">
                <span className="sr-only">Green shop</span>
                <img src={logoIconLink} alt="logo" className="h-8 w-auto" />
              </Link>

              <div className="flex flex-1 items-center justify-end">
                {/* Cart right */}
                <div className="mr-4 hidden sm:flow-root">
                  <Link to="/cart">
                    <CartIcon></CartIcon>
                  </Link>
                </div>
                {isAuth ? (
                  <div className="flex items-center mr-4">
                    {/* User icon dropdown menu */}
                    <UserIconDropdown></UserIconDropdown>
                  </div>
                ) : (
                  <div className="flex items-center space-x-6">
                    <Link
                      to="/login"
                      className="text-sm whitespace-nowrap font-medium text-gray-500 hover:text-gray-700"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/signup"
                      className="text-sm whitespace-nowrap font-medium text-gray-500 hover:text-gray-700"
                    >
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
