import * as React from 'react';
import { Slider, Row, Input } from 'antd';
import { IFilters, IRangeFilterValue } from '../../types';
import {
  DISCHARGES_MAX,
  AVARAGE_COVERED_CHARGES_MAX,
  AVARAGE_MEDICARE_CHARGES_MAX
} from '../../consts';
import { IProps as SearchContainerProps } from '../../search';

interface IProps
  extends Pick<
      IFilters,
      | 'dischargesFilter'
      | 'avarageCoveredChargesFilter'
      | 'avarageMedicareChargesFilter'
      | 'stateFilter'
    >,
    Pick<
      SearchContainerProps,
      'handleUpdateRangeFilter' | 'handleUpdateStateFilter'
    > {}

export default class IntegerStep extends React.Component<IProps> {
  render() {
    const { handleUpdateRangeFilter, handleUpdateStateFilter } = this.props;
    return (
      <Row>
        <h3>Filter:</h3>
        <div className="spacer" />
        <h4>State</h4>
        <Input.Search
          placeholder="Provider State"
          onSearch={handleUpdateStateFilter}
          enterButton
        />
        <div className="spacer" />
        <h4>Number of Total Discharges:</h4>
        <Slider
          range
          defaultValue={[1, DISCHARGES_MAX]}
          onChange={(value: IRangeFilterValue) =>
            handleUpdateRangeFilter('dischargesFilter', value)
          }
          min={1}
          max={DISCHARGES_MAX}
        />
        <div className="spacer" />
        <h4>Average Covered Charges:</h4>
        <Slider
          range
          defaultValue={[1, AVARAGE_COVERED_CHARGES_MAX]}
          onChange={(value: IRangeFilterValue) =>
            handleUpdateRangeFilter('avarageCoveredChargesFilter', value)
          }
          min={1}
          max={AVARAGE_COVERED_CHARGES_MAX}
        />
        <div className="spacer" />
        <h4>Average Medicare Charges:</h4>
        <Slider
          range
          defaultValue={[1, AVARAGE_MEDICARE_CHARGES_MAX]}
          onChange={(value: IRangeFilterValue) =>
            handleUpdateRangeFilter('avarageMedicareChargesFilter', value)
          }
          min={1}
          max={AVARAGE_MEDICARE_CHARGES_MAX}
        />
      </Row>
    );
  }
}
