import React, { FC } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { classNames } from '../../models';

interface IProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordInput: FC<IProps> = ({ name, value, onChange, disabled, showPassword, setShowPassword }) => {
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        id={name}
        type={showPassword ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="block w-full disabled:bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className={classNames(
          disabled ? 'hidden' : 'block',
          'absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700'
        )}
      >
        {showPassword ? (
          <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
        ) : (
          <EyeIcon className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
