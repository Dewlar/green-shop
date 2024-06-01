import React, { FC, useEffect, useState } from 'react';
import { Address } from '@commercetools/platform-sdk';
import { CountryEnum } from '../../models';
import DefaultAddressSwitch from './default-address-switch';
import ButtonEditUpdate from './button-edit-update';

interface IProps {
  address: Address;
  defaultShippingAddressId: string;
  defaultBillingAddressId: string;
}

const AddressForm: FC<IProps> = ({ address, defaultShippingAddressId, defaultBillingAddressId }) => {
  const [isEdit, setIsEdit] = useState(true);
  const [isDefaultBillingAddress, setIsDefaultBillingAddress] = useState(true);
  const [isDefaultShippingAddress, setIsDefaultShippingAddress] = useState(true);

  useEffect(() => {
    setIsDefaultBillingAddress(address.id === defaultBillingAddressId);
    setIsDefaultShippingAddress(address.id === defaultShippingAddressId);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isDefaultBillingAddress);
    if (isEdit) {
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  };

  return (
    <form key={address.id} className="md:col-span-2 md:col-start-2 border rounded-md p-3" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:max-w-xl sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
            Country
          </label>
          <div className="mt-2">
            <select
              id="country"
              name="country"
              disabled={isEdit}
              autoComplete="country-name"
              defaultValue={address.country}
              className="block w-full disabled:bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              {Object.entries(CountryEnum).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
            Street address
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="street-address"
              id="street-address"
              disabled={isEdit}
              value={address.streetName}
              autoComplete="street-address"
              className="block w-full disabled:bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3 sm:col-start-1">
          <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
            City
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="city"
              id="city"
              disabled={isEdit}
              value={address.city}
              autoComplete="address-level2"
              className="block w-full disabled:bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
            ZIP / Postal code
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="postal-code"
              id="postal-code"
              disabled={isEdit}
              value={address.postalCode}
              autoComplete="postal-code"
              className="block w-full disabled:bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3 flex flex-col gap-1">
          <DefaultAddressSwitch
            title={'Set as default billing.'}
            isEdit={isEdit}
            isDefaultAddress={isDefaultBillingAddress}
            setIsDefaultAddress={setIsDefaultBillingAddress}
          />
          <DefaultAddressSwitch
            title={'Set as default shipping.'}
            isEdit={isEdit}
            isDefaultAddress={isDefaultShippingAddress}
            setIsDefaultAddress={setIsDefaultShippingAddress}
          />
        </div>

        <div className="sm:col-span-3"></div>
      </div>

      <div className="mt-8 flex">
        <ButtonEditUpdate isEdit={isEdit} />
      </div>
    </form>
  );
};

export default AddressForm;
