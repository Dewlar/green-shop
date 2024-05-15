import createApiRoot from './client';

const getEndpoints = (allInputs: Array<string>) => {
  const allInputValues = allInputs;
  if (allInputValues[7] === '') {
    allInputValues[7] = `${allInputValues[3]}, ${allInputValues[4]}, ${allInputValues[5]}, ${allInputValues[6]}`;
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
            phone: allInputValues[7],
            email: allInputValues[8],
          },
        ],
        shippingAddresses: [0],
        email: allInputValues[8],
        password: allInputValues[9],
        defaultBillingAddress: Number(allInputValues[10]),
      },
    })
    .execute()
    .catch(console.error);
};

export default getEndpoints;
