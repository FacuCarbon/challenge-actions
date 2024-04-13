export interface ActionsContextTypes {
  retrieveStocks: (params: RequestBase) => Promise<Response | undefined>;
  retrieveTimeSeries: (params: RequestExtense) => Promise<Response | undefined>;
  manageFavorites: (typeAction: "add" | "remove", data: Stock) => void;

  favorites: Stock[];
}

/// Stocks
export interface Stock {
  symbol: string;
  name?: string;
  currency: string;
  exchange: string;
  mic_code: string;
  country?: string;
  type: string;
  interval?: Interval;
}
export type Interval = "1min" | "5min" | "15min";
export interface ResponseStock {
  count: number;
  data: Stock[];
  status: "ok" | "error";
}
///////////

/// Time series
export interface ValueTimeSerie {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}
export interface ResponseTimeSerie {
  meta: Stock;
  values: ValueTimeSerie[];
  status: "ok" | "error";
}

///////////

/// Response functions
export interface RequestBase {
  sizeList?: string;
  symbol?: string;
  exchange?: string;
}

export interface RequestExtense extends RequestBase {
  interval?: Interval;
  start_date?: string;
  end_date?: string;
}
