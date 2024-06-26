import AnonymousClient from '../AnonymousClient';
import { getProjectKey } from '../helpers';

const projectKey = getProjectKey();

const getProductsSort = async (sortOption = '') => {
  const client = new AnonymousClient();
  const apiRoot = client.getApiRoot();

  const response = await apiRoot
    .withProjectKey({
      projectKey,
    })
    .productProjections()
    .search()
    .get({ queryArgs: { sort: [sortOption] } })
    .execute();
  return response;
};

export default getProductsSort;
