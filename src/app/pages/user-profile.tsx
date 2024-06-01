import React, { Fragment, useEffect, useState } from 'react';
import {} from 'react-router-dom';
import { Customer } from '@commercetools/platform-sdk';
import { Tab } from '@headlessui/react';
import HeaderWidthMobile from '../components/header/header-width-mobile';
import CustomerController from '../api/CustomerController';
import UserInfo from '../components/profile/user-info';
import UserAddresses from '../components/profile/user-addresses';
import UserPassword from '../components/profile/user-password';
import { classNames, IUserAddresses, IUserInfo } from '../models';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
  });

  const [addresses, setAddresses] = useState<IUserAddresses>({
    addresses: [],
    billingAddressIds: [],
    shippingAddressIds: [],
    defaultBillingAddressId: '',
    defaultShippingAddressId: '',
  });

  const secondaryNavigation = [
    { name: 'Account', href: <UserInfo userInfo={userInfo} setUserInfo={setUserInfo} />, selected: false },
    { name: 'Address', href: <UserAddresses addressData={addresses} setAddressData={setAddresses} />, selected: true },
    { name: 'Password', href: <UserPassword email={userInfo.email} />, selected: false },
  ];

  useEffect(() => {
    const getData = async (): Promise<Customer> => {
      const customerController = new CustomerController();

      const userData = await customerController.getCustomer();

      console.log('user body -> : ', userData.body);
      if (userData.body) return userData.body;

      throw Error('No customer info');
    };

    getData()
      .then((response) => {
        console.log('user response -> : ', response);
        setUserInfo({
          firstName: response.firstName ?? '',
          lastName: response.lastName ?? '',
          email: response.email,
          dateOfBirth: response.dateOfBirth ?? '',
        });

        setAddresses({
          addresses: response.addresses,
          billingAddressIds: response.billingAddressIds ?? [],
          shippingAddressIds: response.shippingAddressIds ?? [],
          defaultBillingAddressId: response.defaultBillingAddressId ?? '',
          defaultShippingAddressId: response.defaultShippingAddressId ?? '',
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
                <Tab.Panel key={category.name} className="focus-visible:outline-none">
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
