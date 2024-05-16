import { HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

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
