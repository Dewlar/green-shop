import React, { FC, useState } from 'react';
import { HttpErrorType } from '@commercetools/sdk-client-v2';
import { toast } from 'react-toastify';
import { MyCustomerChangePassword } from '@commercetools/platform-sdk';
import { Controller, useForm } from 'react-hook-form';
import CustomerController from '../../api/CustomerController';
import ButtonEditUpdate from './button-edit-update';
import { useStateContext } from '../../state/state-context';
import { SessionStorageKeysEnum, storageSet } from '../../api/helpers';
import TokenService from '../../api/TokenService';
import PasswordInput from './password-input';
import { validationRules } from '../signup/regExp';

interface IProps {
  email: string;
}
interface IPassword {
  currentPassword: string;
  newPassword: string;
}
const initialPasswords: IPassword = {
  currentPassword: '',
  newPassword: '',
};

const UserPassword: FC<IProps> = ({ email }) => {
  const [isEdit, setIsEdit] = useState(true);
  // const [passwords, setPasswords] = useState(initialPasswords);
  const { setIsAuth, setAuthData } = useStateContext();
  const [showPassword, setShowPassword] = useState(false);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setPasswords((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IPassword>({
    mode: 'onChange',
    defaultValues: initialPasswords,
  });

  const onSubmit = (data: IPassword) => {
    // e.preventDefault();
    console.log('is form valide? -> ', isValid);

    let currentVersion;

    const changePass = async (): Promise<void> => {
      const customerController = new CustomerController();

      currentVersion = (await customerController.getCustomer()).body?.version;

      if (currentVersion) {
        const passwordAction: MyCustomerChangePassword = {
          version: currentVersion,
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        };

        await customerController.changeCustomerPassword(passwordAction);
      }

      const tokenService = new TokenService();
      tokenService.removeToken();
      storageSet(SessionStorageKeysEnum.IS_AUTH, false);
      await customerController.createAnonymousCustomer().then(() => {
        customerController
          .loginCustomer({
            email,
            password: data.newPassword,
          })
          .then((response) => {
            if (response.apiResult.statusCode === 200 && response.token) {
              storageSet(SessionStorageKeysEnum.IS_AUTH, true);
              setIsAuth(true);
              setAuthData(response.token);
            } else {
              const errorMessage = (response.apiResult as HttpErrorType).message;
              if (errorMessage) toast.error(`Api result error: ${errorMessage}`);
            }
          })
          .catch((error) => {
            toast.error(`Login error. Reason:  ${error.message}`);
          });
      });
    };

    changePass()
      .then(() => {
        // setPasswords(initialPasswords);
        reset();
        setShowPassword(false);
        toast.success('Password changed successfully');
      })
      .catch((err: HttpErrorType) => {
        // setPasswords(initialPasswords);
        reset();
        setShowPassword(false);
        toast.error(`Can't change password. Reason: ${err.message}`);
      });
  };

  return (
    <div className="grid max-w-5xl mx-auto grid-cols-1 gap-x-6 gap-y-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">Change password</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Update your password associated with your account.</p>
      </div>

      <form className="md:col-span-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-md sm:grid-cols-6">
          <div className="col-span-full">
            <label htmlFor="current-password" className="block text-sm font-medium leading-6 text-gray-900">
              Current password
            </label>
            <div className="mt-2">
              <Controller
                name="currentPassword"
                control={control}
                rules={validationRules.password}
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    disabled={isEdit}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                )}
              />
              {errors.currentPassword && <p className="text-red-500 text-xs mt-1">{errors.currentPassword.message}</p>}
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-gray-900">
              New password
            </label>
            <div className="mt-2">
              <Controller
                name="newPassword"
                control={control}
                rules={validationRules.password}
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    disabled={isEdit}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                )}
              />
              {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>}
            </div>
          </div>
        </div>

        <div className="mt-8 flex">
          <ButtonEditUpdate isEdit={isEdit} setIsEdit={setIsEdit} />
        </div>
      </form>
    </div>
  );
};

export default UserPassword;
