import React, { FC } from 'react';
import { IUserAddresses } from '../../models';
import AddressForm from './address-form';

interface IProps {
  addressData: IUserAddresses;
  setAddressData: React.Dispatch<React.SetStateAction<IUserAddresses>>;
}

const UserAddresses: FC<IProps> = ({ addressData, setAddressData }) => {
  console.log(addressData.addresses[0].city, setAddressData); // todo: delete console log

  return (
    <div className="grid max-w-5xl mx-auto grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">Addresses</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Billing and shipping addresses.</p>
      </div>

      {addressData.addresses.map((address) => (
        <AddressForm
          key={address.id}
          address={address}
          defaultShippingAddressId={addressData.defaultShippingAddressId}
          defaultBillingAddressId={addressData.defaultBillingAddressId}
        />
      ))}
    </div>
  );
};

export default UserAddresses;
