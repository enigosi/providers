import { ColumnProps } from 'antd/lib/table';
import { IProvider } from './types';

/**
 * Maximum value for Discharges charges for filter slider (in dollars)
 */
export const DISCHARGES_MAX = 40;
/**
 * Maximum value for Avarage Covered Charges for filter slider (in dollars)
 */
export const AVARAGE_COVERED_CHARGES_MAX = 100000;
/**
 * Maximum value for Avarage Medicare Charges for filter slider (in dollars)
 */
export const AVARAGE_MEDICARE_CHARGES_MAX = 160000;

/**
 * Pagination settings
 */
export const RESULTS_PER_PAGE = 100;

/**
 * Definition of columns used to render Ant Design Table
 */
export const COLUMNS: ColumnProps<IProvider>[] = [
  {
    dataIndex: 'Provider Name',
    title: 'Provider Name'
  },
  {
    dataIndex: 'Provider Street Address',
    title: 'Provider Street Address'
  },
  {
    dataIndex: 'Provider City',
    title: 'Provider City'
  },
  {
    dataIndex: 'Provider State',
    title: 'Provider State'
  },
  {
    dataIndex: 'Provider Zip Code',
    title: 'Provider Zip Code'
  },
  {
    dataIndex: 'Hospital Referral Region Description',
    title: 'Hospital Referral Region Description'
  },
  {
    dataIndex: 'Total Discharges',
    title: 'Total Discharges'
  },
  {
    dataIndex: 'Average Covered Charges',
    title: 'Average Covered Charges'
  },
  {
    dataIndex: 'Average Total Payments',
    title: 'Average Total Payments'
  },
  {
    dataIndex: 'Average Medicare Payments',
    title: 'Average Medicare Payments'
  }
];

export const FIELD_QUERY_PARAM_LABELS = {
  provider_name: 'Provider Name',
  provider_street_address: 'Provider Street Address',
  provider_city: 'Provider City',
  providet_state: 'Provider State',
  provider_zip_code: 'Provider Zip Code',
  hospital_referral_region_description: 'Hospital Referral Region Description',
  total_discharges: 'Total Discharges',
  avarage_covered_charges: 'Average Covered Charges',
  avarage_total_payments: 'Average Total Payments',
  avarage_medicare_payments: 'Average Medicare Payments'
};
