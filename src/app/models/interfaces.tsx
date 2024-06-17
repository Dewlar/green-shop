import { Address, Product } from '@commercetools/platform-sdk';
import { NavigateFunction } from 'react-router-dom';
import React from 'react';

export interface IPageCounter {
  itemsPerPage: number;
  totalProducts: number;
  offset: number;
}

export interface StringObject {
  [key: string]: string;
}
export interface ModalError {
  className: string;
  classText: string;
  errorText: string;
  type: string;
  login: string;
  password: string;
  redirect?: NavigateFunction;
}

export interface ModalSlider {
  data: Product;
  setModalSlider?: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface TypeSizeBtn {
  label: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<number>>;
  color: string;
  colorHover: string;
}
export interface TypeSizesOrder {
  [key: string]: number;
}

export interface StorageType {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
  email: string;
  password: string;
  isDefault?: string;
  isShippingDefault?: string;
  billingAddresses?: number[];
  shippingAddresses?: number[];
  defaultBillingAddress?: number;
  defaultShippingAddress?: number;
}
