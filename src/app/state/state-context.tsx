import React, { createContext, useState, useContext, ReactNode, FC, useEffect } from 'react';
import CustomerController from '../api/CustomerController';
import TokenService from '../api/TokenService';
import { LocalStorageKeysEnum, storageGet } from '../api/helpers';

export interface IAuth {
  isAuth: boolean;
  authData: IAuthData;
}
interface IAuthData {
  token?: string;
  expirationTime?: number;
  refreshToken?: string;
}
interface StateContextType {
  auth: {
    get: IAuth;
    set: React.Dispatch<React.SetStateAction<IAuth>>;
  };
}
const initialContext: StateContextType = {
  auth: {
    get: {
      isAuth: false,
      authData: {
        token: '',
        expirationTime: 0,
        refreshToken: '',
      },
    },
    set: () => {},
  },
};

type Props = { children: ReactNode };
// create context
const StateContext = createContext<StateContextType>(initialContext);
// custom Hook to use state context in all components ---> see header for an example of use useStateContext
export const useStateContext = (): StateContextType => {
  const context = useContext(StateContext);
  if (context === undefined) throw new Error('useStateContext must be used within a StateProvider');

  return context;
};

export const StateProvider: FC<Props> = ({ children }) => {
  const [getAuth, setAuth] = useState(initialContext.auth.get);

  const auth = {
    get: getAuth,
    set: setAuth,
  };

  const savedToken = new TokenService();

  const value = {
    auth,
  };

  useEffect(() => {
    if (savedToken.get().token !== '') {
      setAuth({ isAuth: storageGet(LocalStorageKeysEnum.IS_AUTH) ?? false, authData: savedToken.get() });
    } else {
      const customerController = new CustomerController();

      customerController.createAnonymousCustomer().then((response) => {
        console.log(response);
      });
    }
  }, []);

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};
