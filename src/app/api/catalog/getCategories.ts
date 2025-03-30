import { CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import { ClientResponse } from '@commercetools/sdk-client-v2';
import { getProjectKey } from '../helpers';
import AnonymousClient from '../AnonymousClient';
import { ICategoryData } from '../types';

const getQueryCategories = async (): Promise<ClientResponse<CategoryPagedQueryResponse>> => {
  const projectKey = getProjectKey();
  const client = new AnonymousClient();
  const apiRoot = client.getApiRoot();
  const result = await apiRoot
    .withProjectKey({
      projectKey,
    })
    .categories()
    .get()
    .execute();
  return result as ClientResponse<CategoryPagedQueryResponse>;
};

const getCategories = async (): Promise<ICategoryData[]> => {
  const response = await getQueryCategories();
  const categories = [] as ICategoryData[];
  if (response?.body) {
    const { results } = response.body;
    results?.forEach((item) => {
      categories.push({
        id: item.id,
        name: item.name.en,
      });
    });
  }
  return categories;
};

export default getCategories;
