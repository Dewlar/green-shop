import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalError } from '../../models';
import { LocalStorageKeysEnum, storageSet } from '../../api/helpers';
import { IAuth, useStateContext } from '../../state/state-context';
import CustomerController from '../../api/CustomerController';

const MyModal = ({ className, classText, errorText, type, login, password /* , redirect */ }: ModalError) => {
  const { auth } = useStateContext();
  const navigate = useNavigate();
  const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    auth.logout();
    const modal = document.getElementById(`${className}`);
    modal!.style.display = 'none';
    if (type === 'Success') {
      // redirect!('/');

      const customerController = new CustomerController();
      customerController
        .loginCustomer({ email: login, password })
        .then((response) => {
          if (response.apiResult.statusCode === 200 && response.token) {
            storageSet(LocalStorageKeysEnum.IS_AUTH, true);

            const authData: IAuth = {
              isAuth: true,
              authData: response.token,
            };

            auth.set(authData);
            navigate('/');
          }
        })
        .catch(); // todo: you need to add a toast modal window with error text
    }
  };

  return (
    <div className={className}>
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert" id={className}>
        <p className="font-bold">{type}</p>
        <p id={classText}>{errorText}</p>
        <button className="ok" onClick={(e) => handleClose(e)}>
          OK
        </button>
      </div>
    </div>
  );
};

export default MyModal;
