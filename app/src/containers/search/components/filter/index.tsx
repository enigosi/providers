import * as React from 'react';
import { flow, toPairs, map } from 'lodash/fp';
import { Slider, Row, Input, Checkbox } from 'antd';
import { IFilters, IRangeFilterValue } from '../../types';
import {
  DISCHARGES_MAX,
  AVARAGE_COVERED_CHARGES_MAX,
  AVARAGE_MEDICARE_CHARGES_MAX,
  FIELD_QUERY_PARAM_LABELS
} from '../../consts';
import { IProps as SearchContainerProps } from '../../search';
import { getKeysWithTruthyValues } from '../../helpers';

interface IProps
  extends Pick<
      IFilters,
      | 'dischargesFilter'
      | 'avarageCoveredChargesFilter'
      | 'avarageMedicareChargesFilter'
      | 'stateFilter'
      | 'fieldsSelection'
    >,
    Pick<
      SearchContainerProps,
      | 'handleUpdateRangeFilter'
      | 'handleUpdateStateFilter'
      | 'handleFieldsSelectionUpdate'
    > {}

export default class IntegerStep extends React.Component<IProps> {
  render() {
    const {
      handleUpdateRangeFilter,
      handleUpdateStateFilter,
      fieldsSelection,
      handleFieldsSelectionUpdate
    } = this.props;
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
        <div className="spacer" />
        <h4>Select display columns:</h4>
        <Checkbox.Group
          options={fieldsToCheckboxGroupOptions(FIELD_QUERY_PARAM_LABELS)}
          value={getKeysWithTruthyValues(fieldsSelection)}
          onChange={handleFieldsSelectionUpdate}
        />
      </Row>
    );
  }
}

const fieldsToCheckboxGroupOptions = flow([
  toPairs,
  map(pair => ({
    label: pair[1],
    value: pair[0]
  }))
]);
