import React, { FC, useState } from 'react';
import { HttpErrorType } from '@commercetools/sdk-client-v2';
import { toast } from 'react-toastify';
import { MyCustomerChangePassword } from '@commercetools/platform-sdk';
import CustomerController from '../../api/CustomerController';
import ButtonEditUpdate from './button-edit-update';
import { useStateContext } from '../../state/state-context';
import { LocalStorageKeysEnum, storageSet } from '../../api/helpers';
import TokenService from '../../api/TokenService';
import PasswordInput from './password-input';

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
  const [passwords, setPasswords] = useState(initialPasswords);
  const { setIsAuth, setAuthData } = useStateContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(passwords, email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      setIsEdit(false);
    } else {
      setIsEdit(true);

      let currentVersion;

      const changePass = async (): Promise<void> => {
        const customerController = new CustomerController();

        currentVersion = (await customerController.getCustomer()).body?.version;

        if (currentVersion) {
          const passwordAction: MyCustomerChangePassword = {
            version: currentVersion,
            currentPassword: passwords.currentPassword,
            newPassword: passwords.newPassword,
          };

          await customerController.changeCustomerPassword(passwordAction);
        }

        // logout(false);
        const tokenService = new TokenService();
        tokenService.removeToken();
        storageSet(LocalStorageKeysEnum.IS_AUTH, false);
        await customerController.createAnonymousCustomer().then(() => {
          customerController
            .loginCustomer({
              email,
              password: passwords.newPassword,
            })
            .then((response) => {
              if (response.apiResult.statusCode === 200 && response.token) {
                storageSet(LocalStorageKeysEnum.IS_AUTH, true);
                setIsAuth(true);
                setAuthData(response.token);
              } else {
                const errorMessage = (response.apiResult as HttpErrorType).message;
                if (errorMessage) toast.error(`Error: ${errorMessage}`);
              }
            })
            .catch(() => {
              toast.error('Login error');
            });
        });
      };

      changePass()
        .then(() => {
          setPasswords(initialPasswords);
          toast.success('Password changed successfully');
        })
        .catch((err: HttpErrorType) => {
          toast.error(`Can't change password. ${err.message}`);
        });
    }
  };
  return (
    <div className="grid max-w-5xl mx-auto grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">Change password</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Update your password associated with your account.</p>
      </div>

      <form className="md:col-span-2" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="col-span-full">
            <label htmlFor="current-password" className="block text-sm font-medium leading-6 text-gray-900">
              Current password
            </label>
            <div className="mt-2">
              <PasswordInput
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handleInputChange}
                disabled={isEdit}
              />
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-gray-900">
              New password
            </label>
            <div className="mt-2">
              <input
                id="new-password"
                disabled={isEdit}
                onChange={handleInputChange}
                value={passwords.newPassword}
                name="newPassword"
                type="password"
                autoComplete="new-password"
                className="block w-full disabled:bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex">
          <ButtonEditUpdate isEdit={isEdit} />
        </div>
      </form>
    </div>
  );
};

export default UserPassword;
