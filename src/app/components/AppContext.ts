import { createContext } from 'react';

export type AppContextType = {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
  authData?: {
    token: string;
    expirationTime: number;
    refreshToken: string;
  };
};

export const initialValues: AppContextType = {
  isAuth: false,
  setIsAuth: (value) => console.log(value),
  authData: {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  },
};

export const AppContext = createContext<AppContextType>(initialValues);
