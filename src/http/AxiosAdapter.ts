/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios';
import { HttpProvider, HttpDefaults, RequestConfig, Response } from './HttpProvider';

export class AxiosAdapter implements HttpProvider {
  axios: AxiosInstance;

  constructor(defaults: HttpDefaults) {
    const { baseURL, timeout, commonHeaders } = defaults || {};
    this.axios = axios.create({baseURL, timeout, headers: commonHeaders});
  }

  get<B, R = any>(url: string, config?: RequestConfig<B>): Promise<Response<R>> {
    return this.axios.get(url, {
      params: config?.params
    });
  }

  post<B, R = any>(url: string, config?: RequestConfig<B>): Promise<Response<R>> {
    return this.axios.post(url, config?.body, { params: config?.params });
  }

  patch<B, R = any>(url: string, config?: RequestConfig<B>): Promise<Response<R>> {
    return this.axios.patch(url, config?.body, { params: config?.params });
  }

  delete<B, R = any>(url: string, config?: RequestConfig<B>): Promise<Response<R>> {
    return this.axios.delete(url, {
      params: config?.params,
      data: config?.body
    });
  }
}
