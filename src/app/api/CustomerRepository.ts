import { ClientResponse, ClientResult, TokenStore } from '@commercetools/sdk-client-v2';
import { CustomerSignInResult } from '@commercetools/platform-sdk';
import TokenService from './TokenService';
import { ApiLoginResult, UserCredentialData, getProjectKey } from './helpers';
import RefreshTokenClient from './RefreshTokenClient';
import AnonymousClient from './AnonymousClient';

class CustomerRepository {
  private readonly projectKey: string;

  private tokenService: TokenService;

  constructor() {
    this.projectKey = getProjectKey();
    this.tokenService = new TokenService();
  }

  public async createAnonymousCustomer(): Promise<TokenStore> {
    const client = new AnonymousClient();
    const apiRoot = client.getApiRoot();

    await apiRoot.withProjectKey({ projectKey: this.projectKey }).get().execute();

    return this.tokenService.get();
  }

  public async loginCustomer(userData: UserCredentialData): Promise<ApiLoginResult> {
    try {
      const { email, password } = userData;
      const refreshTokenClient = new RefreshTokenClient();
      const refreshApiRoot = refreshTokenClient.getApiRoot();

      const tokenApiResult = await refreshApiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .me()
        .login()
        .post({
          body: {
            email,
            password,
            activeCartSignInMode: 'MergeWithExistingCustomerCart',
          },
        })
        .execute();

      console.log('Token API Result:', tokenApiResult);

      const token = this.tokenService.get();
      console.log('Retrieved Token:', token);

      return {
        apiResult: tokenApiResult as ClientResponse<CustomerSignInResult>,
        token,
      };
    } catch (error) {
      console.error('Login Error:', error);
      return {
        apiResult: error as ClientResponse<ClientResult>,
        token: null,
      };
    }
  }
}

export default CustomerRepository;
