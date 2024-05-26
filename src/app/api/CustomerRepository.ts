import { ClientResponse, ClientResult, TokenStore } from '@commercetools/sdk-client-v2';
import { CustomerSignInResult } from '@commercetools/platform-sdk';
import TokenService from './TokenService';
import { ApiLoginResult, UserCredentialData, getProjectKey } from './helpers';
import RefreshTokenClient from './RefreshTokenClient';
import AnonymousClient from './AnonymousClient';
import AuthClient from './AuthClient';

class CustomerRepository {
  private readonly projectKey: string;

  private tokenService: TokenService;

  constructor() {
    this.projectKey = getProjectKey();
    this.tokenService = new TokenService();
  }

  public async createAnonymousCustomer(): Promise<TokenStore> {
    try {
      const client = new AnonymousClient();
      const apiRoot = client.getApiRoot();

      const response = await apiRoot.withProjectKey({ projectKey: this.projectKey }).get().execute();

      console.log('Create Anonymous Customer Response:', response);

      return this.tokenService.get();
    } catch (error) {
      console.error('Create Anonymous Customer Error:', error);
      throw error;
    }
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

      console.log('Login Customer Response:', tokenApiResult);

      const authClient = new AuthClient(userData);
      const authApiRoot = authClient.getApiRoot();
      const authApiResponse = await authApiRoot
        .withProjectKey({
          projectKey: this.projectKey,
        })
        .me()
        .get()
        .execute();

      console.log('Auth Customer Response:', authApiResponse);

      const token = this.tokenService.get();

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
