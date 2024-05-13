import states from '../states';
import createApiRoot from './client';

const getEndpoints = (allInputValues: Array<string>) => {
  return createApiRoot()
    .customers()
    .post({
      body: {
        firstName: allInputValues[0],
        lastName: allInputValues[1],
        dateOfBirth: allInputValues[2],
        addresses: [
          {
            id: 'address1',
            firstName: allInputValues[0],
            lastName: allInputValues[1],
            streetName: allInputValues[5],
            postalCode: allInputValues[6],
            city: allInputValues[4],
            country: states[allInputValues[3]],
            phone: allInputValues[7],
            email: allInputValues[8],
          },
        ],
        email: allInputValues[8],
        password: allInputValues[9],
      },
    })
    .execute()
    .catch(console.error);
};

export default getEndpoints;
