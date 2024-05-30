import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ClientResponse } from '@commercetools/sdk-client-v2';
import {
  Customer,
  MyCustomerChangeEmailAction,
  MyCustomerSetDateOfBirthAction,
  MyCustomerSetFirstNameAction,
  MyCustomerSetLastNameAction,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { IUserInfo } from '../../models';
import CustomerController from '../../api/CustomerController';
import ButtonEditUpdate from './button-edit-update';

interface Props {
  userInfo: IUserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo>>;
}

const UserInfo: FC<Props> = ({ userInfo, setUserInfo }) => {
  const [isEdit, setIsEdit] = useState(true);
  const [formValues, setFormValues] = useState(userInfo);

  useEffect(() => {
    setFormValues(userInfo);
  }, [userInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      setIsEdit(false);
    } else {
      setIsEdit(true);

      let currentVersion;

      const updateUser = async (): Promise<ClientResponse<Customer>> => {
        const customerController = new CustomerController();

        const updateEmail: MyCustomerChangeEmailAction = {
          action: 'changeEmail',
          email: formValues.email,
        };

        const updateFirstName: MyCustomerSetFirstNameAction = {
          action: 'setFirstName',
          firstName: formValues.firstName,
        };

        const updateLastName: MyCustomerSetLastNameAction = {
          action: 'setLastName',
          lastName: formValues.lastName,
        };

        const updateDateOfBirth: MyCustomerSetDateOfBirthAction = {
          action: 'setDateOfBirth',
          dateOfBirth: formValues.dateOfBirth,
        };

        const actions: MyCustomerUpdateAction[] = [updateEmail, updateFirstName, updateLastName, updateDateOfBirth];

        currentVersion = (await customerController.getCustomer()).body?.version;

        if (currentVersion) {
          const response = await customerController.updateCustomer({
            version: currentVersion,
            actions,
          });

          return response;
        }

        throw Error("Can't read data");
      };

      updateUser()
        .then(() => {
          setUserInfo(formValues);
          toast.success('Saving was successful');
        })
        .catch(() => {
          setFormValues(userInfo);
          toast.error('Error changing user profile');
        });
    }
  };
  return (
    <div className="grid max-w-5xl mx-auto grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
      </div>

      {/* user info */}
      <form className="md:col-span-2" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              First name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="firstName"
                id="first-name"
                disabled={isEdit}
                value={formValues.firstName}
                onChange={handleInputChange}
                autoComplete="given-name"
                className="block w-full disabled:bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
              Last name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="lastName"
                id="last-name"
                disabled={isEdit}
                value={formValues.lastName}
                onChange={handleInputChange}
                autoComplete="family-name"
                className="block w-full disabled:bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                disabled={isEdit}
                value={formValues.email}
                onChange={handleInputChange}
                autoComplete="email"
                className="block w-full disabled:bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Date of birth
            </label>
            <div className="mt-2">
              <input
                id="date"
                name="dateOfBirth"
                type="date"
                disabled={isEdit}
                value={formValues.dateOfBirth}
                onChange={handleInputChange}
                autoComplete="email"
                className="block w-full disabled:bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ButtonEditUpdate isEdit={isEdit} />
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
