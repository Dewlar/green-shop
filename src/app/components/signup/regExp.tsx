import { TypeOfInputs } from '../../models/interfaces';

const regulars: TypeOfInputs = {
  name: /^[a-zA-Z]+$/,
  surname: /^[a-zA-Z]+$/,
  birth: /^\d{4}-\d{2}-\d{2}$/,
  country: /\b(?:germany|netherlands|austria)\b/i,
  city: /^[a-zA-Z]+$/,
  street: /[a-zA-Z]/,
  zip: /^[0-9]*$/,
  shippingAddress: /^[a-zA-Z]+$/,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
};

export default regulars;
