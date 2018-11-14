import * as React from 'react';
import { debounce, mapValues } from 'lodash/fp';
import Search from './search';
import { IFilters, IProvider, IRangeFilterValue, IRangeFilters } from './types';
import {
  DISCHARGES_MAX,
  AVARAGE_COVERED_CHARGES_MAX,
  AVARAGE_MEDICARE_CHARGES_MAX,
  FIELD_QUERY_PARAM_LABELS
} from './consts';
import './style.css';
import { stringsToHashMap } from './helpers';

interface IState
  extends Pick<
    IFilters,
    | 'dischargesFilter'
    | 'avarageCoveredChargesFilter'
    | 'avarageMedicareChargesFilter'
    | 'stateFilter'
    | 'fieldsSelection'
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
    currentPage: 1,
    // initiate with all values set to true
    fieldsSelection: mapValues(() => true, FIELD_QUERY_PARAM_LABELS)
  };

  /**
   * Helper for typescript
   */
  updateFilterTypeHelper = debounce(
    200,
    (key: keyof IState, value: IRangeFilterValue) => (
      prevState: IState
    ): IState => ({
      ...prevState,
      [key]: value,
      // go back to first page when query parameters change
      currentPage: 1
    })
  );

  /**
   * Handler for Ant Design range slider
   */
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

  /**
   * Handler fot changing pagination state
   */
  handleChangePage = (page: number) =>
    this.setState({
      currentPage: page
    });

  /**
   * Handler update coming from Ant Design Checkbox.Grupe
   */
  handleFieldsSelectionUpdate = (trueValues: string[]) =>
    this.setState({
      fieldsSelection: {
        // set all fields to false
        ...mapValues(() => false, FIELD_QUERY_PARAM_LABELS),
        // replace selected ones with truth,
        ...stringsToHashMap(trueValues, true)
      }
    });

  public render() {
    const {
      dischargesFilter,
      avarageCoveredChargesFilter,
      avarageMedicareChargesFilter,
      stateFilter,
      currentPage,
      fieldsSelection
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
        fieldsSelection={fieldsSelection}
        handleFieldsSelectionUpdate={this.handleFieldsSelectionUpdate}
      />
    );
  }
}
