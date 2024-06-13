import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Customer } from '@commercetools/platform-sdk';
import { Switch } from '@headlessui/react';
import { validationRules } from '../../components/signup/regExp';
import MyLabel from '../../components/signup/label';
import MyModal from '../../components/signup/modal';
import { CountryEnum, StorageType } from '../../models';
import CustomerController from '../../api/CustomerController';
import { classNames } from '../../api/helpers';
import { showErrorModal, showSuccessModal } from '../../components/signup/showModal';
import MyBtn from '../../components/signup/btn';

const SignupForm = () => {
  const [storage] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    addresses: [
      { country: '', city: '', streetName: '', postalCode: '' },
      { country: '', city: '', streetName: '', postalCode: '' },
    ],
    email: '',
    password: '',
    isDefault: '',
    isShippingDefault: '',
  });

  const [isDefaultBilling, setDefaultBilling] = useState(false);
  const [isDefaultShipping, setDefaultShipping] = useState(false);
  const [isShipping, setShipping] = useState(false);

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<StorageType>({
    mode: 'onChange',
  });

  const pressSubmit: SubmitHandler<FieldValues> = (userData) => {
    const data = userData;
    if (isDefaultBilling) {
      data.defaultBillingAddress = 0;
    }
    if (isDefaultShipping && isShipping) {
      data.defaultShippingAddress = 1;
    }
    console.log(userData);
    new CustomerController()
      .registerCustomer(data as Customer)
      .then(() => {
        showSuccessModal('Great! You are registered');
      })
      .catch((err) => showErrorModal(err));
    // getEndpoints(storage).then(() => {
    //   const modalText = document.getElementById('modalTextError');
    //   if (modalText?.innerHTML === '') {
    //     showSuccessModal('Great! You are registered');
    //   }
    // });
  };

  // useEffect(() => {
  //   const even = (element: string) => element.length !== 0;
  //   if (dataError.some(even)) {
  //     setFormValid(false);
  //   } else {
  //     setFormValid(true);
  //   }
  // }, [dataError]); // change dataError to [dataError]. So you need to specify an array of dependencies instead of passing values

  return (
    <div className="signUpFormWrapper items-center overflow-auto h-dvh min-h-full px-2">
      <form className="signUpForm my-8 grid grid-cols-2" onSubmit={handleSubmit(pressSubmit)}>
        <div className="col-span-2 flex justify-between">
          <div className="flex w-20">
            <Link to="/">
              <span className="sr-only">Green shop</span>
              <img className="h-8 w-auto" src="./assets/logo/logo.png" alt="logo" />
            </Link>
          </div>
          <h1 className="text-lg">Registration</h1>
          <Link
            to="/login"
            className="rounded-md select-none bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
          >
            Log In
          </Link>
        </div>

        <div className="sectionRegister col-span-2 grid grid-cols-2 gap-x-4 gap-y-0">
          <div className="inputWrapper">
            <MyLabel htmlFor="name">Name</MyLabel>
            <Controller
              name="firstName"
              control={control}
              rules={validationRules.name}
              render={({ field }) => (
                <input
                  {...field}
                  // onBlur={(e) => blurHandler(e, regulars, dataDirty, setDataDirty, dataError)}
                  // onChange={(e) => set}
                  className="name name1"
                  name="name"
                  type="text"
                  placeholder="Name"
                  id="name"
                />
              )}
            />
            {errors.firstName && <div className="text-xs sm:text-sm text-red-500">{errors.firstName.message}</div>}
          </div>
          <div className="inputWrapper">
            <MyLabel htmlFor="surname">Surname</MyLabel>
            <Controller
              name="lastName"
              control={control}
              rules={validationRules.surname}
              render={({ field }) => (
                <input
                  {...field}
                  // onBlur={(e) => blurHandler(e, regulars, dataDirty, setDataDirty, dataError)}
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) => handler(e, storage, setStorage)}
                  className="surname surname1"
                  name="surname"
                  type="text"
                  placeholder="Surname"
                  id="surname"
                />
              )}
            />
            {errors.lastName && <div className="text-xs sm:text-sm text-red-500">{errors.lastName.message}</div>}
          </div>
          <div className="inputWrapper">
            <MyLabel htmlFor="birth">Birth</MyLabel>
            <Controller
              name="dateOfBirth"
              control={control}
              rules={validationRules.dateOfBirth}
              render={({ field }) => (
                <input
                  {...field}
                  // onBlur={(e) => blurHandler(e, regulars, dataDirty, setDataDirty, dataError)}
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) => handler(e, storage, setStorage)}
                  className="birth birth1"
                  name="birth"
                  type="date"
                  placeholder="Birth"
                  id="birth"
                />
              )}
            />
            {errors.dateOfBirth && <div className="text-xs sm:text-sm text-red-500">{errors.dateOfBirth.message}</div>}
          </div>
          <div className="inputWrapper">
            <MyLabel htmlFor="email">Email</MyLabel>
            <Controller
              name="email"
              control={control}
              rules={validationRules.email}
              render={({ field }) => (
                <input
                  {...field}
                  // onBlur={(e) => blurHandler(e, regulars, dataDirty, setDataDirty, dataError)}
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) => handler(e, storage, setStorage)}
                  className="email email1"
                  name="email"
                  type="text"
                  placeholder="Email"
                  id="email"
                />
              )}
            />
            {errors.email && <div className="text-xs sm:text-sm text-red-500">{errors.email.message}</div>}
          </div>
          <div className="inputWrapper">
            <MyLabel htmlFor="password">Password</MyLabel>
            <Controller
              name="password"
              control={control}
              rules={validationRules.password}
              render={({ field }) => (
                <input
                  {...field}
                  // onBlur={(e) => blurHandler(e, regulars, dataDirty, setDataDirty, dataError)}
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) => handler(e, storage, setStorage)}
                  className="password password1"
                  name="password"
                  type="text"
                  placeholder="Password"
                  id="password"
                />
              )}
            />
            {errors.password && <div className="text-xs sm:text-sm text-red-500">{errors.password.message}</div>}
          </div>
          <div className="inputWrapper">
            <div className="flex flex-col items-end justify-center gap-2 mt-auto mb-auto">
              <div className="flex justify-between h-fit w-fit right-0 bottom-36">
                <MyLabel className="text-xs w-fit mr-5 h-fit">Add Shipping address</MyLabel>
                <Switch
                  checked={isShipping}
                  onChange={setShipping}
                  className={classNames(
                    isShipping ? 'bg-green-500' : 'bg-gray-200',
                    'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline-none'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      isShipping ? 'translate-x-3.5' : 'translate-x-0',
                      'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                    )}
                  />
                </Switch>
              </div>
              <div className="flex justify-between h-fit w-fit right-0 bottom-36">
                <MyLabel className="text-xs w-fit mr-5 h-fit">Set Address as default</MyLabel>
                <Switch
                  checked={isDefaultBilling}
                  onChange={setDefaultBilling}
                  className={classNames(
                    isDefaultBilling ? 'bg-green-500' : 'bg-gray-200',
                    'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline-none'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      isDefaultBilling ? 'translate-x-3.5' : 'translate-x-0',
                      'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                    )}
                  />
                </Switch>
              </div>
              <div className="flex  justify-between w-fit h-fit right-0 bottom-28">
                <MyLabel className="text-xs w-fit mr-5 h-fit">Set Shipping Address as default</MyLabel>
                <Switch
                  checked={isDefaultShipping}
                  onChange={setDefaultShipping}
                  className={classNames(
                    isDefaultShipping ? 'bg-green-500' : 'bg-gray-200',
                    'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline-none'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      isDefaultShipping ? 'translate-x-3.5' : 'translate-x-0',
                      'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                    )}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </div>
        <div className="sectionRegister">
          <div className="inputWrapper">
            <MyLabel htmlFor="country">Country</MyLabel>
            <Controller
              name="addresses.0.country"
              control={control}
              rules={validationRules.country}
              render={({ field }) => (
                <select
                  {...field}
                  id="country"
                  className="block w-full disabled:bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    field.onChange(e);
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
            {errors.addresses?.[0]?.country && (
              <p className="text-red-500 text-xs mt-1">{errors.addresses?.[0]?.country.message}</p>
            )}
          </div>
          <div className="inputWrapper">
            <MyLabel htmlFor="city">Town/city</MyLabel>
            <Controller
              name="addresses.0.city"
              control={control}
              rules={validationRules.city}
              render={({ field }) => (
                <input
                  {...field}
                  // onBlur={(e) => blurHandler(e, regulars, dataDirty, setDataDirty, dataError)}
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) => handler(e, storage, setStorage)}
                  className="city city1"
                  name="city"
                  type="text"
                  placeholder="City"
                  id="city"
                />
              )}
            />
            {errors.addresses?.[0]?.city && (
              <div className="text-xs sm:text-sm text-red-500">{errors.addresses?.[0]?.city.message}</div>
            )}
          </div>
          <div className="inputWrapper">
            <MyLabel htmlFor="street">Street</MyLabel>
            <Controller
              name="addresses.0.streetName"
              control={control}
              rules={validationRules.streetName}
              render={({ field }) => (
                <input
                  {...field}
                  // onBlur={(e) => blurHandler(e, regulars, dataDirty, setDataDirty, dataError)}
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) => handler(e, storage, setStorage)}
                  className="street street1"
                  name="street"
                  type="text"
                  placeholder="Street"
                  id="street"
                />
              )}
            />
            {errors.addresses?.[0]?.streetName && (
              <div className="text-xs sm:text-sm text-red-500">{errors.addresses?.[0]?.streetName.message}</div>
            )}
          </div>
          <div className="inputWrapper">
            <MyLabel htmlFor="zip">Zip</MyLabel>
            <Controller
              name="addresses.0.postalCode"
              control={control}
              rules={validationRules.zip}
              render={({ field }) => (
                <input
                  {...field}
                  // onBlur={(e) => blurHandler(e, regulars, dataDirty, setDataDirty, dataError)}
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) => handler(e, storage, setStorage)}
                  className="zip zip1"
                  name="zip"
                  type="text"
                  placeholder="Zip"
                  id="zip"
                />
              )}
            />
            {errors.addresses?.[0]?.postalCode && (
              <div className="text-xs sm:text-sm text-red-500">{errors.addresses?.[0]?.postalCode.message}</div>
            )}
          </div>
        </div>
        <div className="sectionRegister">
          <div className="inputWrapper">
            <MyLabel htmlFor="shippingCountry">Shipping Country</MyLabel>
            <Controller
              name="addresses.1.country"
              control={control}
              rules={validationRules.country}
              render={({ field }) => (
                <select
                  {...field}
                  id="shippingCountry"
                  disabled={!isShipping}
                  className="block w-full disabled:bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    field.onChange(e);
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
            {errors.addresses?.[1]?.country && isShipping && (
              <div className="text-xs sm:text-sm text-red-500">{errors.addresses?.[1]?.country.message}</div>
            )}
          </div>
          <div className="inputWrapper">
            <MyLabel htmlFor="shippingCity">Shipping City</MyLabel>
            <Controller
              name="addresses.1.city"
              control={control}
              rules={validationRules.city}
              render={({ field }) => (
                <input
                  {...field}
                  // onBlur={(e) => blurHandler(e, regulars, dataDirty, setDataDirty, dataError)}
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) => handler(e, storage, setStorage)}
                  className={classNames(!isShipping ? 'bg-gray-200' : '', 'shippingCity')}
                  disabled={!isShipping}
                  name="shippingCity"
                  type="text"
                  placeholder="Shipping city"
                  id="shippingCity"
                />
              )}
            />
            {errors.addresses?.[1]?.city && isShipping && (
              <div className="text-xs sm:text-sm text-red-500">{errors.addresses?.[1]?.city.message}</div>
            )}
          </div>
          <div className="inputWrapper">
            <MyLabel htmlFor="shippingStreet">Shipping Street</MyLabel>
            <Controller
              name="addresses.1.streetName"
              control={control}
              rules={validationRules.streetName}
              render={({ field }) => (
                <input
                  {...field}
                  // onBlur={(e) => blurHandler(e, regulars, dataDirty, setDataDirty, dataError)}
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) => handler(e, storage, setStorage)}
                  className={classNames(!isShipping ? 'bg-gray-200' : '', 'shippingStreet')}
                  disabled={!isShipping}
                  name="shippingStreet"
                  type="text"
                  placeholder="Shipping street"
                  id="shippingStreet"
                />
              )}
            />
            {errors.addresses?.[1]?.streetName && isShipping && (
              <div className="text-xs sm:text-sm text-red-500">{errors.addresses?.[1]?.streetName.message}</div>
            )}
          </div>
          <div className="inputWrapper">
            <MyLabel htmlFor="shippingZip">Shipping Zip</MyLabel>
            <Controller
              name="addresses.1.postalCode"
              control={control}
              rules={validationRules.zip}
              render={({ field }) => (
                <input
                  {...field}
                  // onBlur={(e) => blurHandler(e, regulars, dataDirty, setDataDirty, dataError)}
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) => handler(e, storage, setStorage)}
                  className={classNames(!isShipping ? 'bg-gray-200' : '', 'shippingZip')}
                  disabled={!isShipping}
                  name="shippingZip"
                  type="text"
                  placeholder="Shipping zip"
                  id="shippingZip"
                />
              )}
            />
            {errors.addresses?.[1]?.postalCode && isShipping && (
              <div className="text-xs sm:text-sm text-red-500">{errors.addresses?.[1]?.postalCode.message}</div>
            )}
          </div>
        </div>

        <div className="flex justify-center col-span-2">
          <MyBtn
            disabled={!isValid}
            // onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => pressSubmit(e, storage)}
            type="submit"
            className="submitRegistrationselect-none disabled:bg-green-200 rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
          >
            Registration
          </MyBtn>
          {/* <input type="submit" /> */}
        </div>
        <MyModal
          className="modal"
          classText="modalTextError"
          errorText=""
          type="Error"
          login={storage.email}
          password={storage.password}
        ></MyModal>
        <MyModal
          className="modalSuccess"
          classText="modalTextSuccess"
          errorText=""
          type="Success"
          login={storage.email}
          password={storage.password}
          // redirect={navigate}
        ></MyModal>
      </form>
    </div>
  );
};

export default SignupForm;
