import { PloomesQuery } from './Protocol';
// import { Fetch } from "./Fetch.js";
import type { Contact, Deal, InteractionRecord } from './Entities';
import { DefaultConfig } from './Consts';
import axios, { AxiosInstance } from 'axios';
import { HttpProvider, Response } from './http';
import { resultify } from './resultify';
import { RawResource } from './types';

export type PloomesClientOptions = {
  ploomesURL?: string,
  timeout?: number,
  retries?: number
}

export class PloomesClient {
  private http: HttpProvider;

  constructor(userKey: string, options: PloomesClientOptions = {}) {
    const { ploomesURL, timeout } = options;
    if (!userKey)
      throw new Error('Ploomes userKey not provided.');

    this.http = axios.create({
      baseURL: ploomesURL || DefaultConfig.ploomesURL,
      timeout: timeout || DefaultConfig.timeout,
    });
  }

  async getContacts(
    queryBuilder: (q: PloomesQuery) => PloomesQuery
  ): Promise<Contact[]> {
    const params = queryBuilder(new PloomesQuery()).getParams();

    let res: Response<{ value: RawResource<Contact>[] }>;
    try {
      res = await this.http.get('/Contacts', { params });
    } catch (error) {
      throw new Error(`Unable to connect to ploomes API: ${error}`, { cause: error });
    }

    return res.value as Contact[];
  }

  async createContact(data: Omit<Contact, 'Id'>): Promise<Contact> {
    const res = await this.fetch.post('/Contacts', { body: data});
    
    if (!res.ok) {
      throw new Error(
        `Unable to connect to ploomes API: /Contacts ${res.status} - ${
          res.statusText
        } \n ${await res.text()}`
      );
    }

    const resData = (await res.json()) as { value: Contact[] };

    const [contact] = resData.value;

    if (!contact)
      throw new Error(
        `something went wrong creating contact on ploomes: ${res.status} \n ${await res.text()}`
      );
    
    return contact;
  }

  async createDeal(data: Omit<Deal, 'Id'>): Promise<Deal> {
    console.info('[ploomes api /Deals] post');
    const res = await this.fetch.post('/Deals', { body: data});
    
    if (!res.ok) {
      console.info('[ploomes api /Deals] error happened');
      throw new Error(
        `Unable to connect to ploomes API: /Deals ${res.status} - ${
          res.statusText
        } \n ${await res.text()}`
      );
    }

    console.info('[ploomes api /Deals] parsing response');
    const resData = (await res.json()) as { value: Deal[] };

    const [deal] = resData.value;

    if (!deal)
      throw new Error(
        `something went wrong creating deal on ploomes: ${res.status} \n ${await res.text()}`
      );
    
    console.info('[ploomes api /Deals] deal created');
    return deal;
  }

  async createInteractionRecord(data: Omit<InteractionRecord, 'Id'>): Promise<InteractionRecord> {
    const res = await this.fetch.post('/InteractionRecords', { body: data});
    
    if (!res.ok) {
      throw new Error(
        `Unable to connect to ploomes API: /InteractionRecords ${res.status} - ${
          res.statusText
        } \n ${await res.text()}`
      );
    }

    const resData = (await res.json()) as { value: InteractionRecord[] };

    const [interaction] = resData.value;

    if (!interaction)
      throw new Error(
        `something went wrong creating interaction on ploomes: ${res.status} \n ${await res.text()}`
      );
    
    return interaction;
  }

  // async updateContact(Id: number, data: Partial<Omit<Contact, "Id">>): Promise<Contact> {
  //   const res = await this.fetch.patch(`/Contacts(${Id})`, {
  //     body: data,
  //   });

  //   if (!res.ok) {
  //     if (res.status === 404)
  //       throw new Error(
  //         `Ploomes Contact ${Id} not found: ${res.status} - ${res.statusText}`
  //       );
  //     throw new Error(
  //       `Unable to connect to ploomes API: ${res.status} - ${
  //         res.statusText
  //       } \n ${await res.text()}`
  //     );
  //   }

  //   const resData = (await res.json()) as { value: unknown[] };

  //   return resData.value[0] as Contact;
  // }
}
