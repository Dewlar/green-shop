import { HttpErrorType, JsonObject } from '@commercetools/sdk-client-v2';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IApiResponse<T = any> {
  body: T;
  statusCode: number;
  headers?: JsonObject<string>;
  error?: HttpErrorType;
  request?: object;
}

interface ILastModifiedBy {
  clientId: string;
  isPlatformClient: boolean;
  anonymousId?: string;
}

interface ICreatedBy {
  clientId: string;
  isPlatformClient: boolean;
}

export interface IAddress {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
}

export interface ICustomerData {
  id: string;
  version?: number;
  versionModifiedAt?: string;
  lastMessageSequenceNumber?: number;
  createdAt?: string;
  lastModifiedAt?: string;
  lastModifiedBy?: ILastModifiedBy;
  createdBy?: ICreatedBy;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  password: string;
  addresses: IAddress[];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  isEmailVerified?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stores?: any[];
  authenticationMode?: string;
}

export interface ICategoryData {
  id: string;
  name: string;
}

export interface IProductResultsData {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: boolean;
    user: {
      typeId: string;
      id: string;
    };
  };
  createdBy: {
    isPlatformClient: boolean;
    user: {
      typeId: string;
      id: string;
    };
  };
  productType: {
    typeId: string;
    id: string;
  };
  masterData: IMasterData;
  key: string;
  taxCategory?: {
    typeId: string;
    id: string;
  };
  lastVariantId: number;
  priceMode?: string;
}

interface IMasterData {
  current: {
    name: Record<string, string>;
    description?: Record<string, string>;
    categories: {
      typeId: string;
      id: string;
    }[];
    categoryOrderHints: Record<string, unknown>;
    slug: Record<string, string>;
    masterVariant: IVariant;
    variants: IVariant[];
    searchKeywords: Record<string, unknown>;
  };
  staged: {
    name: Record<string, string>;
    description?: Record<string, string>;
    categories: {
      typeId: string;
      id: string;
    }[];
    categoryOrderHints: Record<string, unknown>;
    slug: Record<string, string>;
    masterVariant: IVariant;
    variants: IVariant[];
    searchKeywords: Record<string, unknown>;
  };
  published: boolean;
  hasStagedChanges: boolean;
}

export interface IVariant {
  id: number;
  sku: string;
  key: string;
  prices: IPrice[];
  images: IImage[];
  attributes: IAttribute[];
  assets: [];
}

interface IPrice {
  id: string;
  value: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  country: string;
  discounted: {
    value: {
      type: string;
      currencyCode: string;
      centAmount: number;
      fractionDigits: number;
    };
    discount: IDiscount;
  };
}

interface IDiscount {
  typeId: string;
  id: string;
}

interface IImage {
  url: string;
  label: string;
  dimensions: {
    w: number;
    h: number;
  };
}

export interface IAttribute {
  name: string;
  value: IAttributeValue;
}

interface IAttributeValue {
  key: string;
  label: string;
}

export interface IProductDataForRender {
  id: string;
  name: string;
  href: string;
  priceRender: IPriceRender;
  imageSrc: string;
  imageAlt: string;
}

interface IPriceRender {
  discount: number;
  currentPrice: number;
}

export interface ISortOption {
  name: string;
  href: string;
  current: boolean;
  method: string;
}

export type FilterType = string | string[] | { id: { in: string } }[];
