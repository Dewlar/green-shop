import { Address } from '@commercetools/platform-sdk';
// import { StringObject } from './interfaces';

export interface IUserInfo {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface IUserAddresses {
  addresses: Address[];
  billingAddressIds: string[];
  shippingAddressIds: string[];
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
}

export enum CountryEnum {
  DE = 'Germany',
  NL = 'Netherlands',
  AT = 'Austria',
}

export enum States {
  Germany = 'DE',
  Netherlands = 'NL',
  Austria = 'AT',
}
