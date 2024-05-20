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
  return process.env.CTP_PROJECT_KEY || 'greenshop';
};

export const getApiURL = (): string => {
  return process.env.CTP_API_URL || 'https://api.europe-west1.gcp.commercetools.com';
};

export const getAuthURL = (): string => {
  return process.env.CTP_AUTH_URL || 'https://auth.europe-west1.gcp.commercetools.com';
};

export const getClientSecret = (): string => {
  return process.env.CTP_CLIENT_SECRET || 'T1YLMv_Ze4asmp713AHKIDfTMBee5YUH';
};

export const getClientId = (): string => {
  return process.env.CTP_CLIENT_ID || 'z7wOaxnQxzxn43JHrM-0VY3g';
};

export const getScopes = (): string[] => {
  return process.env.CTP_SCOPES?.split(' ') || ['manage_project:greenshop'];
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

export const storageKey = 'greenshop';

export enum LocalStorageKeysEnum {
  'IS_AUTH' = 'IS_AUTH',
}

export function storageGet<T>(key: string): T | null {
  const item = localStorage.getItem(`${storageKey}_${key}`);
  return item ? (JSON.parse(item) as T) : null;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const storageSet = (key: string, data: any): void => {
  localStorage.setItem(`${storageKey}_${key}`, JSON.stringify(data));
};
