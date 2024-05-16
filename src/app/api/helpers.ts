import {
  AnonymousAuthMiddlewareOptions,
  HttpMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import TokenService from './TokenService';

export interface ExistingTokenFlowOptions {
  authorization: string;
  options: {
    force: boolean;
  };
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
