import React, { FC, useEffect, useState } from 'react';
import {
  Address,
  MyCustomerAddAddressAction,
  MyCustomerAddBillingAddressIdAction,
  MyCustomerAddShippingAddressIdAction,
  MyCustomerChangeAddressAction,
  MyCustomerRemoveAddressAction,
  MyCustomerSetDefaultBillingAddressAction,
  MyCustomerSetDefaultShippingAddressAction,
} from '@commercetools/platform-sdk';
import { TrashIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { HttpErrorType } from '@commercetools/sdk-client-v2';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { classNames, CountryEnum, IUserAddresses, States } from '../../models';
import DefaultAddressSwitch from './default-address-switch';
import ButtonEditUpdate from './button-edit-update';
import CustomerController from '../../api/CustomerController';
import { validationRules } from '../signup/regExp';
import BubblingSideImage from './bubblingSideImage';

interface IProps {
  address: Address & { isNew?: boolean };
  customerData: IUserAddresses;
  setCustomerData: React.Dispatch<React.SetStateAction<IUserAddresses>>;
}

const AddressForm: FC<IProps> = ({ address, customerData, setCustomerData }) => {
  const [isEdit, setIsEdit] = useState(!address.isNew ?? true);
  const [isDefaultBillingAddress, setIsDefaultBillingAddress] = useState(true);
  const [isDefaultShippingAddress, setIsDefaultShippingAddress] = useState(true);
  const [isChangeCountry, setIsChangeCountry] = useState(false);

  useEffect(() => {
    setIsDefaultBillingAddress(address.id === customerData.defaultBillingAddressId);
    setIsDefaultShippingAddress(address.id === customerData.defaultShippingAddressId);
  }, [address, customerData]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<Address>({
    mode: 'onChange',
    defaultValues: address.isNew ? { ...address, country: States.Germany } : address,
  });

  const selectedCountry = useWatch({ control, name: 'country' });

  useEffect(() => {
    if (isChangeCountry) {
      setValue('postalCode', '', { shouldValidate: true, shouldDirty: true, shouldTouch: true });
      setIsChangeCountry(false);
    }
  }, [isChangeCountry, selectedCountry, setValue]);

  const onSubmit = async (data: Address) => {
    console.log('form valid -> ', isValid);
    if (isEdit) {
      if (address.isNew) {
        const customerController = new CustomerController();

        let currentVersion;
        const addAddress: MyCustomerAddAddressAction = {
          action: 'addAddress',
          address: {
            country: data.country,
            city: data.city,
            streetName: data.streetName,
            postalCode: data.postalCode,
          },
        };
        currentVersion = (await customerController.getCustomer()).body?.version;
        if (currentVersion) {
          const response = await customerController.updateCustomer({
            version: currentVersion,
            actions: [addAddress],
          });

          const getNewAddressId = response.body?.addresses.at(-1)?.id;

          const actionsList = [];
          const setBillingAddress: MyCustomerAddBillingAddressIdAction = {
            action: 'addBillingAddressId',
            addressId: getNewAddressId,
          };
          const setShippingAddress: MyCustomerAddShippingAddressIdAction = {
            action: 'addShippingAddressId',
            addressId: getNewAddressId,
          };
          actionsList.push(setBillingAddress, setShippingAddress);
          if (isDefaultBillingAddress) {
            const setDefaultBillingAddress: MyCustomerSetDefaultBillingAddressAction = {
              action: 'setDefaultBillingAddress',
              addressId: getNewAddressId,
            };

            actionsList.push(setDefaultBillingAddress);
          }
          if (isDefaultShippingAddress) {
            const setDefaultShippingAddress: MyCustomerSetDefaultShippingAddressAction = {
              action: 'setDefaultShippingAddress',
              addressId: getNewAddressId,
            };

            actionsList.push(setDefaultShippingAddress);
          }

          currentVersion = (await customerController.getCustomer()).body?.version;

          if (currentVersion) {
            const addAddressResponse = await customerController.updateCustomer({
              version: currentVersion,
              actions: actionsList,
            });

            if (addAddressResponse.body) {
              setCustomerData({
                addresses: addAddressResponse.body.addresses,
                billingAddressIds: addAddressResponse.body.billingAddressIds ?? [],
                shippingAddressIds: addAddressResponse.body.shippingAddressIds ?? [],
                defaultBillingAddressId: addAddressResponse.body.defaultBillingAddressId ?? '',
                defaultShippingAddressId: addAddressResponse.body.defaultShippingAddressId ?? '',
              });
            }

            reset(data);
            toast.success('New address added successfully');
          }
        }
      } else {
        const customerController = new CustomerController();

        const actionsList = [];
        const changeAddress: MyCustomerChangeAddressAction = {
          action: 'changeAddress',
          addressId: address.id,
          address: {
            country: data.country,
            city: data.city,
            streetName: data.streetName,
            postalCode: data.postalCode,
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

          reset(data);
          toast.success('Change address was successful');
        }
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

        toast.success('Delete address was successful');
      }
    })().catch((err: HttpErrorType) => {
      toast.error(err.message);
    });
  };

  return (
    <div className="relative z-0 md:col-span-2 md:col-start-2 ">
      <img
        className={classNames(
          isEdit ? ' opacity-0' : ' opacity-100',
          'md:hidden absolute bottom-0 right-12 w-24 sm:w-32 h-auto transform transition-opacity duration-500 ease-in-out'
        )}
        src="./assets/budding-pop-pictures/waiter.gif"
        alt=""
      />
      <form key={address.id} className="border rounded-md p-3 bg-white" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
              Country
            </label>
            <div className="mt-2">
              <Controller
                name="country"
                control={control}
                rules={validationRules.country}
                render={({ field }) => (
                  <select
                    {...field}
                    id="country"
                    disabled={isEdit}
                    className="block w-full disabled:bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      field.onChange(e);
                      setIsChangeCountry(true);
                    }}
                  >
                    {Object.entries(CountryEnum).map(([code, name]) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
              Street address
            </label>
            <div className="mt-2">
              <Controller
                name="streetName"
                control={control}
                rules={validationRules.streetName}
                render={({ field }) => (
                  <input
                    {...field}
                    id="street-address"
                    type="text"
                    disabled={isEdit}
                    className="block w-full disabled:bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  />
                )}
              />
              {errors.streetName && <p className="text-red-500 text-xs mt-1">{errors.streetName.message}</p>}
            </div>
          </div>

          <div className="sm:col-span-3 sm:col-start-1">
            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
              City
            </label>
            <div className="mt-2">
              <Controller
                name="city"
                control={control}
                rules={validationRules.city}
                render={({ field }) => (
                  <input
                    {...field}
                    id="city"
                    type="text"
                    disabled={isEdit}
                    className="block w-full disabled:bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  />
                )}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
              ZIP / Postal code
            </label>
            <div className="mt-2">
              <Controller
                name="postalCode"
                control={control}
                rules={validationRules.postalCode(selectedCountry)}
                render={({ field }) => (
                  <input
                    {...field}
                    id="postal-code"
                    type="text"
                    disabled={isEdit}
                    className="block w-full disabled:bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  />
                )}
              />
              {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode.message}</p>}
            </div>
          </div>

          <div className="sm:col-span-3 flex flex-col gap-1">
            <DefaultAddressSwitch
              title={'default billing'}
              isEdit={isEdit}
              isDefaultAddress={isDefaultBillingAddress}
              setIsDefaultAddress={setIsDefaultBillingAddress}
            />
            <DefaultAddressSwitch
              title={'default shipping'}
              isEdit={isEdit}
              isDefaultAddress={isDefaultShippingAddress}
              setIsDefaultAddress={setIsDefaultShippingAddress}
            />
          </div>

          <div className="sm:col-span-3"></div>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <ButtonEditUpdate isEdit={isEdit} isNew={address.isNew} setIsEdit={setIsEdit} />
          {address.isNew && !isEdit && (
            <button
              className="flex gap-1.5 justify-center items-center bg-amber-400 hover:bg-amber-500 min-w-36 py-2 col-span-1 rounded-md px-3 text-sm font-semibold text-white shadow-sm focus-visible:outline-none"
              onClick={(e) => {
                e.preventDefault();
                setCustomerData((prev) => ({
                  ...prev,
                  addresses: prev.addresses.filter((existingAddress) => existingAddress.id !== address.id),
                }));
              }}
            >
              Cancel
            </button>
          )}
          {!address.isNew && (
            <button onClick={handleAddressDelete}>
              <TrashIcon className="text-green-500 w-7 h-7" />
            </button>
          )}
        </div>
      </form>

      <BubblingSideImage isEdit={isEdit} />
    </div>
  );
};

export default AddressForm;
