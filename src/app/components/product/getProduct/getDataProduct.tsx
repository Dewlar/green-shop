import createApiRoot from '../../signup/connect/client';

export const getProductData = () => {
  return createApiRoot()
    .products()
    .get()
    .execute()
    .catch((err: string) => console.log(err));
};

export const getProductDataTypes = () => {
  return createApiRoot()
    .productTypes()
    .get()
    .execute()
    .catch((err: string) => console.log(err));
};
export const getProductDiscounts = () => {
  return createApiRoot()
    .productDiscounts()
    .get()
    .execute()
    .catch((err: string) => console.log(err));
};
export const getOneProduct = (product: string) => {
  return createApiRoot().products().withId({ ID: product }).get().execute();
};
