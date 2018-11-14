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
