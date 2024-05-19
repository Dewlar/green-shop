import React, { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, UserIcon } from '@heroicons/react/24/outline';
import mocks from '../mocks-data/mocks';
import { useStateContext } from '../../state/state-context';
import CartIcon from './cart-icon';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

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
                    {/* <button onClick={auth.logout} className="text-sm font-medium text-gray-500 hover:text-gray-700"> */}
                    {/*  Logout */}
                    {/* </button> */}
                    {/* Account */}
                    <div className="flex">
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex -m-2 p-2 text-sm text-gray-400 hover:text-gray-500 rounded-full">
                            <span className="sr-only">Open user menu</span>
                            <UserIcon className="h-6 w-6" aria-hidden="true" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/profile"
                                  className={classNames(
                                    active ? 'bg-gray-200' : '',
                                    'block w-full text-center px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Your Profile
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={auth.logout}
                                  className={classNames(
                                    active ? 'bg-gray-200' : '',
                                    'block w-full px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Logout
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                      {/* <Link to="/profile" className="-m-2 p-2 text-gray-400 hover:text-gray-500"> */}
                      {/*  <span className="sr-only">Account</span> */}
                      {/*  <UserIcon className="h-6 w-6" aria-hidden="true" /> */}
                      {/* </Link> */}
                    </div>

                    {/* Cart */}
                    <div className="ml-4 flow-root lg:ml-8">
                      <Link to="/cart">
                        <CartIcon></CartIcon>
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
