import * as React from 'react';
// import Loader from '../../components/loader';
import Search from './search';
import axios from 'axios';
import { IFilters, IProvider } from './types';

const DISCHARGES_MAX = 1000;
const AVARAGE_COVERED_CHARGES_MAX = 1000;
const AVARAGE_MEDICARE_CHARGES_MAX = 1000;

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
}

type RangeFilterValue = [number, number];

type RangeFilters =
  | 'avarageCoveredChargesFilter'
  | 'avarageCoveredChargesFilter'
  | 'avarageMedicareChargesFilter';

export default class SearchContainer extends React.Component<{}, IState> {
  state: IState = {
    providers: [],
    dischargesFilter: [1, DISCHARGES_MAX],
    avarageCoveredChargesFilter: [1, AVARAGE_COVERED_CHARGES_MAX],
    avarageMedicareChargesFilter: [1, AVARAGE_MEDICARE_CHARGES_MAX],
    stateFilter: ''
  };

  /**
   * Helper for typescript
   */
  updateFilterTypeHelper = (key: keyof IState, value: RangeFilterValue) => (
    prevState: IState
  ): IState => ({
    ...prevState,
    [key]: value
  });

  handleUpdateRangeFilter = (
    filterName: RangeFilters,
    value: RangeFilterValue
  ) => this.updateFilterTypeHelper(filterName, value);

  handleUpdateStateFilter = (value: string) =>
    this.setState({ stateFilter: value });

  async componentDidMount() {
    try {
      const response = await axios.get(
        'https://codingchalangeapi.now.sh/providers'
      );

      if (response.status >= 400) {
        this.setState({ errorStatus: 'Error fetching groceries' });
      } else {
        // response.then(data => {
        //   console.log('data', data);

        this.setState({ providers: response.data });
        // });
      }
    } catch (e) {
      console.log(e);
    }
  }

  public render() {
    const {
      providers,
      dischargesFilter,
      avarageCoveredChargesFilter,
      avarageMedicareChargesFilter,
      stateFilter
    } = this.state;

    return (
      <Search
        providers={providers}
        dischargesFilter={dischargesFilter}
        avarageCoveredChargesFilter={avarageCoveredChargesFilter}
        avarageMedicareChargesFilter={avarageMedicareChargesFilter}
        stateFilter={stateFilter}
      />
    );
  }
}
