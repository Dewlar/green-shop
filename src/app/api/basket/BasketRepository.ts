import RefreshTokenClient from '../RefreshTokenClient';
import { getProjectKey } from '../helpers';

const projectKey = getProjectKey();

const isApiError = (error: unknown): error is { statusCode: number } => {
  return typeof error === 'object' && error !== null && 'statusCode' in error;
};

const createOrGetActiveBasket = async (): Promise<{
  ID: string;
  version: number;
}> => {
  const client = new RefreshTokenClient();
  const apiRoot = client.getApiRoot();

  try {
    const result = await apiRoot
      .withProjectKey({
        projectKey,
      })
      .me()
      .activeCart()
      .get()
      .execute();
    return {
      ID: result.body.id,
      version: result.body.version,
    };
  } catch (error: unknown) {
    if (isApiError(error) && error.statusCode === 404) {
      const newCart = await apiRoot
        .withProjectKey({
          projectKey,
        })
        .me()
        .carts()
        .post({ body: { currency: 'EUR', country: 'EU' } })
        .execute();
      return {
        ID: newCart.body.id,
        version: newCart.body.version,
      };
    }
    throw error;
  }
};

export default createOrGetActiveBasket;
