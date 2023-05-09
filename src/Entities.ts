import type { CountryId, PhoneTypeId } from "./Consts.js";

type valueof<T> = T[keyof T];

export type Phone = {
  PhoneNumber: string; // "+55 XX XXXXX-XXXX" | "(XX) XXXXX-XXXX"
  CountryId: valueof<typeof CountryId>;
  TypeId: valueof<typeof PhoneTypeId>;
};

export type Contact = {
  Id: number;
  CPF: string;
  Name: string;
  Birthday: string;
  Email: string;
  Phones: Phone[];
};



export type PloomesTag = {
  Id: number;
  Name: string;
  EntityId: number;
  Color: string;
  display: string;
  TagId: number;
};

export type PloomesStringPropertie = {
  FieldKey: string;
  StringValue: string;
};

export type Deal = {
  Id: number,
  Title: string;
  ContactId: number;
  StageId: number;
  OtherProperties?: Array<PloomesStringPropertie>;
  Tags?: Array<PloomesTag>;
};

export const InteractionType = {
  SimpleInteraction : 1
} as const

export type InteractionType = typeof InteractionType[keyof typeof InteractionType];

export type InteractionRecord = {
  Id: number,
  ContactId: number,
  DealId: number,
  Content: string,
  TypeId: InteractionType
}
