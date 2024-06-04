import { CountryEnum, TypeOfInputs, TypeOfZip } from '../../models';
import isOlderThan13 from './checkDate';

export const regulars: TypeOfInputs = {
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
  password: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*[@$!%*?&])[^\s]{8,}$/,
};

export const regularsZip: TypeOfZip = { netherlands: /^\d{4}[ ]?[A-Z]{2}$/, germany: /^\d{5}$/, austria: /^\d{4}$/ };

export const validationPostalCodeTemplate = {
  netherlands: /^\d{4}[ ]?[A-Z]{2}$/,
  germany: /^\d{5}$/,
  austria: /^\d{4}$/,
};

const validationTemplate = {
  name: /^[a-zA-Z]+$/,
  surname: /^[a-zA-Z]+$/,
  dateOfBirth: /^\d{4}-\d{2}-\d{2}$/,
  country: /\b(?:AT|DE|NL)\b/i,
  city: /^[a-zA-Z]+$/,
  street: /^[a-zA-Z]+$/,
  zip: /^\d+$/,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*[@$!%*?&])[^\s]{8,}$/,
};
const getPostalCodePattern = (country: string) => {
  switch (country) {
    case 'NL':
      return validationPostalCodeTemplate.netherlands;
    case 'DE':
      return validationPostalCodeTemplate.germany;
    case 'AT':
      return validationPostalCodeTemplate.austria;
    default:
      return null;
  }
};
export const validationRules = {
  name: {
    required: 'Name is required',
    validate: {
      pattern1: (value: string) => validationTemplate.name.test(value) || 'Letter required',
    },
  },
  email: {
    required: 'Email is required',
    validate: {
      pattern1: (value: string) => validationTemplate.email.test(value) || 'Invalid format',
    },
  },
  surname: {
    required: 'Last name is required',
    validate: {
      pattern1: (value: string) => validationTemplate.surname.test(value) || 'Invalid format',
    },
  },
  dateOfBirth: {
    required: 'Is required',
    validate: {
      pattern1: (value: string) => validationTemplate.dateOfBirth.test(value) || 'Invalid format',
      pattern2: (value: string) => isOlderThan13(value) || 'Must be older than 13.',
    },
  },
  password2: {
    required: 'Is required',
    validate: {
      pattern1: (value: string) => validationTemplate.password.test(value) || 'Invalid format',
    },
  },
  password: {
    required: 'Password is required',
    validate: {
      minLength: (value: string) => value.length >= 8 || 'Password must be at least 8 characters long',
      hasUpperCase: (value: string) => /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter',
      hasLowerCase: (value: string) => /[a-z]/.test(value) || 'Password must contain at least one lowercase letter',
      hasNumber: (value: string) => /\d/.test(value) || 'Password must contain at least one number',
      hasSpecialChar: (value: string) =>
        /[@$!%*?&]/.test(value) || 'Password must contain at least one special character',
    },
  },
  country: {
    // Д О Д Е Л А Т Ь
    required: 'Is required',
    validate: {
      pattern1: (value: string | undefined) => validationTemplate.country.test(value || '') || 'Invalid format',
    },
  },
  city: {
    required: 'Is required',
    validate: {
      pattern1: (value: string | undefined) => validationTemplate.city.test(value || '') || 'Invalid format',
    },
  },
  streetName: {
    required: 'Is required',
    validate: {
      pattern1: (value: string | undefined) => validationTemplate.street.test(value || '') || 'Invalid format',
    },
  },
  zip: {
    required: 'Is required',
    validate: {
      pattern1: (value: string | undefined) => validationTemplate.zip.test(value || '') || 'Invalid format',
    },
  },
  postalCode: (country: string) => ({
    required: 'Postal code is required',
    validate: {
      pattern1: (value: string | undefined) => {
        const pattern = getPostalCodePattern(country);
        if (value === undefined || value === '') return 'Postal code is required';
        return pattern
          ? pattern.test(value) || `Invalid format for ${CountryEnum[country as keyof typeof CountryEnum]}`
          : true;
      },
    },
  }),
};
