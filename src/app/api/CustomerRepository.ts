import { ClientResponse, ClientResult, TokenStore } from '@commercetools/sdk-client-v2';
import {
  Customer,
  CustomerSignInResult,
  MyCustomerChangePassword,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
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

      const authClient = new AuthClient(userData);
      const authApiRoot = authClient.getApiRoot();
      await authApiRoot
        .withProjectKey({
          projectKey: this.projectKey,
        })
        .me()
        .get()
        .execute();

      const token = this.tokenService.get();

      return {
        apiResult: tokenApiResult as ClientResponse<CustomerSignInResult>,
        token,
      };
    } catch (error) {
      // console.error('Login Error:', error);
      return {
        apiResult: error as ClientResponse<ClientResult>,
        token: null,
      };
    }
  }

  public async getCustomer(): Promise<ClientResponse<Customer>> {
    const client = new RefreshTokenClient();
    const apiRoot = client.getApiRoot();

    const result = await apiRoot.withProjectKey({ projectKey: this.projectKey }).me().get().execute();
    return result as ClientResponse<Customer>;
  }

  public async updateCustomer(data: MyCustomerUpdate): Promise<ClientResponse<Customer>> {
    const client = new RefreshTokenClient();
    const apiRoot = client.getApiRoot();
    const result = await apiRoot
      .withProjectKey({ projectKey: this.projectKey })
      .me()
      .post({
        body: data,
      })
      .execute();
    return result as ClientResponse<Customer>;
  }

  public async changeCustomerPassword(data: MyCustomerChangePassword): Promise<ClientResponse<Customer>> {
    const client = new RefreshTokenClient();
    const apiRoot = client.getApiRoot();
    const result = await apiRoot
      .withProjectKey({ projectKey: this.projectKey })
      .me()
      .password()
      .post({ body: data })
      .execute();
    return result as ClientResponse<Customer>;
  }
}

export default CustomerRepository;
