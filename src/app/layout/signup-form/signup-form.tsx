import { Controller, useForm } from 'react-hook-form';
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { validationRules } from '../../components/signup/regExp';
// import MyItem from '../../components/signup/formItem';
// import inputTypes from '../../components/signup/inputTypes';
// import blurHandler from '../../components/signup/blur';
// import handler from '../../components/signup/handler';
// import pressSubmit from '../../components/signup/submitBtn';
import MyInput from '../../components/signup/input';
import MyLabel from '../../components/signup/label';
// import setDefaultAddress from '../../components/signup/defaultAddress';
// import setShippingAddress from '../../components/signup/shippingAddress';
import MyModal from '../../components/signup/modal';
import pressSubmit from '../../components/signup/submitBtn';
import { CountryEnum, StorageType } from '../../models';
// import MyModal from '../../components/signup/modal';

const SignupForm = () => {
  // const navigate = useNavigate();
  const [storage] = useState({
    name: '',
    surname: '',
    birth: '',
    addresses: {
      billing: { country: '', city: '', street: '', zip: '' },
      shipping: { shippingCountry: '', shippingCity: '', shippingStreet: '', shippingZip: '' },
    },
    email: '',
    password: '',
    isShipping: '',
    isDefault: '',
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<StorageType>({
    mode: 'onChange',
  });

  // const [dataDirty, setDataDirty] = useState([
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  // ]);
  // const [dataError] = useState([
  //   'Please enter your name',
  //   'Please enter your surname',
  //   'Please enter your birth date',
  //   'Please enter your country',
  //   'Please enter your town/city',
  //   'Please enter your street',
  //   'Please enter your zip',
  //   '',
  //   '',
  //   '',
  //   '',
  //   'Please enter your email',
  //   'Please enter your password',
  // ]);
  // const [formValid, setFormValid] = useState(false);

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
      <form className="signUpForm my-8" onSubmit={handleSubmit(pressSubmit)}>
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

        <div className="inputWrapper">
          <MyLabel htmlFor="name">Name</MyLabel>
          <Controller
            name="name"
            control={control}
            rules={validationRules.name}
            render={({ field }) => (
              <input
                {...field}
                // onBlur={(e) => blurHandler(e, regulars, dataDirty, setDataDirty, dataError)}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => handler(e, storage, setStorage)}
                className="name name1"
                name="name"
                type="text"
                placeholder="Name"
                id="name"
              />
            )}
          />
          {errors.name && <div className="text-xs sm:text-sm text-red-500">{errors.name.message}</div>}
        </div>
        <div className="inputWrapper">
          <MyLabel htmlFor="surname">Surname</MyLabel>
          <Controller
            name="surname"
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
          {errors.surname && <div className="text-xs sm:text-sm text-red-500">{errors.surname.message}</div>}
        </div>
        <div className="inputWrapper">
          <MyLabel htmlFor="birth">Birth</MyLabel>
          <Controller
            name="birth"
            control={control}
            rules={validationRules.dateOfBirth}
            render={({ field }) => (
              <input
                {...field}
                // onBlur={(e) => blurHandler(e, regulars, dataDirty, setDataDirty, dataError)}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => handler(e, storage, setStorage)}
                className="birth birth1"
                name="birth"
                type="text"
                placeholder="Birth"
                id="birth"
              />
            )}
          />
          {errors.birth && <div className="text-xs sm:text-sm text-red-500">{errors.birth.message}</div>}
        </div>
        <div className="inputWrapper">
          <MyLabel htmlFor="country">Country</MyLabel>
          <Controller
            name="addresses.billing.country"
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
          {errors.addresses?.billing?.country && (
            <p className="text-red-500 text-xs mt-1">{errors.addresses?.billing?.country.message}</p>
          )}
        </div>
        <div className="inputWrapper">
          <MyLabel htmlFor="city">Town/city</MyLabel>
          <Controller
            name="addresses.billing.city"
            control={control}
            rules={validationRules.dateOfBirth}
            render={({ field }) => (
              <input
                {...field}
                // onBlur={(e) => blurHandler(e, regulars, dataDirty, setDataDirty, dataError)}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => handler(e, storage, setStorage)}
                className="city city1"
                name="city"
                type="text"
                placeholder="city"
                id="city"
              />
            )}
          />
          {errors.addresses?.billing?.city && (
            <div className="text-xs sm:text-sm text-red-500">{errors.addresses?.billing?.city.message}</div>
          )}
        </div>
        <div className="inputWrapper">
          <MyLabel htmlFor="street">Street</MyLabel>
          <Controller
            name="addresses.billing.street"
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
                placeholder="street"
                id="street"
              />
            )}
          />
          {errors.addresses?.billing?.street && (
            <div className="text-xs sm:text-sm text-red-500">{errors.addresses?.billing?.street.message}</div>
          )}
        </div>
        <div className="inputWrapper">
          <MyLabel htmlFor="zip">Zip</MyLabel>
          <Controller
            name="addresses.billing.zip"
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
                placeholder="zip"
                id="zip"
              />
            )}
          />
          {errors.addresses?.billing?.zip && (
            <div className="text-xs sm:text-sm text-red-500">{errors.addresses?.billing?.zip.message}</div>
          )}
        </div>
        <div className="inputWrapper">
          <MyLabel htmlFor="shippingCountry">Shipping Country</MyLabel>
          <Controller
            name="addresses.shipping.shippingCountry"
            control={control}
            rules={validationRules.country}
            render={({ field }) => (
              <select
                {...field}
                id="shippingCountry"
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
          {errors.addresses?.shipping?.shippingCountry && (
            <div className="text-xs sm:text-sm text-red-500">{errors.addresses?.shipping?.shippingCountry.message}</div>
          )}
        </div>
        <div className="inputWrapper">
          <MyLabel htmlFor="shippingCity">Shipping City</MyLabel>
          <Controller
            name="addresses.shipping.shippingCity"
            control={control}
            rules={validationRules.city}
            render={({ field }) => (
              <input
                {...field}
                // onBlur={(e) => blurHandler(e, regulars, dataDirty, setDataDirty, dataError)}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => handler(e, storage, setStorage)}
                className="shippingCity shippingCity1"
                name="shippingCity"
                type="text"
                placeholder="shippingCity"
                id="shippingCity"
              />
            )}
          />
          {errors.addresses?.shipping?.shippingCity && (
            <div className="text-xs sm:text-sm text-red-500">{errors.addresses?.shipping.shippingCity.message}</div>
          )}
        </div>
        <div className="inputWrapper">
          <MyLabel htmlFor="shippingStreet">Shipping Street</MyLabel>
          <Controller
            name="addresses.shipping.shippingStreet"
            control={control}
            rules={validationRules.streetName}
            render={({ field }) => (
              <input
                {...field}
                // onBlur={(e) => blurHandler(e, regulars, dataDirty, setDataDirty, dataError)}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => handler(e, storage, setStorage)}
                className="shippingStreet shippingStreet1"
                name="shippingStreet"
                type="text"
                placeholder="shippingStreet"
                id="shippingStreet"
              />
            )}
          />
          {errors.addresses?.shipping?.shippingStreet && (
            <div className="text-xs sm:text-sm text-red-500">{errors.addresses?.shipping.shippingStreet.message}</div>
          )}
        </div>
        <div className="inputWrapper">
          <MyLabel htmlFor="shippingZip">Shipping Zip</MyLabel>
          <Controller
            name="addresses.shipping.shippingZip"
            control={control}
            rules={validationRules.zip}
            render={({ field }) => (
              <input
                {...field}
                // onBlur={(e) => blurHandler(e, regulars, dataDirty, setDataDirty, dataError)}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => handler(e, storage, setStorage)}
                className="shippingZip shippingZip1"
                name="shippingZip"
                type="text"
                placeholder="shippingZip"
                id="shippingZip"
              />
            )}
          />
          {errors.addresses?.shipping?.shippingZip && (
            <div className="text-xs sm:text-sm text-red-500">{errors.addresses?.shipping.shippingZip.message}</div>
          )}
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
                placeholder="email"
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
                placeholder="password"
                id="password"
              />
            )}
          />
          {errors.password && <div className="text-xs sm:text-sm text-red-500">{errors.password.message}</div>}
        </div>
        <div className="flex flex-col items-end justify-center gap-2">
          <div className="flex justify-between h-fit w-fit right-0 bottom-36">
            <MyLabel className="text-xs w-fit mr-5 h-fit">Set Address as default</MyLabel>
            <MyInput
              type={'checkbox'}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDefaultAddress(e, storage, setStorage)}
            ></MyInput>
          </div>
          <div className="flex  justify-between w-fit h-fit right-0 bottom-28">
            <MyLabel className="text-xs w-fit mr-5 h-fit">Add Shipping address</MyLabel>
            <MyInput
              className="setShipping"
              type={'checkbox'}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              //   setShippingAddress(e, storage, setStorage, dataError, setDataError)
              // }
            ></MyInput>
          </div>
        </div>
        <div className="flex justify-center col-span-2">
          {/* <MyBtn
            disabled={!formValid}
            // onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => pressSubmit(e, storage)}
            type="submit"
            className="submitRegistrationselect-none disabled:bg-green-200 rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
          >
            Registration
          </MyBtn> */}
          <input type="submit" />
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
