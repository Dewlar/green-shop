import { showErrorModal } from '../showModal';
import createApiRoot from './client';

const getEndpoints = (allInputs: Array<string>) => {
  const allInputValues = allInputs;
  const billing = {
    key: 'bill',
    firstName: allInputValues[0],
    lastName: allInputValues[1],
    streetName: allInputValues[5],
    postalCode: allInputValues[6],
    city: allInputValues[4],
    country: allInputValues[3],
    email: allInputValues[11],
  };
  const shipping = {
    key: 'shipp',
    firstName: allInputValues[0],
    lastName: allInputValues[1],
    streetName: allInputValues[9] ? allInputValues[9] : allInputValues[5],
    postalCode: allInputValues[10] ? allInputValues[10] : allInputValues[6],
    city: allInputValues[8] ? allInputValues[8] : allInputValues[4],
    country: allInputValues[7] ? allInputValues[7] : allInputValues[3],
    email: allInputValues[11],
  };
  const body = {
    firstName: allInputValues[0],
    lastName: allInputValues[1],
    dateOfBirth: allInputValues[2],
    addresses: [billing, shipping],
    billingAddresses: [0],
    shippingAddresses: allInputValues[9] ? [1] : [0],
    email: allInputValues[11],
    password: allInputValues[12],
  };

  showErrorModal(''); // clean previous error message

  return createApiRoot()
    .customers()
    .post({
      body: allInputValues[13]
        ? {
            ...body,
            defaultBillingAddress: 0,
            defaultShippingAddress: allInputValues[9] ? 1 : 0,
          }
        : body,
    })
    .execute()
    .catch((err) => showErrorModal(err));
};

export default getEndpoints;
