import { StorageType } from '../../models/interfaces';

const defaultFormValues: StorageType = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  addresses: [
    { country: 'DE', city: '', streetName: '', postalCode: '' },
    { country: 'DE', city: '', streetName: '', postalCode: '' },
  ],
  email: '',
  password: '',
  isDefault: '',
  isShippingDefault: '',
};

export default defaultFormValues;
