import React, { useEffect, useState } from 'react';
import { Customer } from '@commercetools/platform-sdk';
import { IUserAddresses } from '../../models';
import AddressForm from './address-form';
import CustomerController from '../../api/CustomerController';

const UserAddresses = () => {
  const [customerData, setCustomerData] = useState<IUserAddresses>({
    addresses: [],
    billingAddressIds: [],
    shippingAddressIds: [],
    defaultBillingAddressId: '',
    defaultShippingAddressId: '',
  });

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
        setCustomerData({
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
    <div className="grid max-w-5xl mx-auto grid-cols-1 gap-x-6 gap-y-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">Addresses</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Billing and shipping addresses.</p>
      </div>

      {customerData.addresses.map((address) => (
        <AddressForm key={address.id} address={address} customerData={customerData} setCustomerData={setCustomerData} />
      ))}
    </div>
  );
};

export default UserAddresses;
