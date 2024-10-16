import { CountryEnum } from '../../models';
import isOlderThan13 from './checkDate';

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
  mailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  latinCharsRegex: /^[a-zA-Z0-9._%+-@]+$/,
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
  email2: {
    required: 'Email is required',
    validate: {
      pattern1: (value: string) => validationTemplate.email.test(value) || 'Invalid email address format.',
    },
  },
  email: {
    required: 'Email is required',
    validate: {
      atSymbolInclude: (value: string) => value.includes('@') || 'The "@" symbol is missing.',
      trailingSpaces: (value: string) => value.trim() === value || 'Must not start or end with a space.',
      domainPart: (value: string) => {
        const [, domainPart] = value.split('@');
        if (!domainPart) {
          return 'Must contain a domain name (e.g., example.com).';
        }
        if (domainPart && !domainPart.includes('.')) {
          return 'Email domain must contain a dot (e.g., example.com).';
        }
        return true;
      },
      correctFormat1: (value: string) => validationTemplate.mailRegex.test(value) || 'Invalid email address format.',
      correctFormat2: (value: string) =>
        validationTemplate.latinCharsRegex.test(value) || 'Invalid email address format.',
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
