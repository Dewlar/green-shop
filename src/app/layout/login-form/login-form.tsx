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
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  const { auth } = useStateContext();
  const navigate = useNavigate();

  const validateEmail = (email: string): string[] => {
    const errors: string[] = [];
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const latinCharsRegex = /^[a-zA-Z0-9._%+-@]+$/;
    console.log(email);

    if (!email) {
      errors.push('Email is required.');
    }

    if (!latinCharsRegex.test(email)) {
      errors.push('Email address should only contain Latin characters.');
    }

    if (!emailRegex.test(email)) {
      errors.push('Invalid email address format.');
    }

    if (!email.includes('@')) {
      errors.push('Email address must contain the "@" symbol.');
    }

    const [, domainPart] = email.split('@');
    if (!domainPart) {
      errors.push('Email address must contain a domain name (e.g., example.com).');
    }

    if (domainPart && !domainPart.includes('.')) {
      errors.push('Email address domain must contain a dot (e.g., example.com).');
    }

    return errors;
  };

  const validatePassword = (pw: string): string[] => {
    const errors: string[] = [];
    if (pw.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }
    if (!/[A-Z]/.test(pw)) {
      errors.push('Password must contain at least one uppercase letter.');
    }
    if (!/[a-z]/.test(pw)) {
      errors.push('Password must contain at least one lowercase letter.');
    }
    if (!/\d/.test(pw)) {
      errors.push('Password must contain at least one number.');
    }
    if (!/[@$!%*?&]/.test(pw)) {
      errors.push('Password must contain at least one special character.');
    }
    return errors;
  };

  const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const emailValidationErrors = validateEmail(username);
    const passwordValidationErrors = validatePassword(password);

    setEmailErrors(emailValidationErrors);
    setPasswordErrors(passwordValidationErrors);

    if (emailValidationErrors.length > 0 || passwordValidationErrors.length > 0) {
      return;
    }

    const customerController = new CustomerController();

    customerController.createAnonymousCustomer().then((response) => {
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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setUsername(email);
    setEmailErrors(validateEmail(email));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pw = e.target.value;
    setPassword(pw);
    setPasswordErrors(validatePassword(pw));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
                onChange={handleEmailChange}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
              {emailErrors.length > 0 && (
                <div className="text-red-600">
                  {emailErrors.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div>
                <input
                  type="checkbox"
                  id="show-password"
                  checked={showPassword}
                  onChange={toggleShowPassword}
                  className={showPassword ? 'bg-green-500' : ''}
                />
                <label htmlFor="show-password" className="ml-2 text-sm leading-6 text-gray-900">
                  Show Password
                </label>
              </div>
            </div>
            <div className="mt-2">
              <input
                onChange={handlePasswordChange}
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
              {passwordErrors.length > 0 && (
                <div className="text-red-600">
                  {passwordErrors.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <button
              onClick={handleLogin}
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
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
