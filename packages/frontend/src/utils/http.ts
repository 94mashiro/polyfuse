import axios, { AxiosRequestConfig } from 'axios';
import { merge } from 'lodash';

import { getServerEndpointSetting } from './setting';

const client = axios.create({
  validateStatus: () => true,
  timeout: 30000,
});

interface BaseResponse<T> {
  data: T;
  code: number;
  message: string;
}

export const get = async <T>(path: string, config?: AxiosRequestConfig) => {
  const serverEndpointSetting = getServerEndpointSetting();
  const fullUrl = serverEndpointSetting?.url + path;
  return client
    .get<BaseResponse<T>>(
      fullUrl,
      merge(config, {
        params: {
          token: serverEndpointSetting?.token,
        },
      }),
    )
    .then(res => res.data)
    .then(afterResponse);
};

export const post = async <T>(path: string, body?: Record<string, any>, config?: AxiosRequestConfig) => {
  const serverEndpointSetting = getServerEndpointSetting();
  const fullUrl = serverEndpointSetting?.url + path;
  return client
    .post<BaseResponse<T>>(
      fullUrl,
      body,
      merge(config, {
        params: {
          token: serverEndpointSetting?.token,
        },
      }),
    )
    .then(res => res.data)
    .then(afterResponse);
};

export const afterResponse = <T>(data: BaseResponse<T>) => {
  if ([0, 200].includes(data.code)) {
    return data.data;
  }
  throw new Error(data.message);
};
