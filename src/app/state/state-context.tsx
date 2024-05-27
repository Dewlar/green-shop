import React, { createContext, useState, useContext, ReactNode, FC, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CustomerController from '../api/CustomerController';
import TokenService from '../api/TokenService';
import { LocalStorageKeysEnum, storageGet, storageSet } from '../api/helpers';
import { ICategoryData, ICustomerData } from '../api/types';

export interface IAuthData {
  token?: string;
  expirationTime?: number;
  refreshToken?: string;
}

export interface IState {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  authData: IAuthData;
  customerData: ICustomerData;
  categoriesData: ICategoryData[];
  setAuthData: React.Dispatch<React.SetStateAction<IAuthData>>;
  setCustomerData: React.Dispatch<React.SetStateAction<ICustomerData>>;
  setCategories: React.Dispatch<React.SetStateAction<ICategoryData[]>>;
  logout: () => void;
}

function getInitialState(): IState {
  const isAuth = storageGet<boolean>(LocalStorageKeysEnum.IS_AUTH);

  return {
    isAuth: isAuth ?? false,
    authData: {
      token: '',
      expirationTime: 0,
      refreshToken: '',
    },
    customerData: {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      password: '',
      addresses: [],
      shippingAddressIds: [],
      billingAddressIds: [],
    },
    categoriesData: [],
    setIsAuth: () => {},
    setAuthData: () => {},
    setCustomerData: () => {},
    setCategories: () => {},
    logout: () => {},
  };
}

type Props = { children: ReactNode };
// create context
const StateContext = createContext<IState>(getInitialState());
// custom Hook to use state context in all components ---> see header for an example of use useStateContext
export const useStateContext = (): IState => {
  const context = useContext(StateContext);
  if (context === undefined) throw new Error('useStateContext must be used within a StateProvider');

  return context;
};

export const StateProvider: FC<Props> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(getInitialState().isAuth);
  const [authData, setAuthData] = useState(getInitialState().authData);
  const [customerData, setCustomerData] = useState(getInitialState().customerData);
  const [categoriesData, setCategories] = useState(getInitialState().categoriesData);

  const savedToken = new TokenService();
  const customerController = new CustomerController();
  const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    if (savedToken.get().token !== '') {
      setIsAuth(storageGet(LocalStorageKeysEnum.IS_AUTH) ?? false);
      setAuthData(savedToken.get());
    } else customerController.createAnonymousCustomer();
  }, []);

  const logout = () => {
    savedToken.removeToken();
    storageSet(LocalStorageKeysEnum.IS_AUTH, false);
    customerController.createAnonymousCustomer();
    setIsAuth(false);
    // setAuthData - example of using the set function in useState, if the new state depends on the previous state, to avoid side effects
    setAuthData((prev) => ({ ...prev, ...savedToken.get() }));
    navigate('/', { replace: true });
  };

  return (
    <StateContext.Provider
      value={{
        isAuth,
        setIsAuth,
        authData,
        customerData,
        setCustomerData,
        setAuthData,
        categoriesData,
        setCategories,
        logout,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
