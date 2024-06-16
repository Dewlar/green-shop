import { Controller, FieldValues, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Customer } from '@commercetools/platform-sdk';
import { Switch } from '@headlessui/react';
import { validationRules } from '../../components/signup/regExp';
import MyModal from '../../components/signup/modal';
import { CountryEnum, StorageType } from '../../models';
import CustomerController from '../../api/CustomerController';
import { classNames } from '../../api/helpers';
import { showErrorModal, showSuccessModal } from '../../components/signup/showModal';
import defaultFormValues from '../../components/signup/defaultFormValues';

const SignupForm = () => {
  const [isDefaultBilling, setDefaultBilling] = useState(false);
  const [isDefaultShipping, setDefaultShipping] = useState(false);
  const [isShipping, setShipping] = useState(false);
  const [isShippingPress, setShippingPress] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(false);
  const [selectedShippingCountry, setSelectedShippingCountry] = useState(false);
  const [modalData, setModalData] = useState({ login: '', pass: '' });

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    setValue,
    trigger,
  } = useForm<StorageType>({
    mode: 'onChange',
    defaultValues: defaultFormValues,
  });

  const watchCountryBilling = useWatch({ control, name: 'addresses.0.country' });
  const watchCountryShipping = useWatch({ control, name: 'addresses.1.country' });
  const watchCity = useWatch({ control, name: 'addresses.0.city' });
  const watchStreet = useWatch({ control, name: 'addresses.0.streetName' });
  const watchZip = useWatch({ control, name: 'addresses.0.postalCode' });

  useEffect(() => {
    if (isShippingPress) {
      setValue('addresses.1.country', isShipping ? 'DE' : watchCountryBilling, {
        shouldValidate: isShipping,
        shouldDirty: false,
        shouldTouch: false,
      });
      setValue('addresses.1.city', isShipping ? '' : watchCity, {
        shouldValidate: isShipping,
        shouldDirty: false,
        shouldTouch: false,
      });
      setValue('addresses.1.streetName', isShipping ? '' : watchStreet, {
        shouldValidate: isShipping,
        shouldDirty: false,
        shouldTouch: false,
      });
      setValue('addresses.1.postalCode', isShipping ? '' : watchZip, {
        shouldValidate: isShipping,
        shouldDirty: false,
        shouldTouch: false,
      });
      trigger(['addresses.1.country', 'addresses.1.city', 'addresses.1.streetName', 'addresses.1.postalCode']);
    }
  }, [isShipping, isShippingPress, setValue, trigger]);

  useEffect(() => {
    if (selectedCountry) {
      setValue('addresses.0.postalCode', '', { shouldValidate: true, shouldDirty: true, shouldTouch: true });
      setSelectedCountry(false);
    }
  }, [watchCountryBilling, selectedCountry, setValue]);
  useEffect(() => {
    if (selectedShippingCountry) {
      setValue('addresses.1.postalCode', '', { shouldValidate: true, shouldDirty: true, shouldTouch: true });
      setSelectedShippingCountry(false);
    }
  }, [watchCountryShipping, selectedShippingCountry, setValue]);
  useEffect(() => {
    if (!isShipping) {
      setValue('addresses.1.country', watchCountryBilling);
    }
  }, [watchCountryBilling, setValue]);
  useEffect(() => {
    if (!isShipping) {
      setValue('addresses.1.city', watchCity);
    }
  }, [watchCity, setValue]);
  useEffect(() => {
    if (!isShipping) {
      setValue('addresses.1.streetName', watchStreet);
    }
  }, [watchStreet, setValue]);
  useEffect(() => {
    if (!isShipping) {
      setValue('addresses.1.postalCode', watchZip);
    }
  }, [watchZip, setValue]);

  const pressSubmit: SubmitHandler<FieldValues> = (userData) => {
    const data = userData;
    const body: StorageType = {
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      addresses: isShipping
        ? [
            {
              country: data.addresses[0].country,
              city: data.addresses[0].city,
              streetName: data.addresses[0].streetName,
              postalCode: data.addresses[0].postalCode,
            },
            {
              country: data.addresses[1].country,
              city: data.addresses[1].city,
              streetName: data.addresses[1].streetName,
              postalCode: data.addresses[1].postalCode,
            },
          ]
        : [
            {
              country: data.addresses[0].country,
              city: data.addresses[0].city,
              streetName: data.addresses[0].streetName,
              postalCode: data.addresses[0].postalCode,
            },
          ],
      billingAddresses: isShipping ? [0, 1] : [0],
      shippingAddresses: isShipping ? [0, 1] : [0],
      email: data.email,
      password: data.password,
    };
    if (isDefaultBilling) {
      body.defaultBillingAddress = 0;
    }
    if (isDefaultShipping && isShipping) {
      body.defaultShippingAddress = 1;
    } else if (isDefaultShipping) {
      body.defaultShippingAddress = 0;
    }
    setModalData({ login: body.email, pass: body.password });
    new CustomerController()
      .registerCustomer(body as unknown as Customer)
      .then(() => {
        showSuccessModal('Great! You are registered');
      })
      .catch((err) => showErrorModal(err));
  };

  return (
    <div className="signUpFormWrapper flex relative justify-center items-center overflow-auto h-dvh min-h-full px-2">
      <form className="signUpForm w-60vw my-8 grid grid-cols-2" onSubmit={handleSubmit(pressSubmit)}>
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
            <label htmlFor="name">Name</label>
            <Controller
              name="firstName"
              control={control}
              rules={validationRules.name}
              render={({ field }) => <input {...field} name="name" type="text" placeholder="Name" id="name" />}
            />
            {errors.firstName && <div className="text-xs sm:text-sm text-red-500">{errors.firstName.message}</div>}
          </div>
          <div className="inputWrapper">
            <label htmlFor="surname">Surname</label>
            <Controller
              name="lastName"
              control={control}
              rules={validationRules.surname}
              render={({ field }) => <input {...field} name="surname" type="text" placeholder="Surname" id="surname" />}
            />
            {errors.lastName && <div className="text-xs sm:text-sm text-red-500">{errors.lastName.message}</div>}
          </div>
          <div className="inputWrapper">
            <label htmlFor="birth">Birth</label>
            <Controller
              name="dateOfBirth"
              control={control}
              rules={validationRules.dateOfBirth}
              render={({ field }) => <input {...field} name="birth" type="date" placeholder="Birth" id="birth" />}
            />
            {errors.dateOfBirth && <div className="text-xs sm:text-sm text-red-500">{errors.dateOfBirth.message}</div>}
          </div>
          <div className="inputWrapper">
            <label htmlFor="email">Email</label>
            <Controller
              name="email"
              control={control}
              rules={validationRules.email}
              render={({ field }) => <input {...field} name="email" type="text" placeholder="Email" id="email" />}
            />
            {errors.email && <div className="text-xs sm:text-sm text-red-500">{errors.email.message}</div>}
          </div>
          <div className="inputWrapper">
            <label htmlFor="password">Password</label>
            <Controller
              name="password"
              control={control}
              rules={validationRules.password}
              render={({ field }) => (
                <input {...field} name="password" type="password" placeholder="Password" id="password" />
              )}
            />
            {errors.password && <div className="text-xs sm:text-sm text-red-500">{errors.password.message}</div>}
          </div>
          <div className="inputWrapper">
            <div className="flex flex-col items-end justify-center gap-2 mt-auto mb-auto">
              <div className="flex justify-between h-fit w-fit right-0 bottom-36">
                <label className="switch-btn text-xs w-fit mr-5 h-fit">Add Shipping address</label>
                <Switch
                  checked={isShipping}
                  onChange={() => {
                    setShipping((prev) => !prev);
                    setShippingPress(true);
                  }}
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
                <label className="switch-btn text-xs w-fit mr-5 h-fit">Set Address as default</label>
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
                <label className="switch-btn text-xs w-fit mr-5 h-fit">Set Shipping Address as default</label>
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
            <label htmlFor="country">Country</label>
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
                    setSelectedCountry(true);
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
            <label htmlFor="city">Town/city</label>
            <Controller
              name="addresses.0.city"
              control={control}
              rules={validationRules.city}
              render={({ field }) => <input {...field} name="city" type="text" placeholder="Town/city" id="city" />}
            />
            {errors.addresses?.[0]?.city && (
              <div className="text-xs sm:text-sm text-red-500">{errors.addresses?.[0]?.city.message}</div>
            )}
          </div>
          <div className="inputWrapper">
            <label htmlFor="street">Street</label>
            <Controller
              name="addresses.0.streetName"
              control={control}
              rules={validationRules.streetName}
              render={({ field }) => <input {...field} name="street" type="text" placeholder="Street" id="street" />}
            />
            {errors.addresses?.[0]?.streetName && (
              <div className="text-xs sm:text-sm text-red-500">{errors.addresses?.[0]?.streetName.message}</div>
            )}
          </div>
          <div className="inputWrapper">
            <label htmlFor="zip">Zip</label>
            <Controller
              name="addresses.0.postalCode"
              control={control}
              rules={validationRules.postalCode(watchCountryBilling)}
              render={({ field }) => <input {...field} name="zip" type="text" placeholder="Zip" id="zip" />}
            />
            {errors.addresses?.[0]?.postalCode && (
              <div className="text-xs sm:text-sm text-red-500">{errors.addresses?.[0]?.postalCode.message}</div>
            )}
          </div>
        </div>
        <div className="sectionRegister">
          <div className="inputWrapper">
            <label htmlFor="shippingCountry">Shipping Country</label>
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
                    setSelectedShippingCountry(true);
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
            <label htmlFor="shippingCity">Shipping City</label>
            <Controller
              name="addresses.1.city"
              control={control}
              rules={validationRules.city}
              render={({ field }) => (
                <input
                  {...field}
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
            <label htmlFor="shippingStreet">Shipping Street</label>
            <Controller
              name="addresses.1.streetName"
              control={control}
              rules={validationRules.streetName}
              render={({ field }) => (
                <input
                  {...field}
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
            <label htmlFor="shippingZip">Shipping Zip</label>
            <Controller
              name="addresses.1.postalCode"
              control={control}
              rules={validationRules.postalCode(watchCountryShipping)}
              render={({ field }) => (
                <input
                  {...field}
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
          <button
            type="submit"
            className={`rounded-md bg-gray-200 px-3.5 py-2.5 text-sm font-semibold text-white ${isValid ? 'bg-green-600 hover:bg-green-700 cursor-pointer' : 'cursor-default'}`}
          >
            Registration
          </button>
        </div>
        <MyModal
          className="modal"
          classText="modalTextError"
          errorText=""
          type="Error"
          login={modalData.login}
          password={modalData.pass}
        ></MyModal>
        <MyModal
          className="modalSuccess"
          classText="modalTextSuccess"
          errorText=""
          type="Success"
          login={modalData.login}
          password={modalData.pass}
        ></MyModal>
      </form>
    </div>
  );
};

export default SignupForm;
