import React, { Fragment, useEffect, useState } from 'react';
import {} from 'react-router-dom';
import { Customer } from '@commercetools/platform-sdk';
import { Tab } from '@headlessui/react';
import HeaderWidthMobile from '../components/header/header-width-mobile';
import CustomerController from '../api/CustomerController';
import UserInfo from '../components/profile/user-info';
import UserAddresses from '../components/profile/user-addresses';
import UserPassword from '../components/profile/user-password';
import { classNames } from '../models';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
  });
  const secondaryNavigation = [
    { name: 'Account', href: <UserInfo userInfo={userInfo} setUserInfo={setUserInfo} />, selected: true },
    { name: 'Address', href: <UserAddresses />, selected: false },
    { name: 'Password', href: <UserPassword />, selected: false },
  ];
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
                    className={({ selected }) =>
                      classNames(
                        selected ? 'text-green-500' : 'text-gray-400',
                        'whitespace-nowrap px-1 py-4 text-sm font-semibold focus-visible:outline-none hover:text-green-500'
                      )
                    }
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
