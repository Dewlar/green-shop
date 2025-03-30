import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export const TOKEN_NAME = 'token';

class TokenService implements TokenCache {
  private tokenStore: TokenStore;

  private sessionStorage: Storage = window.sessionStorage;

  private refreshToken = '';

  constructor() {
    const json = this.sessionStorage.getItem(TOKEN_NAME) ?? '{"token":"","expirationTime":0,"refreshToken":""}';
    this.tokenStore = JSON.parse(json) as TokenStore;
    const { refreshToken } = this.tokenStore;
    this.refreshToken = refreshToken ?? this.refreshToken;
  }

  public get(): TokenStore {
    return this.tokenStore;
  }

  public set(data: TokenStore): void {
    this.refreshToken = data.refreshToken ?? this.refreshToken;
    this.tokenStore = { ...data, refreshToken: this.refreshToken };
    const json = JSON.stringify(this.tokenStore);
    this.sessionStorage.setItem('refreshToken', this.refreshToken);
    this.sessionStorage.setItem(TOKEN_NAME, json);
  }

  public removeToken(): void {
    this.sessionStorage.removeItem('refreshToken');
    this.sessionStorage.removeItem(TOKEN_NAME);
  }
}

export default TokenService;
