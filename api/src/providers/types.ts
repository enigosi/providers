export interface QueryParameters {
  max_discharges?: string;
  min_discharges?: string;
  max_average_covered_charges?: string;
  min_average_covered_charges?: string;
  max_average_medicare_payments?: string;
  min_average_medicare_payments?: string;
  state?: string;
  page?: string;
  per_page?: string;
}

export enum ResultHeaders {
  ID = 'Id',
  PROVIDER_NAME = 'Provider Name',
  PROVIDER_STREET_ADDRESS = 'Provider Street Address',
  PROVIDER_CITY = 'Provider City',
  PROVIDER_STATE = 'Provider State',
  PROVIDER_ZIP_CODE = 'Provider Zip Code',
  HOSPITAL_REFERRAL_REGION_DESCRIPTION = 'Hospital Referral Region Description',
  TOTAL_DISCHARGES = 'Total Discharges',
  AVARAGE_COVERED_CHARGES = 'Average Covered Charges',
  AVARAGE_TOTAL_PAYMENTS = 'Average Total Payments',
  AVARAGE_MEDICAL_PAYMENTS = 'Average Medicare Payments'
}

export enum DbFields {
  PROVIDER_NAME = 'Provider Name',
  PROVIDER_STREET_ADDRESS = 'Provider Street Address',
  PROVIDER_CITY = 'Provider City',
  PROVIDER_STATE = 'Provider State',
  PROVIDER_ZIP_CODE = 'Provider Zip Code',
  HOSPITAL_REFERRAL_REGION_DESCRIPTION = 'Hospital Referral Region Description',
  TOTAL_DISCHARGES = 'Total Discharges',
  AVARAGE_COVERED_CHARGES_CENTS = 'Average Covered Charges Cents',
  AVARAGE_TOTAL_PAYMENTS_CENTS = 'Average Total Payments Cents',
  AVARAGE_MEDICAL_PAYMENTS_CENTS = 'Average Medicare Payments Cents'
}
