export const PLOOMES_DEFAULT_BASE_URL = "https://public-api2.ploomes.com";
export const PLOOMES_DEFAULT_TIMEOUT = 15_000; //ms
export const PLOOMES_DEFAULT_RETRY = 3; //ms

export const DefaultConfig = {
  ploomesURL: "https://public-api2.ploomes.com",
  timeout: 15_000,
  retries: 3
} as const

export const CountryId = {
  BRAZIL: 76 as const,
};

export const PhoneTypeId = {
  CELULAR: 2 as const,
};
