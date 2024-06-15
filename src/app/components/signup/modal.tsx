import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HttpErrorType } from '@commercetools/sdk-client-v2';
import { toast } from 'react-toastify';
import { ModalError } from '../../models';
import { LocalStorageKeysEnum, storageSet } from '../../api/helpers';
import { useStateContext } from '../../state/state-context';
import CustomerController from '../../api/CustomerController';
import TokenService from '../../api/TokenService';

const MyModal = ({ className, classText, errorText, type, login, password }: ModalError) => {
  const { setIsAuth, setAuthData } = useStateContext();
  const navigate = useNavigate();
  const tokenService = new TokenService();
  const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const modal = document.getElementById(`${className}`);
    const modalText = document.getElementById('modalTextError');
    modal!.style.display = 'none';
    modalText!.innerHTML = '';
    if (type === 'Success') {
      tokenService.removeToken();
      storageSet(LocalStorageKeysEnum.IS_AUTH, false);
      const customerController = new CustomerController();
      customerController.createAnonymousCustomer().then(() => {
        customerController
          .loginCustomer({ email: login, password })
          .then((response) => {
            if (response.apiResult.statusCode === 200 && response.token) {
              storageSet(LocalStorageKeysEnum.IS_AUTH, true);

              setIsAuth(true);
              setAuthData(response.token);

              navigate('/');
            }

            toast((response.apiResult as HttpErrorType).message);
          })
          .catch();
      });
    }
  };

  return (
    <div
      className={`fixed inset-0 z-10 h-screen w-screen bg backdrop-blur-sm bg-slate-700 bg-opacity-50 ${className}`}
      id={className}
    >
      <div
        className="relative flex flex-col justify-center modalWindow space-y-2.5 transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 z-11"
        role="alert"
      >
        <img
          className="w-20 h-20 m-auto"
          src={type === 'Success' ? 'assets/budding-pop-pictures/hello.gif' : 'assets/budding-pop-pictures/no.gif'}
          alt="modalPicture"
        />
        <p className="text-base font-semibold leading-6 text-gray-900">{type}</p>
        <p className="text-sm text-gray-500" id={classText}>
          {errorText}
        </p>
        <button
          type="button"
          className="inline-flex w-50 justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          onClick={(e) => handleClose(e)}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default MyModal;
