import { ClientResponse, ClientResult } from '@commercetools/sdk-client-v2';
import {
  Cart,
  CentPrecisionMoney,
  LineItem,
  MyCartUpdateAction,
  ClientResponse as ClientResponse2,
} from '@commercetools/platform-sdk';
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

export const getBasket = async (): Promise<ClientResponse<Cart | ClientResult>> => {
  try {
    const client = new RefreshTokenClient();
    const apiRoot = client.getApiRoot();

    const result = await apiRoot
      .withProjectKey({
        projectKey,
      })
      .me()
      .activeCart()
      .get()
      .execute();

    return result as ClientResponse<Cart>;
  } catch (error) {
    return error as ClientResponse<ClientResult>;
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

export const updateBasketQuantityProduct = async ({
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
    // const lineItem = await getLineItemFromBasketByID(productId);

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
              action: 'changeLineItemQuantity',
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

export const addDiscountCode = async (code: string): Promise<ClientResponse2<Cart> | ClientResult> => {
  try {
    const client = new RefreshTokenClient();
    const apiRoot = client.getApiRoot();
    const { ID, version } = await createOrGetActiveBasket();

    const result: ClientResponse2<Cart> = await apiRoot
      .withProjectKey({
        projectKey,
      })
      .me()
      .carts()
      .withId({ ID })
      .post({
        body: {
          version,
          actions: [{ action: 'addDiscountCode', code }],
        },
      })
      .execute();

    return result;
  } catch (error) {
    return error as ClientResult;
  }
};

const isDiscountsApplied = async (): Promise<boolean> => {
  const client = new RefreshTokenClient();
  const apiRoot = client.getApiRoot();

  const result = await apiRoot
    .withProjectKey({
      projectKey,
    })
    .me()
    .activeCart()
    .get()
    .execute();

  if (result.body.discountCodes.length === 0) {
    throw new Error('No promo codes applied');
  }
  return true;
};

const getPromocodeID = async (code: string): Promise<string> => {
  const client = new RefreshTokenClient();
  const apiRoot = client.getApiRoot();
  const result = await apiRoot
    .withProjectKey({
      projectKey,
    })
    .discountCodes()
    .get()
    .execute();

  const { results } = result.body;
  const promocode = results.find((item) => item.code === code);

  if (!promocode) {
    throw new Error('No specified promo code in the cart');
  }

  return promocode.id;
};

export const removeDiscountCode = async (code: string): Promise<ClientResponse<Cart | ClientResult>> => {
  try {
    const client = new RefreshTokenClient();
    const apiRoot = client.getApiRoot();
    const { ID, version } = await createOrGetActiveBasket();

    const isApplied = await isDiscountsApplied();
    if (!isApplied) {
      // console.log('No discounts applied, skipping removal.');
      return {
        statusCode: 200,
        message: 'No discounts applied, skipping removal.',
      } as ClientResponse<ClientResult>;
    }

    const promocodeID = await getPromocodeID(code);
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
              action: 'removeDiscountCode',
              discountCode: { typeId: 'discount-code', id: promocodeID },
            },
          ],
        },
      })
      .execute();

    // console.log('Discount code removed successfully');

    return result as ClientResponse<Cart>;
  } catch (error) {
    console.error('Error removing discount code:', error);
    return {
      statusCode: 500,
      message: (error as Error).message,
    } as ClientResponse<ClientResult>;
  }
};
