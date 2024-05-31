import React, { FC, useState } from 'react';
import { IUserAddresses } from '../../models';
import DefaultAddressSwitch from './default-address-switch';
import ButtonEditUpdate from './button-edit-update';

interface IProps {
  addresses: IUserAddresses;
  setAddresses: React.Dispatch<React.SetStateAction<IUserAddresses>>;
}

const UserAddresses: FC<IProps> = ({ addresses, setAddresses }) => {
  const [isEdit, setIsEdit] = useState(true);
  console.log(addresses.addresses[0].city, setAddresses); // todo: delete console log

  const [isDefaultBillingAddress, setIsDefaultBillingAddress] = useState(true);
  const [isDefaultShippingAddress, setIsDefaultShippingAddress] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  };

  return (
    <div className="grid max-w-5xl mx-auto grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">Addresses</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Billing and shipping addresses.</p>
      </div>

      <form className="md:col-span-2" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
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
                className="block w-full disabled:bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
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
    </div>
  );
};

export default UserAddresses;
