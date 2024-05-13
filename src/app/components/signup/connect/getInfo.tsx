import createApiRoot from './client';

const getEndpoints = (name: string, surname: string, mail: string, pass: string) => {
  return createApiRoot()
    .customers()
    .post({
      body: {
        firstName: name,
        lastName: surname,
        email: mail,
        password: pass,
      },
    })
    .execute()
    .catch(console.error);
};

export default getEndpoints;
