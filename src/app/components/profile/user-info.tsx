import React, { FC, useEffect, useState } from 'react';
import { IUserInfo } from '../../models';

const UserInfo: FC<IUserInfo> = ({ userInfo }) => {
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
    console.log(formValues);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEdit((prevIsEdit) => !prevIsEdit);
    if (isEdit) {
      console.log('Form submitted', isEdit);
      setIsEdit(false);
      console.log(formValues);
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
          <button
            type="submit"
            className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
          >
            {isEdit ? 'Edit' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
