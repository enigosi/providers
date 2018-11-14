export interface IFilters {
  dischargesFilter: [number, number];
  avarageCoveredChargesFilter: [number, number];
  avarageMedicareChargesFilter: [number, number];
  stateFilter: string;
  currentPage: number;
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

export type IRangeFilterValue = [number, number];

export type IRangeFilters =
  | 'dischargesFilter'
  | 'avarageCoveredChargesFilter'
  | 'avarageMedicareChargesFilter';

/**
 * Temporary types for react-refetch
 * TODO replace with correct ts definitions once they are correctly published
 */
export type PromiseStateLike<T> = T | PromiseState<T>;

export interface PromiseStateStatic {
  create<T = {}>(meta?: any): PromiseState<T>;
  refresh<T = {}>(previous?: PromiseState<T>, meta?: any): PromiseState<T>;
  resolve<T = {}>(value?: PromiseStateLike<T>, meta?: any): PromiseState<T>;
  reject<T = {}>(reason?: any, meta?: any): PromiseState<T>;
  all<T = {}>(iterable: Iterable<PromiseState<any>>): PromiseState<T[]>;
  race<T = {}>(iterable: Iterable<PromiseState<any>>): PromiseState<T>;
}

export interface PromiseState<T = {}> {
  readonly pending: boolean;
  readonly refreshing: boolean;
  readonly fulfilled: boolean;
  readonly rejected: boolean;
  readonly settled: boolean;
  readonly value: T;
  readonly reason: any;
  readonly meta: any;
  then: <TFulfilled = T, TRejected = T>(
    onFulfilled?: (value: PromiseStateLike<T>) => PromiseStateLike<TFulfilled>,
    onRejected?: (reason: any) => PromiseStateLike<TRejected>
  ) =>
    | PromiseStateLike<T>
    | PromiseStateLike<TFulfilled>
    | PromiseStateLike<TRejected>;
  catch: <TRejected = T>(
    onRejected?: (reason: any) => PromiseStateLike<TRejected>
  ) => PromiseStateLike<T> | PromiseStateLike<TRejected>;
}
