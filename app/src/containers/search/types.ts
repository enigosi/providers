export interface IFilters {
  dischargesFilter: [number, number];
  avarageCoveredChargesFilter: [number, number];
  avarageMedicareChargesFilter: [number, number];
  stateFilter: string;
}

export interface IProvider {
  Id: string;
  'Provider Name': string;
  'Provider Street Address': string;
  'Provider City': string;
  'Provider State': string;
  'Provider Zip Code': string;
  'Hospital Referral Region Description': string;
  'Total Discharges': number;
  'Average Covered Charges': string;
  'Average Total Payments': string;
  'Average Medicare Payments': string;
}
