import { ClientResponse, ClientResult } from '@commercetools/sdk-client-v2';
import { Cart, CentPrecisionMoney, LineItem, MyCartUpdateAction } from '@commercetools/platform-sdk';
import RefreshTokenClient from '../RefreshTokenClient';
import { getProjectKey } from '../helpers';
import { ICurrentBasket } from '../types';

const projectKey = getProjectKey();

const isApiError = (error: unknown): error is { statusCode: number } => {
  return typeof error === 'object' && error !== null && 'statusCode' in error;
};

export const createOrGetActiveBasket = async (): Promise<ICurrentBasket> => {
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

export const getTotalPrice = async (): Promise<CentPrecisionMoney | undefined> => {
  const client = new RefreshTokenClient();
  const apiRoot = client.getApiRoot();
  const { ID } = await createOrGetActiveBasket();
  const result = await apiRoot
    .withProjectKey({
      projectKey,
    })
    .me()
    .carts()
    .withId({ ID })
    .get()
    .execute();

  return (result as ClientResponse<Cart>).body?.totalPrice;
};

export const addProductToBasket = async ({
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

export const getLineItemsFromBasket = async (): Promise<LineItem[]> => {
  const client = new RefreshTokenClient();
  const apiRoot = client.getApiRoot();
  const { ID } = await createOrGetActiveBasket();

  const result = await apiRoot
    .withProjectKey({
      projectKey,
    })
    .me()
    .carts()
    .withId({ ID })
    .get()
    .execute();

  return result.body.lineItems;
};

export const deleteProductInBasket = async ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}): Promise<ClientResponse<Cart | ClientResult>> => {
  try {
    const client = new RefreshTokenClient();
    const apiRoot = client.getApiRoot();
    const { ID, version } = await createOrGetActiveBasket();

    const result = await apiRoot
      .withProjectKey({
        projectKey,
      })
      .me()
      .carts()
      .withId({ ID })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'removeLineItem',
              lineItemId: productId,
              quantity,
            },
          ],
        },
      })
      .execute();
    return result as ClientResponse<Cart>;
  } catch (error) {
    return error as ClientResponse<ClientResult>;
  }
};

export const clearBasket = async (): Promise<ClientResponse<Cart | ClientResult>> => {
  try {
    const client = new RefreshTokenClient();
    const apiRoot = client.getApiRoot();
    const { ID, version } = await createOrGetActiveBasket();
    const lineItems = await getLineItemsFromBasket();

    const actions: MyCartUpdateAction[] = lineItems.map((item) => ({
      action: 'changeLineItemQuantity',
      lineItemId: item.id,
      quantity: 0,
    }));

    const result = await apiRoot
      .withProjectKey({
        projectKey,
      })
      .me()
      .carts()
      .withId({ ID })
      .post({
        body: {
          version,
          actions,
        },
      })
      .execute();

    return result as ClientResponse<Cart>;
  } catch (error) {
    return error as ClientResponse<ClientResult>;
  }
};
