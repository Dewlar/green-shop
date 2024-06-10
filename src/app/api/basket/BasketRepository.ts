import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { ClientResult } from '@commercetools/sdk-client-v2';
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

const addProductToBasket = async ({
  productId,
  quantity,
  variantId = 1,
  cartId,
}: {
  productId: string;
  quantity: number;
  variantId?: number;
  cartId?: string;
}): Promise<ClientResponse<Cart | ClientResult>> => {
  try {
    const client = new RefreshTokenClient();
    const apiRoot = client.getApiRoot();
    const { ID, version } = await createOrGetActiveBasket();

    const activeCart = cartId ?? ID;

    const result = await apiRoot
      .withProjectKey({
        projectKey,
      })
      .me()
      .carts()
      .withId({ ID: activeCart })
      .post({
        body: {
          version,
          actions: [{ action: 'addLineItem', productId, variantId, quantity }],
        },
      })
      .execute();

    return result as ClientResponse<Cart>;
  } catch (error) {
    return error as ClientResponse<ClientResult>;
  }
};

export default addProductToBasket;
