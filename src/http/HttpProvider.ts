
export type RequestConfig<B = any> = {
  /** `body` is the data to be sent as the request body
   *  Only applicable for request methods 'PUT', 'POST', 'DELETE', and 'PATCH'
   */
  body?: B,
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
  get<T, B = never>(url: string, config?: RequestConfig<B>): Promise<Response<T>>;
  post<T, B = any>(url: string, config?: RequestConfig<B>): Promise<Response<T>>;
  patch<T, B = any>(url: string, config?: RequestConfig<B>): Promise<Response<T>>;
  delete<T, B = any>(url: string, config?: RequestConfig<B>): Promise<Response<T>>;
}
