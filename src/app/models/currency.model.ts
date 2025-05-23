export interface ICurrencyRateResponse {
  [key: string]: number;
}

export interface IAvailableCurrencies {
  [key: string]: string;
}

export interface ICurrentExchangeRateRaw {
  date: string;
  [baseCurrency: string]: string | {
    [token: string]: number;
  };
}

export type ICurrencyRateType = ICurrencyRateModal[]

export interface ICurrencyRateModal {
  date: string
  rates: IAvailableCurrencies
}