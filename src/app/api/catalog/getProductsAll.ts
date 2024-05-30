import { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { getProjectKey } from '../helpers';
import AnonymousClient from '../AnonymousClient';

export const LIMIT = 20;
export const OFFSET = 0;

const projectKey = getProjectKey();

export const getProductsAll = async () => {
  const client = new AnonymousClient();
  const apiRoot = client.getApiRoot();
  const result = await apiRoot
    .withProjectKey({
      projectKey,
    })
    .products()
    .get()
    .execute();
  return result;
};

export const getQueryProducts = async (
  filter?: string[],
  sort?: string[],
  limit = LIMIT,
  offset = OFFSET,
  search?: string
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> => {
  const client = new AnonymousClient();
  const apiRoot = client.getApiRoot();
  const query = {
    queryArgs: {
      filter,
      sort,
      limit,
      offset,
      'text.en': search,
    },
  };
  const result = await apiRoot
    .withProjectKey({
      projectKey,
    })
    .productProjections()
    .search()
    .get(query)
    .execute();
  return result as ClientResponse<ProductProjectionPagedQueryResponse>;
};

export const getProductsByFilter = async ({
  filter,
  sort,
  limit = LIMIT,
  offset = OFFSET,
  search = '',
}: {
  filter?: string[];
  sort?: string[];
  limit?: number;
  offset?: number;
  search?: string;
}): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> => {
  return getQueryProducts(filter, sort, limit, offset, search);
};
