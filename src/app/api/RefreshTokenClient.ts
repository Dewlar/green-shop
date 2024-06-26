import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { Client, ClientBuilder } from '@commercetools/sdk-client-v2';
import { getHttpMiddlewareOptions, getProjectKey, getRefreshAuthMiddlewareOptions } from './helpers';
import TokenService from './TokenService';

class RefreshTokenClient {
  private readonly clientBuilder: ClientBuilder;

  private readonly client: Client;

  constructor() {
    this.clientBuilder = new ClientBuilder();
    this.client = this.getClient();
  }

  public getApiRoot(): ApiRoot {
    return createApiBuilderFromCtpClient(this.client);
  }

  private getClient(): Client {
    const projectKey = getProjectKey();
    const tokenService = new TokenService();
    const { refreshToken } = tokenService.get();

    const refreshAuthMiddlewareOptions = getRefreshAuthMiddlewareOptions(refreshToken ?? '');
    const httpMiddlewareOptions = getHttpMiddlewareOptions();
    return this.clientBuilder
      .withProjectKey(projectKey)
      .withRefreshTokenFlow(refreshAuthMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();
  }
}

export default RefreshTokenClient;
