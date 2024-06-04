import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  ClientResponse,
  Customer,
  MyCustomerChangeEmailAction,
  MyCustomerSetDateOfBirthAction,
  MyCustomerSetFirstNameAction,
  MyCustomerSetLastNameAction,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { Controller, useForm } from 'react-hook-form';
import { IUserInfo } from '../../models';
import CustomerController from '../../api/CustomerController';
import ButtonEditUpdate from './button-edit-update';
import { validationRules } from '../signup/regExp';

interface Props {
  userInfo: IUserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo>>;
}

const UserInfo: FC<Props> = ({ userInfo, setUserInfo }) => {
  const [isEdit, setIsEdit] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IUserInfo>({
    mode: 'onChange',
    defaultValues: userInfo,
  });

  useEffect(() => {
    reset(userInfo);
  }, [userInfo, reset]);

  const onSubmit = (data: IUserInfo) => {
    console.log(isValid);
    if (isEdit) {
      let currentVersion;

      const updateUser = async (): Promise<ClientResponse<Customer>> => {
        const customerController = new CustomerController();

        const updateEmail: MyCustomerChangeEmailAction = {
          action: 'changeEmail',
          email: data.email,
        };

        const updateFirstName: MyCustomerSetFirstNameAction = {
          action: 'setFirstName',
          firstName: data.firstName,
        };

        const updateLastName: MyCustomerSetLastNameAction = {
          action: 'setLastName',
          lastName: data.lastName,
        };

        const updateDateOfBirth: MyCustomerSetDateOfBirthAction = {
          action: 'setDateOfBirth',
          dateOfBirth: data.dateOfBirth,
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
          setUserInfo(data);
          reset(data);
          toast.success('Saving was successful');
        })
        .catch((error) => {
          // setFormValues(userInfo);
          toast.error(error.message);
        });
    }
  };
  return (
    <div className="grid max-w-5xl mx-auto grid-cols-1 gap-x-6 gap-y-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
      </div>

      {/* user info */}
      <form className="md:col-span-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              First name
            </label>
            <div className="mt-2">
              <Controller
                name="firstName"
                control={control}
                rules={validationRules.name}
                render={({ field }) => (
                  <input
                    {...field}
                    id="first-name"
                    type="text"
                    disabled={isEdit}
                    className="block w-full disabled:bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  />
                )}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
              Last name
            </label>
            <div className="mt-2">
              <Controller
                name="lastName"
                control={control}
                rules={validationRules.surname}
                render={({ field }) => (
                  <input
                    {...field}
                    id="last-name"
                    type="text"
                    disabled={isEdit}
                    className="block w-full disabled:bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  />
                )}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <Controller
                name="email"
                control={control}
                rules={validationRules.email}
                render={({ field }) => (
                  <input
                    {...field}
                    id="email"
                    type="email"
                    disabled={isEdit}
                    className="block w-full disabled:bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  />
                )}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Date of birth
            </label>
            <div className="mt-2">
              <Controller
                name="dateOfBirth"
                control={control}
                rules={validationRules.dateOfBirth}
                render={({ field }) => (
                  <input
                    {...field}
                    id="dateOfBirth"
                    type="date"
                    disabled={isEdit}
                    className="block w-full disabled:bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  />
                )}
              />
              {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ButtonEditUpdate isEdit={isEdit} setIsEdit={setIsEdit} />
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
