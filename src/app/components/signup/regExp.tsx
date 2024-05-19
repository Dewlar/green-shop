import { TypeOfInputs } from '../../models/interfaces';

const regulars: TypeOfInputs = {
  name: /^[a-zA-Z]+$/,
  surname: /^[a-zA-Z]+$/,
  birth: /^\d{4}-\d{2}-\d{2}$/,
  country: /\b(?:germany|netherlands|austria)\b/i,
  city: /^[a-zA-Z]+$/,
  street: /[a-zA-Z]/,
  zip: /^\d+$/,
  shippingCountry: /\b(?:germany|netherlands|austria)\b/i,
  shippingCity: /^[a-zA-Z]+$/,
  shippingStreet: /[a-zA-Z]/,
  shippingZip: /^\d+$/,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
};

export default regulars;