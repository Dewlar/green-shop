import { ClientResponse } from '@commercetools/sdk-client-v2';
import { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { getProjectKey } from '../helpers';
import AnonymousClient from '../AnonymousClient';

const projectKey = getProjectKey();

const getQueryProducts = async (
  filter?: string[],
  sort?: string[],
  limit = 20,
  offset = 0,
  search?: string,
  markMatchingVariants?: boolean
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
      markMatchingVariants,
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

const getProductsFilter = async ({
  filter,
  sort,
  limit = 20,
  offset = 0,
  search = '',
  markMatchingVariants = true,
}: {
  filter?: string[];
  sort?: string[];
  limit?: number;
  offset?: number;
  search?: string;
  markMatchingVariants: boolean;
}): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> => {
  return getQueryProducts(filter, sort, limit, offset, search, markMatchingVariants);
};

export default getProductsFilter;
