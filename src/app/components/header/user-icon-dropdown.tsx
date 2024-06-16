import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { UserIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useStateContext } from '../../state/state-context';
import { classNames } from '../../models';

const UserIconDropdown = () => {
  const { logout } = useStateContext();

  return (
    <div className="flex">
      <Menu as="div" className="relative">
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
                  onClick={logout}
                  className={classNames(active ? 'bg-gray-200' : '', 'block w-full px-4 py-2 text-sm text-gray-700')}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserIconDropdown;
