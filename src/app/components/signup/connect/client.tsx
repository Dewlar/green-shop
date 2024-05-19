import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import buildClient from './BuildClient';

// Create apiRoot from the imported ClientBuilder and include your Project key
export default function createApiRoot() {
  const apiRoot = createApiBuilderFromCtpClient(buildClient()).withProjectKey({ projectKey: 'greenshop' });
  console.log(ApiRoot);
  // Example call to return Project information
  // This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
  const getProject = () => {
    return apiRoot.get().execute();
  };

  // Retrieve Project information and output the result to the log
  getProject().then(console.log).catch(console.error);
  return apiRoot;
}