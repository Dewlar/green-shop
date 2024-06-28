import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { HttpErrorType } from '@commercetools/sdk-client-v2';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import CustomerController from '../../api/CustomerController';
import { useStateContext } from '../../state/state-context';
import { LocalStorageKeysEnum, storageSet, UserCredentialData } from '../../api/helpers';
import { validationRules } from '../../components/signup/regExp';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setIsAuth, setAuthData, setCustomerData } = useStateContext();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserCredentialData>({
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: UserCredentialData) => {
    const customerController = new CustomerController();

    customerController
      .createAnonymousCustomer()
      .then(() => {
        return customerController.loginCustomer({ email: data.email, password: data.password });
      })
      .then((response) => {
        if (response.apiResult.statusCode === 200 && response.token) {
          storageSet(LocalStorageKeysEnum.IS_AUTH, true);
          setIsAuth(true);
          setAuthData(response.token);

          toast.success('Login successful!');
          navigate('/');
          setCustomerData(response.customer);
        } else {
          toast.error((response.apiResult as HttpErrorType).message);
        }
      })
      .catch(() => {
        toast.error('Error during login. Please try again.');
      });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-dvh -mt-16">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center w-full items-center">
          <Link to="/">
            <span className="sr-only">Green shop</span>
            <img className="h-8 w-auto" src="./assets/logo/logo.png" alt="logo" />
          </Link>
        </div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-7" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2 relative">
              <Controller
                name="email"
                control={control}
                rules={validationRules.email}
                render={({ field }) => (
                  <input
                    {...field}
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                )}
              />
              {errors.email && <p className="absolute -bottom-5 left-0 text-red-500 text-xs">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2 relative">
              <div className="relative">
                <Controller
                  name="password"
                  control={control}
                  rules={validationRules.password}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <EyeIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="absolute -bottom-5 left-0 text-red-500 text-xs">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              onClick={handleSubmit(onSubmit)}
              type="submit"
              disabled={!isValid}
              className="flex w-full justify-center rounded-md bg-green-600 disabled:bg-gray-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline-none"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Not have an account?{' '}
          <Link to="/signup" className="text-sm font-medium text-green-500 hover:text-green-700">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
