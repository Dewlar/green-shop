import fetch from 'node-fetch';
import {
  ClientBuilder,
  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

const projectKey = 'greenshop';
const scopes = ['manage_project:greenshop'];

// Configure authMiddlewareOptions
function buildClient() {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    // eslint-disable-next-line object-shorthand
    projectKey: projectKey,
    credentials: {
      clientId: 'z7wOaxnQxzxn43JHrM-0VY3g',
      clientSecret: 'T1YLMv_Ze4asmp713AHKIDfTMBee5YUH',
    },
    scopes,
    fetch,
  };

  // Configure httpMiddlewareOptions
  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: 'https://api.europe-west1.gcp.commercetools.com',
    fetch,
  };

  // Export the ClientBuilder
  const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware() // Include middleware for logging
    .build();
  return ctpClient;
}

export default buildClient;
