import React, { createContext, useState, useContext, ReactNode, FC, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
import CustomerController from '../api/CustomerController';
import TokenService from '../api/TokenService';
import { LocalStorageKeysEnum, storageGet, storageSet } from '../api/helpers';

export interface IAuth {
  isAuth: boolean;
  authData: IAuthData;
}
export interface IAuthData {
  token?: string;
  expirationTime?: number;
  refreshToken?: string;
}

export interface IAuthContext {
  get: IAuth;
  set: React.Dispatch<React.SetStateAction<IAuth>>;
  logout: () => void;
}
export interface StateContextType {
  auth: IAuthContext;
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
    logout: () => {},
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

  const savedToken = new TokenService();
  const customerController = new CustomerController();
  // const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    if (savedToken.get().token !== '') {
      setAuth({ isAuth: storageGet(LocalStorageKeysEnum.IS_AUTH) ?? false, authData: savedToken.get() });
    } else customerController.createAnonymousCustomer();
  }, []);

  const auth = {
    get: getAuth,
    set: setAuth,
    logout: () => {
      savedToken.removeToken();
      storageSet(LocalStorageKeysEnum.IS_AUTH, false);
      customerController.createAnonymousCustomer();
      setAuth({ isAuth: false, authData: savedToken.get() });
      // navigate(location.pathname, { replace: true });
    },
  };

  return <StateContext.Provider value={{ auth }}>{children}</StateContext.Provider>;
};
