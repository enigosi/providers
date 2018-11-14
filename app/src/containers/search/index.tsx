import * as React from 'react';
import { debounce } from 'lodash/fp';
import Search from './search';
import { IFilters, IProvider, IRangeFilterValue, IRangeFilters } from './types';
import {
  DISCHARGES_MAX,
  AVARAGE_COVERED_CHARGES_MAX,
  AVARAGE_MEDICARE_CHARGES_MAX
} from './consts';

interface IState
  extends Pick<
    IFilters,
    | 'dischargesFilter'
    | 'avarageCoveredChargesFilter'
    | 'avarageMedicareChargesFilter'
    | 'stateFilter'
  > {
  providers: IProvider[];
  errorStatus?: string;
  currentPage: number;
}

export default class SearchContainer extends React.Component<{}, IState> {
  state: IState = {
    providers: [],
    dischargesFilter: [1, DISCHARGES_MAX],
    avarageCoveredChargesFilter: [1, AVARAGE_COVERED_CHARGES_MAX],
    avarageMedicareChargesFilter: [1, AVARAGE_MEDICARE_CHARGES_MAX],
    stateFilter: '',
    currentPage: 1
  };

  /**
   * Helper for typescript
   */
  updateFilterTypeHelper = debounce(
    200,
    (key: keyof IState, value: IRangeFilterValue) => (
      prevState: IState
    ): IState => {
      console.log('CCCCC');
      return {
        ...prevState,
        [key]: value,
        // go back to first page when query parameters change
        currentPage: 1
      };
    }
  );

  handleUpdateRangeFilter = (
    filterName: IRangeFilters,
    value: IRangeFilterValue
  ) => this.setState(this.updateFilterTypeHelper(filterName, value));

  handleUpdateStateFilter = (value: string) =>
    this.setState({
      stateFilter: value,
      // go back to first page when query parameters change
      currentPage: 1
    });

  handleChangePage = (page: number) =>
    this.setState({
      currentPage: page
    });

  public render() {
    const {
      dischargesFilter,
      avarageCoveredChargesFilter,
      avarageMedicareChargesFilter,
      stateFilter,
      currentPage
    } = this.state;

    return (
      <Search
        dischargesFilter={dischargesFilter}
        avarageCoveredChargesFilter={avarageCoveredChargesFilter}
        avarageMedicareChargesFilter={avarageMedicareChargesFilter}
        stateFilter={stateFilter}
        handleUpdateRangeFilter={this.handleUpdateRangeFilter}
        handleUpdateStateFilter={this.handleUpdateStateFilter}
        handleChangePage={this.handleChangePage}
        currentPage={currentPage}
      />
    );
  }
}
