import fetch, {Response } from "node-fetch";

export interface FetchOptions {
  baseURL?: string;
  commomHeaders?: Record<string, string>;
}

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

export interface RequestOptions {
  params?: Record<string, string>;
  body?: JSONValue;
}

// just a fetch incapsulation to avoid boilerplate code
export class Fetch {
  baseURL: string | undefined;
  commomHeaders: Record<string, string> | undefined;

  constructor(options: FetchOptions = {}) {
    const { baseURL, commomHeaders } = options;
    this.baseURL = baseURL;
    this.commomHeaders = commomHeaders;
  }

  async get(
    url: string,
    options: RequestOptions = {}
  ): Promise<Response> {
    const queryParams = new URLSearchParams(options.params);

    return fetch(`${this.baseURL}${url}?${queryParams}`, {
      headers: { ...this.commomHeaders },
    });
  }

  async patch(
    url: string,
    options: RequestOptions = {}
  ): Promise<Response> {
    const body = JSON.stringify(options.body);

    return fetch(`${this.baseURL}${url}`, {
      method: "PATCH",
      body,
      headers: {
        "Content-Type": "application/json",
        ...this.commomHeaders,
      },
    });
  }

  async post(
    url: string,
    options: RequestOptions = {}
  ): Promise<Response> {
    const body = JSON.stringify(options.body);

    return fetch(`${this.baseURL}${url}`, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
        ...this.commomHeaders,
      },
    });
  }
}
