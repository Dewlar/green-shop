import React, { Fragment, useEffect, useState } from 'react';
import {} from 'react-router-dom';
import { Customer } from '@commercetools/platform-sdk';
import { Tab } from '@headlessui/react';
import HeaderWidthMobile from '../components/header/header-width-mobile';
import CustomerController from '../api/CustomerController';
import UserInfo from '../components/profile/user-info';
import UserAddresses from '../components/profile/user-addresses';
import UserPassword from '../components/profile/user-password';

const secondaryNavigation = [
  { name: 'Account', href: <UserInfo />, current: true },
  { name: 'Address', href: <UserAddresses />, current: false },
  { name: 'Password', href: <UserPassword />, current: false },
];

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
  });
  useEffect(() => {
    const getData = async (): Promise<Customer> => {
      const customerController = new CustomerController();

      const userData = await customerController.getCustomer();

      // console.log('user userInfo -> : ', userInfo, userData);
      if (userData.body) {
        return userData.body;
      }

      throw Error('No customer info');
    };

    getData()
      .then((response) => {
        console.log('user response -> : ', response, userInfo);
        setUserInfo({
          firstName: response.firstName ?? '',
          lastName: response.lastName ?? '',
          email: response.email,
          dateOfBirth: response.dateOfBirth ?? '',
        });
      })
      .catch();
  }, []);

  return (
    <>
      <HeaderWidthMobile></HeaderWidthMobile>
      <div className="mx-auto max-w-7xl px-4">
        <main>
          <h1 className="sr-only">Account Settings</h1>

          {/* Links */}
          <Tab.Group as="div" className="mt-2">
            <div className="">
              <Tab.List className="flex gap-x-6 justify-center mx-auto border-b">
                {secondaryNavigation.map((category) => (
                  <Tab
                    key={category.name}
                    className="whitespace-nowrap px-1 py-4 text-sm font-semibold text-gray-400 focus-visible:outline-none"
                  >
                    {category.name}
                  </Tab>
                ))}
              </Tab.List>
            </div>
            <Tab.Panels as={Fragment}>
              {secondaryNavigation.map((category) => (
                <Tab.Panel key={category.name} className="">
                  {category.href}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </main>
      </div>
    </>
  );
};

export default UserProfile;
