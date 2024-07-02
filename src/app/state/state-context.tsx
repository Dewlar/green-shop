import React, { createContext, useState, useContext, ReactNode, FC, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Customer, ClientResponse, DiscountCodeInfo } from '@commercetools/platform-sdk';
import CustomerController from '../api/CustomerController';
import TokenService from '../api/TokenService';
import { SessionStorageKeysEnum, storageGet, storageSet } from '../api/helpers';
import { ICategoryData } from '../api/types';
import { clearBasket } from '../api/basket/BasketRepository';

export interface IAuthData {
  token: string;
  expirationTime: number;
  refreshToken?: string;
}

export interface IState {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  authData: IAuthData;
  customerData: ClientResponse<Customer>;
  categoriesData: ICategoryData[];
  totalLineItemQuantity: number;
  discountCodes: DiscountCodeInfo[];
  setDiscountCodes: React.Dispatch<React.SetStateAction<DiscountCodeInfo[]>>;
  setTotalLineItemQuantity: React.Dispatch<React.SetStateAction<number>>;
  setAuthData: React.Dispatch<React.SetStateAction<IAuthData>>;
  setCustomerData: React.Dispatch<React.SetStateAction<ClientResponse<Customer>>>;
  setCategories: React.Dispatch<React.SetStateAction<ICategoryData[]>>;
  logout: () => void;
}

function getInitialState() {
  const isAuth = storageGet<boolean>(SessionStorageKeysEnum.IS_AUTH);

  return {
    isAuth: isAuth ?? false,
    authData: {
      token: '',
      expirationTime: 0,
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
    } as unknown as ClientResponse<Customer>,
    categoriesData: [],
    quantityProductsBasket: 0,
    discountCodes: [],
  };
}

type Props = { children: ReactNode };
// create context
const StateContext = createContext<IState | undefined>(undefined);
// custom Hook to use state context in all components ---> see header for an example of use useStateContext
export const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) throw new Error('useStateContext must be used within a StateProvider');

  return context;
};

export const StateProvider: FC<Props> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(getInitialState().isAuth);
  const [authData, setAuthData] = useState<IAuthData>(getInitialState().authData);
  const [customerData, setCustomerData] = useState<ClientResponse<Customer>>(getInitialState().customerData);
  const [categoriesData, setCategories] = useState<ICategoryData[]>(getInitialState().categoriesData);
  const [totalLineItemQuantity, setTotalLineItemQuantity] = useState<number>(0);
  const [discountCodes, setDiscountCodes] = useState<DiscountCodeInfo[]>(getInitialState().discountCodes);

  const savedToken = new TokenService();
  const customerController = new CustomerController();
  const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    if (savedToken.get().token !== '') {
      setIsAuth(storageGet<boolean>(SessionStorageKeysEnum.IS_AUTH) ?? false);
      setAuthData(savedToken.get());
    } else customerController.createAnonymousCustomer();
  }, []);

  const logout = () => {
    savedToken.removeToken();
    storageSet(SessionStorageKeysEnum.IS_AUTH, false);
    customerController.createAnonymousCustomer();
    setIsAuth(false);
    // setAuthData - example of using the set function in useState, if the new state depends on the previous state, to avoid side effects
    setAuthData((prev) => ({ ...prev, ...savedToken.get() }));
    clearBasket();
    navigate('/', { replace: true });
  };

  return (
    <StateContext.Provider
      value={{
        isAuth,
        setIsAuth,
        authData,
        setAuthData,
        customerData,
        setCustomerData,
        categoriesData,
        totalLineItemQuantity,
        discountCodes,
        setDiscountCodes,
        setTotalLineItemQuantity,
        setCategories,
        logout,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
