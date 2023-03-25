export type OtherPropertyType = 'StringValue' | 'BoolValue' | 'IntegerValue';

export type OtherPropertyDefinition = {
  FieldKey: string,
  ValueType: OtherPropertyType,
  Enum?: ReadonlyArray<{
    Id: number,
    Name: string
  }>
}

export type PropsDefinition = Record<string, OtherPropertyDefinition>

type ValueTypes = {
  IntegerValue: number | null,
  StringValue: string | null,
  BoolValue: boolean | null
}

type InferValueType<T> = T extends { ValueType: infer V }
  ? V extends keyof ValueTypes
    ? ValueTypes[V]
    : never
  : never;

type InferEnumType<T> = T extends ReadonlyArray<{ Name: infer E }> ? E | null : never

export type InferOtherProperties<T> = T extends PropsDefinition
  ? { -readonly [K in keyof T]?: 'Enum' extends keyof T[K]
    ? InferEnumType<T[K]['Enum']>
    : InferValueType<T[K]>
  }
  : never;

export type RawOtherProperty = { FieldKey: string } & Partial<ValueTypes>

export type PloomesEntity = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  OtherProperties?: { [key: string]: any } | undefined
}

export type RawResource<T extends PloomesEntity> = Omit<T, 'OtherProperties'> & {
  OtherProperties?: RawOtherProperty[] | undefined
}

export type PloomesResource = {
  __rawOtherProperties?: RawOtherProperty[] | undefined
}

export type Phone = {
  PhoneNumber: string; // "+55 XX XXXXX-XXXX" | "(XX) XXXXX-XXXX"
  CountryId: number;
  TypeId: number;
};
