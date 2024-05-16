import createApiRoot from './client';

const getEndpoints = (allInputs: Array<string>) => {
  const allInputValues = allInputs;
  if (allInputValues[7] === '') {
    // eslint-disable-next-line prefer-destructuring
    allInputValues[7] = allInputValues[3];
    // eslint-disable-next-line prefer-destructuring
    allInputValues[8] = allInputValues[4];
    // eslint-disable-next-line prefer-destructuring
    allInputValues[9] = allInputValues[5];
    // eslint-disable-next-line prefer-destructuring
    allInputValues[10] = allInputValues[6];
  }
  return createApiRoot()
    .customers()
    .post({
      body: {
        firstName: allInputValues[0],
        lastName: allInputValues[1],
        dateOfBirth: allInputValues[2],
        addresses: [
          {
            key: 'address1',
            firstName: allInputValues[0],
            lastName: allInputValues[1],
            streetName: allInputValues[5],
            postalCode: allInputValues[6],
            city: allInputValues[4],
            country: allInputValues[3],
            email: allInputValues[11],
          },
          {
            key: 'shippingAddress',
            firstName: allInputValues[0],
            lastName: allInputValues[1],
            streetName: allInputValues[9],
            postalCode: allInputValues[10],
            city: allInputValues[8],
            country: allInputValues[7],
            email: allInputValues[11],
          },
        ],
        shippingAddresses: [1],
        email: allInputValues[11],
        password: allInputValues[12],
        defaultBillingAddress: Number(allInputValues[13]),
      },
    })
    .execute()
    .catch(console.error);
};

export default getEndpoints;
