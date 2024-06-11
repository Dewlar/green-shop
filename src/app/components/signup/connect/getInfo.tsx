import { showErrorModal } from '../showModal';
import createApiRoot from './client';

const getEndpoints = (allInputs: Array<string>) => {
  // const allInputValues = allInputs;
  const [
    name,
    surname,
    birth,
    billingCountry,
    billingCity,
    billingStreet,
    billingZip,
    shippingCountry,
    shippingCity,
    shippingStreet,
    shippingZip,
    mail,
    pass,
    isDefault,
  ] = allInputs;
  const billing = {
    key: 'bill',
    firstName: name,
    lastName: surname,
    streetName: billingStreet,
    postalCode: billingZip,
    city: billingCity,
    country: billingCountry,
    email: mail,
  };
  const shipping = {
    key: 'shipp',
    firstName: name,
    lastName: surname,
    streetName: shippingStreet || billingStreet,
    postalCode: shippingZip || billingZip,
    city: shippingCity || billingCity,
    country: shippingCountry || billingCountry,
    email: mail,
  };
  const body = {
    firstName: name,
    lastName: surname,
    dateOfBirth: birth,
    addresses: shippingCity ? [billing, shipping] : [billing],
    billingAddresses: shippingCity ? [0, 1] : [0],
    shippingAddresses: shippingCity ? [0, 1] : [0],
    email: mail,
    password: pass,
  };

  return createApiRoot()
    .customers()
    .post({
      body: isDefault
        ? {
            ...body,
            defaultBillingAddress: 0,
            defaultShippingAddress: shippingCity ? 1 : 0,
          }
        : body,
    })
    .execute()
    .catch((err) => showErrorModal(err));
};

export default getEndpoints;
