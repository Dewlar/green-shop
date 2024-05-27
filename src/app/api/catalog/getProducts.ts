import { getProjectKey } from '../helpers';
import AnonymousClient from '../AnonymousClient';

const projectKey = getProjectKey();

export const getProducts = async () => {
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

export default getProducts;
