import React, { FC } from 'react';
import { Field, Label, Switch } from '@headlessui/react';
import { classNames } from '../../models';

interface IProps {
  title: string;
  isEdit: boolean;
  isDefaultAddress: boolean;
  setIsDefaultAddress: React.Dispatch<React.SetStateAction<boolean>>;
}

const DefaultAddressSwitch: FC<IProps> = ({ title, isEdit, isDefaultAddress, setIsDefaultAddress }) => {
  return (
    <Field as="div" className="flex">
      <Label as="dt" className="flex-none font-medium text-sm text-gray-600" passive>
        Set as{' '}
        <span className={classNames(isDefaultAddress ? 'text-green-500' : '', ' transition-colors duration-200')}>
          {title}
        </span>
        .
      </Label>
      <dd className="flex flex-auto items-center justify-end">
        <Switch
          disabled={isEdit}
          checked={isDefaultAddress}
          onChange={setIsDefaultAddress}
          className={classNames(
            isEdit ? 'cursor-auto' : '',
            isDefaultAddress ? 'bg-green-500' : 'bg-gray-200',
            'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline-none'
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              isDefaultAddress ? 'translate-x-3.5' : 'translate-x-0',
              'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
            )}
          />
        </Switch>
      </dd>
    </Field>
  );
};

export default DefaultAddressSwitch;
