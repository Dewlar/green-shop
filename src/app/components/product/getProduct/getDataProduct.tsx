import { toast } from 'react-toastify';
import createApiRoot from '../../signup/connect/client';

export const getProductData = () => {
  return createApiRoot()
    .products()
    .get()
    .execute()
    .catch((err: string) => toast.error(err));
};

export const getProductDataTypes = () => {
  return createApiRoot()
    .productTypes()
    .get()
    .execute()
    .catch((err: string) => toast.error(err));
};
export const getProductDiscounts = () => {
  return createApiRoot()
    .productDiscounts()
    .get()
    .execute()
    .catch((err: string) => toast.error(err));
};
export const getOneProduct = (product: string) => {
  return createApiRoot().products().withId({ ID: product }).get().execute();
};
