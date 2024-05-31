import { Product } from '@commercetools/platform-sdk';
import { LoadingType } from 'react-loading';
import { NavigateFunction } from 'react-router-dom';

const sample = () => 1;
const sample2 = () => 1;

export interface TypeOfInputs {
  name: RegExp;
  surname: RegExp;
  birth: RegExp;
  country: RegExp;
  city: RegExp;
  street: RegExp;
  zip: RegExp;
  shippingCountry: RegExp;
  shippingCity: RegExp;
  shippingStreet: RegExp;
  shippingZip: RegExp;
  email: RegExp;
  password: RegExp;
}

export interface TypeItem {
  prop: string;
  type: string;
  index: number;
  dataD: Array<boolean>;
  dataE: Array<string>;
  stor: Array<string>;
  setData: React.Dispatch<React.SetStateAction<boolean[]>>;
  setStor: React.Dispatch<React.SetStateAction<string[]>>;
  setDataE: React.Dispatch<React.SetStateAction<string[]>>;
  onB: (
    e: React.FocusEvent<HTMLInputElement, Element> | React.FocusEvent<HTMLSelectElement, Element>,
    reg: TypeOfInputs,
    dataD: Array<boolean>,
    setData: React.Dispatch<React.SetStateAction<boolean[]>>,
    dataE: Array<string>
  ) => void;
  onC: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    stor: Array<string>,
    setStor: React.Dispatch<React.SetStateAction<string[]>>,
    dataE: Array<string>,
    setDataE: React.Dispatch<React.SetStateAction<string[]>>
  ) => void;
}
export interface BlurType {
  e: React.FocusEvent<HTMLInputElement, Element>;
  reg: TypeOfInputs;
  dataD: Array<boolean>;
  setData: React.Dispatch<React.SetStateAction<boolean[]>>;
  dataE: Array<string>;
}

export interface StringObject {
  [key: string]: string;
}
export interface SelectHtml {
  e: React.ChangeEvent<HTMLInputElement> | React.SelectHTMLAttributes<HTMLSelectElement>;
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

export interface TypeOfZip {
  [key: string]: RegExp;
}

export interface TypeLoading {
  type: LoadingType;
  color: string;
}
export interface ModalSlider {
  data: Product;
  setModalSlider?: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface TypeSizeBtn {
  key: number;
  label: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<number>>;
  color: string;
  colorHover: string;
}
export interface TypeSizesOrder {
  [key: string]: number;
}

export default { sample, sample2 };
