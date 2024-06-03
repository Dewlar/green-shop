import { HttpErrorType, TokenStore } from '@commercetools/sdk-client-v2';
import { ClientResponse, Customer, MyCustomerChangePassword, MyCustomerUpdate } from '@commercetools/platform-sdk';
import TokenService from './TokenService';
import { UserCredentialData, getProjectKey } from './helpers';
import RefreshTokenClient from './RefreshTokenClient';
import AnonymousClient from './AnonymousClient';
import AuthClient from './AuthClient';

class CustomerRepository {
  private readonly projectKey: string;

  private tokenService: TokenService;

  private authApiResponse: ClientResponse<Customer> | undefined;

  constructor() {
    this.projectKey = getProjectKey();
    this.tokenService = new TokenService();
  }

  public async createAnonymousCustomer(): Promise<TokenStore> {
    try {
      const client = new AnonymousClient();
      const apiRoot = client.getApiRoot();

      await apiRoot.withProjectKey({ projectKey: this.projectKey }).get().execute();

      return this.tokenService.get();
    } catch (error) {
      console.error('Create Anonymous Customer Error:', error);
      throw error;
    }
  }

  public getCustomerData() {
    return this.authApiResponse;
  }

  public async loginCustomer(userData: UserCredentialData) {
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
      this.authApiResponse = await authApiRoot
        .withProjectKey({
          projectKey: this.projectKey,
        })
        .me()
        .get()
        .execute();

      const token = this.tokenService.get();

      return {
        apiResult: tokenApiResult,
        token,
        customer: this.authApiResponse,
      };
    } catch (error) {
      // console.error('Login Error:', error);
      return {
        apiResult: error as HttpErrorType,
        token: null,
        customer: this.authApiResponse,
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
