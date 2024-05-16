import {
  AnonymousAuthMiddlewareOptions,
  ClientResponse,
  ClientResult,
  HttpErrorType,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
  TokenStore,
} from '@commercetools/sdk-client-v2';
import { CustomerSignInResult } from '@commercetools/platform-sdk';
import TokenService from './TokenService';

export interface ExistingTokenFlowOptions {
  authorization: string;
  options: {
    force: boolean;
  };
}

export interface UserCredentialData {
  email: string;
  password: string;
}

export interface ApiLoginResult {
  apiResult: ClientResponse<CustomerSignInResult> | ClientResponse<ClientResult> | HttpErrorType;
  token: TokenStore | null;
}

export const getProjectKey = (): string => {
  return process.env.CTP_PROJECT_KEY || '';
};

export const getApiURL = (): string => {
  return process.env.CTP_API_URL || '';
};

export const getAuthURL = (): string => {
  return process.env.CTP_AUTH_URL || '';
};

export const getClientSecret = (): string => {
  return process.env.CTP_CLIENT_SECRET || '';
};

export const getClientId = (): string => {
  return process.env.CTP_CLIENT_ID || '';
};

export const getScopes = (): string[] => {
  return process.env.CTP_SCOPES?.split(' ') || [];
};

export function getExistingTokenFlowOptions(token: string): ExistingTokenFlowOptions {
  return {
    authorization: `Bearer ${token}`,
    options: {
      force: true,
    },
  };
}

export function getHttpMiddlewareOptions(): HttpMiddlewareOptions {
  return {
    host: getApiURL(),
    fetch,
  };
}

export function getRefreshAuthMiddlewareOptions(refreshToken: string): RefreshAuthMiddlewareOptions {
  return {
    host: getAuthURL(),
    projectKey: getProjectKey(),
    credentials: { clientId: getClientId(), clientSecret: getClientSecret() },
    refreshToken,
    tokenCache: new TokenService(),
    fetch,
  };
}

export function getAnonymousAuthMiddlewareOptions(): AnonymousAuthMiddlewareOptions {
  return {
    host: getAuthURL(),
    projectKey: getProjectKey(),
    credentials: {
      clientId: getClientId(),
      clientSecret: getClientSecret(),
    },
    scopes: getScopes(),
    tokenCache: new TokenService(),
    fetch,
  };
}

export function getAuthMiddlewareOptions(userData: UserCredentialData): PasswordAuthMiddlewareOptions {
  const { email, password } = userData;
  return {
    host: getAuthURL(),
    projectKey: getProjectKey(),
    credentials: {
      clientId: getClientId(),
      clientSecret: getClientSecret(),
      user: {
        username: email,
        password,
      },
    },
    scopes: getScopes(),
    tokenCache: new TokenService(),
    fetch,
  };
}
