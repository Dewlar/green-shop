import React, { FC, useEffect, useState } from 'react';
import {
  Address,
  MyCustomerChangeAddressAction,
  MyCustomerRemoveAddressAction,
  MyCustomerSetDefaultBillingAddressAction,
  MyCustomerSetDefaultShippingAddressAction,
} from '@commercetools/platform-sdk';
import { TrashIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { HttpErrorType } from '@commercetools/sdk-client-v2';
import { CountryEnum, IUserAddresses } from '../../models';
import DefaultAddressSwitch from './default-address-switch';
import ButtonEditUpdate from './button-edit-update';
import CustomerController from '../../api/CustomerController';

interface IProps {
  address: Address & { isNew?: boolean };
  customerData: IUserAddresses;
  setCustomerData: React.Dispatch<React.SetStateAction<IUserAddresses>>;
}

const AddressForm: FC<IProps> = ({ address, customerData, setCustomerData }) => {
  const [isEdit, setIsEdit] = useState(!address.isNew ?? true);
  const [isDefaultBillingAddress, setIsDefaultBillingAddress] = useState(true);
  const [isDefaultShippingAddress, setIsDefaultShippingAddress] = useState(true);
  const [formData, setFormData] = useState({
    country: address.country,
    streetName: address.streetName,
    city: address.city,
    postalCode: address.postalCode,
  });

  useEffect(() => {
    setIsDefaultBillingAddress(address.id === customerData.defaultBillingAddressId);
    setIsDefaultShippingAddress(address.id === customerData.defaultShippingAddressId);
  }, [address, customerData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log(isDefaultBillingAddress, isDefaultShippingAddress);
    // console.log(customerData, 'address');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      setIsEdit(false);
    } else {
      setIsEdit(true);
      console.log('галя, замена!');
      const customerController = new CustomerController();

      // let currentVersion;
      const actionsList = [];
      const changeAddress: MyCustomerChangeAddressAction = {
        action: 'changeAddress',
        addressId: address.id,
        address: {
          country: formData.country,
          city: formData.city,
          streetName: formData.streetName,
          postalCode: formData.postalCode,
        },
      };
      if (isDefaultShippingAddress) {
        const setDefaultShippingAddress: MyCustomerSetDefaultShippingAddressAction = {
          action: 'setDefaultShippingAddress',
          addressId: address.id,
        };

        actionsList.push(setDefaultShippingAddress);
      } else if (address.id === customerData.defaultShippingAddressId) {
        const setDefaultShippingAddress: MyCustomerSetDefaultShippingAddressAction = {
          action: 'setDefaultShippingAddress',
          addressId: undefined,
        };

        actionsList.push(setDefaultShippingAddress);
      }
      if (isDefaultBillingAddress) {
        const setDefaultBillingAddress: MyCustomerSetDefaultBillingAddressAction = {
          action: 'setDefaultBillingAddress',
          addressId: address.id,
        };

        actionsList.push(setDefaultBillingAddress);
      } else if (address.id === customerData.defaultBillingAddressId) {
        const setDefaultBillingAddress: MyCustomerSetDefaultBillingAddressAction = {
          action: 'setDefaultBillingAddress',
          addressId: undefined,
        };

        actionsList.push(setDefaultBillingAddress);
      }

      actionsList.push(changeAddress);
      const currentVersion = (await customerController.getCustomer()).body?.version;

      if (currentVersion) {
        const changeAddressResponse = await customerController.updateCustomer({
          version: currentVersion,
          actions: actionsList,
        });

        if (changeAddressResponse.body) {
          setCustomerData({
            addresses: changeAddressResponse.body.addresses,
            billingAddressIds: changeAddressResponse.body.billingAddressIds ?? [],
            shippingAddressIds: changeAddressResponse.body.shippingAddressIds ?? [],
            defaultBillingAddressId: changeAddressResponse.body.defaultBillingAddressId ?? '',
            defaultShippingAddressId: changeAddressResponse.body.defaultShippingAddressId ?? '',
          });
        }

        toast.success('Change address was successful');
      }
    }
  };

  // todo: add modal dialog with text: a you sure?
  const handleAddressDelete = (e: React.FormEvent): void => {
    e.preventDefault();
    (async (): Promise<void> => {
      const deleteAddressAction: MyCustomerRemoveAddressAction = {
        action: 'removeAddress',
        addressId: address.id,
      };

      const customerController = new CustomerController();

      const currentVersion = (await customerController.getCustomer()).body?.version;

      if (currentVersion) {
        const deleteAddressResponse = await customerController.updateCustomer({
          version: currentVersion,
          actions: [deleteAddressAction],
        });

        if (deleteAddressResponse.body) {
          setCustomerData({
            addresses: deleteAddressResponse.body.addresses,
            billingAddressIds: deleteAddressResponse.body.billingAddressIds ?? [],
            shippingAddressIds: deleteAddressResponse.body.shippingAddressIds ?? [],
            defaultBillingAddressId: deleteAddressResponse.body.defaultBillingAddressId ?? '',
            defaultShippingAddressId: deleteAddressResponse.body.defaultShippingAddressId ?? '',
          });
        }

        // console.log('deleteAddressResponse -> ', deleteAddressResponse);

        toast.success('Delete address was successful');
      }
    })().catch((err: HttpErrorType) => {
      toast.error(err.message);
    });
  };

  return (
    <form key={address.id} className="md:col-span-2 md:col-start-2 border rounded-md p-3" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-6">
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
              value={formData.country}
              onChange={handleInputChange}
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
              name="streetName"
              id="street-address"
              disabled={isEdit}
              value={formData.streetName}
              onChange={handleInputChange}
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
              value={formData.city}
              onChange={handleInputChange}
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
              name="postalCode"
              id="postal-code"
              disabled={isEdit}
              value={formData.postalCode}
              onChange={handleInputChange}
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

      <div className="mt-8 flex justify-between items-center">
        <ButtonEditUpdate isEdit={isEdit} isNew={address.isNew} />
        <button onClick={handleAddressDelete}>
          <TrashIcon className="text-green-500 w-7 h-7" />
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
