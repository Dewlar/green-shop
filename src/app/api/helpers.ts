import {
  AnonymousAuthMiddlewareOptions,
  ClientResponse,
  ClientResult,
  HttpErrorType,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
  TokenStore,
} from '@commercetools/sdk-client-v2';
import { Customer, CustomerSignInResult } from '@commercetools/platform-sdk';
import TokenService from './TokenService';
import { IApiResponse, ICustomerData, IProductResultsData, IProductDataForRender } from './types';

export interface ExistingTokenFlowOptions {
  authorization: string;
  options: {
    force: boolean;
  };
}

export interface UserCredentialData {
  email: string;
  password: string;
}

export interface ApiLoginResult {
  apiResult: ClientResponse<CustomerSignInResult> | ClientResponse<ClientResult> | HttpErrorType;
  token: TokenStore | null;
  customer: ClientResponse<Customer>;
}

export const getProjectKey = (): string => {
  return process.env.CTP_PROJECT_KEY || 'greenshop';
};

export const getApiURL = (): string => {
  return process.env.CTP_API_URL || 'https://api.europe-west1.gcp.commercetools.com';
};

export const getAuthURL = (): string => {
  return process.env.CTP_AUTH_URL || 'https://auth.europe-west1.gcp.commercetools.com';
};

export const getClientSecret = (): string => {
  return process.env.CTP_CLIENT_SECRET || 'T1YLMv_Ze4asmp713AHKIDfTMBee5YUH';
};

export const getClientId = (): string => {
  return process.env.CTP_CLIENT_ID || 'z7wOaxnQxzxn43JHrM-0VY3g';
};

export const getScopes = (): string[] => {
  return process.env.CTP_SCOPES?.split(' ') || ['manage_project:greenshop'];
};

export function getExistingTokenFlowOptions(token: string): ExistingTokenFlowOptions {
  return {
    authorization: `Bearer ${token}`,
    options: {
      force: true,
    },
  };
}

export function getHttpMiddlewareOptions(): HttpMiddlewareOptions {
  return {
    host: getApiURL(),
    fetch,
  };
}

export function getRefreshAuthMiddlewareOptions(refreshToken: string): RefreshAuthMiddlewareOptions {
  return {
    host: getAuthURL(),
    projectKey: getProjectKey(),
    credentials: { clientId: getClientId(), clientSecret: getClientSecret() },
    refreshToken,
    tokenCache: new TokenService(),
    fetch,
  };
}

export function getAnonymousAuthMiddlewareOptions(): AnonymousAuthMiddlewareOptions {
  return {
    host: getAuthURL(),
    projectKey: getProjectKey(),
    credentials: {
      clientId: getClientId(),
      clientSecret: getClientSecret(),
    },
    scopes: getScopes(),
    tokenCache: new TokenService(),
    fetch,
  };
}

export function getAuthMiddlewareOptions(userData: UserCredentialData): PasswordAuthMiddlewareOptions {
  const { email, password } = userData;
  return {
    host: getAuthURL(),
    projectKey: getProjectKey(),
    credentials: {
      clientId: getClientId(),
      clientSecret: getClientSecret(),
      user: {
        username: email,
        password,
      },
    },
    scopes: getScopes(),
    tokenCache: new TokenService(),
    fetch,
  };
}

export const storageKey = 'greenshop';

export enum LocalStorageKeysEnum {
  'IS_AUTH' = 'IS_AUTH',
}

export function storageGet<T>(key: string): T | null {
  const item = localStorage.getItem(`${storageKey}_${key}`);
  return item ? (JSON.parse(item) as T) : null;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const storageSet = (key: string, data: any): void => {
  localStorage.setItem(`${storageKey}_${key}`, JSON.stringify(data));
};

export const createCustomerData = (data: IApiResponse): ICustomerData => {
  const userData: ICustomerData = {
    email: data.body.email,
    password: data.body.password,
    firstName: data.body.firstName,
    lastName: data.body.lastName,
    dateOfBirth: data.body.dateOfBirth,
    id: data.body.id,
    addresses: data.body.addresses,
    shippingAddressIds: data.body.shippingAddressIds,
    billingAddressIds: data.body.billingAddressIds,
  };

  return userData;
};

export const formatPriceInEuro = (price: number): string => {
  const convertPrice = Number((price / 100).toFixed(2));
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(convertPrice);
};

export const createProductData = (data: IProductResultsData[]): IProductDataForRender[] => {
  const productsData: IProductDataForRender[] = data.map((item) => ({
    id: item.id,
    name: item.masterData.staged.name.en,
    href: '#',
    priceRender: {
      discount: item.masterData.current.masterVariant.prices[0].discounted
        ? item.masterData.current.masterVariant.prices[0].discounted?.value.centAmount
        : 0,
      currentPrice: item.masterData.current.masterVariant.prices?.length
        ? item.masterData.current.masterVariant.prices[0].value.centAmount
        : 0,
    },
    imageSrc: item.masterData.current.masterVariant.images[0].url,
    imageAlt: '',
  }));
  return productsData;
};

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export const sortByNameAZ = (products: IProductDataForRender[]): IProductDataForRender[] => {
  return products.sort((a, b) => a.name.localeCompare(b.name));
};

export const sortByNameZA = (products: IProductDataForRender[]): IProductDataForRender[] => {
  return products.sort((a, b) => b.name.localeCompare(a.name));
};

export const sortByPriceSortLowToHigh = (products: IProductDataForRender[]): IProductDataForRender[] => {
  return products.sort((a, b) => {
    const priceA = a.priceRender.discount !== 0 ? a.priceRender.discount : a.priceRender.currentPrice;
    const priceB = b.priceRender.discount !== 0 ? b.priceRender.discount : b.priceRender.currentPrice;
    return priceA - priceB;
  });
};

export const sortByPriceSortHighToLow = (products: IProductDataForRender[]): IProductDataForRender[] => {
  return products.sort((a, b) => {
    const priceA = a.priceRender.discount !== 0 ? a.priceRender.discount : a.priceRender.currentPrice;
    const priceB = b.priceRender.discount !== 0 ? b.priceRender.discount : b.priceRender.currentPrice;
    return priceB - priceA;
  });
};

export const getSortParams = (sortOption: string): string => {
  switch (sortOption) {
    case 'Price: Low to High':
      return 'masterData.current.masterVariant.prices.value.centAmount asc';
    case 'Price: High to Low':
      return 'masterData.current.masterVariant.prices.value.centAmount desc';
    case 'A-Z':
      return 'masterData.current.name.en asc';
    case 'Z-A':
      return 'masterData.current.name.en desc';
    default:
      return '';
  }
};
