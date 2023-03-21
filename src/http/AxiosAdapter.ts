import axios, { AxiosInstance } from "axios";
import { HttpProvider, HttpDefaults, RequestConfig, Response } from "./HttpProvider";

export class AxiosAdapter implements HttpProvider {
  axios: AxiosInstance;

  constructor(defaults: HttpDefaults) {
    const { baseURL, timeout, commonHeaders } = defaults || {}
    this.axios = axios.create({baseURL, timeout, headers: commonHeaders})
  }

  get<T, D = any>(url: string, config?: RequestConfig<D>): Promise<Response<T>> {
    return this.axios.get(url, {
      params: config?.params
    })
  }

  post<T, D = any>(url: string, config?: RequestConfig<any>): Promise<Response<T>> {
    return this.axios.post(url, config?.body, { params: config?.params })
  }

  patch<T, D = any>(url: string, config?: RequestConfig<any>): Promise<Response<T>> {
    return this.axios.patch(url, config?.body, { params: config?.params })
  }

  delete<T, D = any>(url: string, config?: RequestConfig<any>): Promise<Response<T>> {
    return this.axios.delete(url, {
      params: config?.params,
      data: config?.body
    })
  }
}
