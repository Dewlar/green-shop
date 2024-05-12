import { StringObject } from '../../models/interfaces';

const inputTypes: StringObject = {
  name: 'text',
  surname: 'text',
  birth: 'date',
  country: 'text',
  city: 'text',
  street: 'text',
  zip: 'number',
  number: 'tel',
  email: 'email',
  password: 'password',
};

export default inputTypes;
