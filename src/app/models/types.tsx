import { Address } from '@commercetools/platform-sdk';
import { ProductVariant } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
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

export interface IProductsVariant {
  id: string;
  name: string;
  description: string;
  variant: ProductVariant | undefined;
}
