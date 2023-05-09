/* eslint-disable @typescript-eslint/no-explicit-any */

export type RequestConfig<D = any> = {
  /** `data` is the data to be sent as the request body
   *  Only applicable for request methods 'PUT', 'POST', 'DELETE', and 'PATCH'
   */
  data?: D,
  /** `params` are the URL parameters to be sent with the request
   *  Must be a plain object or a URLSearchParams object
   */
  params?: { [key: string]: any } | URLSearchParams
}

export type Response<T = unknown> = {
  data: T;
  status: number;
  statusText: string;
}

export type HttpDefaults = {
  baseURL?: string,
  timeout?: number,
  commonHeaders?: { [key: string]: string }
}

export type HttpProvider = {
  get<D = never, R = any>(url: string, config?: RequestConfig<D>): Promise<Response<R>>;
  post<D = any, R = any>(url: string, config?: RequestConfig<D>): Promise<Response<R>>;
  patch<D = any, R = any>(url: string, config?: RequestConfig<D>): Promise<Response<R>>;
  delete<D = any, R = any>(url: string, config?: RequestConfig<D>): Promise<Response<R>>;
}
