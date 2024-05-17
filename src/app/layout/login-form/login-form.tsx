import React, { MouseEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { HttpErrorType } from '@commercetools/sdk-client-v2';
import { useNavigate } from 'react-router-dom';
import CustomerController from '../../api/CustomerController';
import { IAuth, useStateContext } from '../../state/state-context';
import { LocalStorageKeysEnum, storageSet } from '../../api/helpers';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { auth } = useStateContext();
  const navigate = useNavigate();

  const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const customerController = new CustomerController();

    customerController.createAnonymousCustomer().then((response) => {
      // const { token, refreshToken, expirationTime } = response;

      console.log(response);
    });

    customerController
      .loginCustomer({ email: username, password })
      .then((response) => {
        console.log(response);
        if (response.apiResult.statusCode === 200 && response.token) {
          storageSet(LocalStorageKeysEnum.IS_AUTH, true);

          const authData: IAuth = {
            isAuth: true,
            authData: response.token,
          };

          auth.set(authData);

          toast((response.apiResult as HttpErrorType).message);

          navigate('/');
        }

        toast((response.apiResult as HttpErrorType).message);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="./assets/logo/logo.png" alt="logo" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setUsername(e.target.value)}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              onClick={handleLogin}
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
