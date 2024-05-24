import React, { FC, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import mocks from '../mocks-data/mocks';
import { useStateContext } from '../../state/state-context';
import CartIcon from './cart-icon';

interface HeaderProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu: FC<HeaderProps> = ({ open, setOpen }) => {
  const { isAuth, logout } = useStateContext();
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog className="relative z-40 lg:hidden" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}

              <div className="border-t border-gray-200 px-4 py-6 flex flex-col gap-2.5">
                {mocks.navigation.pages.map((page) => (
                  <div key={page.name}>
                    <Link to={page.href} className="block p-2 font-medium text-gray-900">
                      {page.name}
                    </Link>
                  </div>
                ))}
              </div>

              {isAuth ? (
                <>
                  <div className="border-t border-gray-200 px-4 py-6 flex flex-col gap-2.5">
                    <div className="flow-root">
                      <Link to="/profile" className="block p-2 font-medium text-gray-900">
                        Profile
                      </Link>
                    </div>
                    <Link to="/cart" className="flex gap-3.5 p-2 font-medium text-gray-900">
                      <span>Cart</span>
                      <CartIcon></CartIcon>
                    </Link>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-6 flex flex-col gap-2.5">
                    <div className="flow-root">
                      <button
                        onClick={() => {
                          setOpen(false);
                          logout();
                        }}
                        className="block p-2 font-medium text-gray-900"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="border-t border-gray-200 px-4 py-6 flex flex-col gap-2.5">
                  <div className="flow-root">
                    <Link to="/signup" className="block p-2 font-medium text-gray-900">
                      Create an account
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link to="/login" className="block p-2 font-medium text-gray-900">
                      Login
                    </Link>
                  </div>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MobileMenu;
