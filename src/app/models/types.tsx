import { Address } from '@commercetools/platform-sdk';

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
  AU = 'Austria',
}
