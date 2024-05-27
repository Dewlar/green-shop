import { HttpErrorType, JsonObject } from '@commercetools/sdk-client-v2';

interface LastModifiedBy {
  clientId: string;
  isPlatformClient: boolean;
  anonymousId?: string;
}

interface CreatedBy {
  clientId: string;
  isPlatformClient: boolean;
}

export interface Address {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
}

export interface CustomerData {
  id: string;
  version?: number;
  versionModifiedAt?: string;
  lastMessageSequenceNumber?: number;
  createdAt?: string;
  lastModifiedAt?: string;
  lastModifiedBy?: LastModifiedBy;
  createdBy?: CreatedBy;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  password: string;
  addresses: Address[];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  isEmailVerified?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stores?: any[];
  authenticationMode?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  body: T;
  statusCode: number;
  headers?: JsonObject<string>;
  error?: HttpErrorType;
  request?: object;
}

export interface CategoryData {
  id: string;
  name: string;
}
