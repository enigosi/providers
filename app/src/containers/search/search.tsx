import { Layout, Row, Col, Spin, Tag } from 'antd';
import * as React from 'react';
import { get } from 'lodash/fp';
import { connect } from 'react-refetch';
import Filters from './components/filter';
import {
  IFilters,
  IProvider,
  PromiseState,
  IRangeFilterValue,
  IRangeFilters
} from './types';
import DataTable from './components/data-table';
import buildQueryParametersFromFilters from './build-query-parameters';
import ENV_VARS from '../../env-vars';

export interface IProps
  extends Pick<
    IFilters,
    | 'dischargesFilter'
    | 'avarageCoveredChargesFilter'
    | 'avarageMedicareChargesFilter'
    | 'stateFilter'
    | 'fieldsSelection'
  > {
  providersFetch: PromiseState<IProvider[]>;
  handleUpdateRangeFilter: (
    filterName: IRangeFilters,
    value: IRangeFilterValue
  ) => void;
  handleUpdateStateFilter: (value: string) => void;
  handleChangePage: (page: number) => void;
  currentPage: number;
  handleFieldsSelectionUpdate: (trueValues: string[]) => void;
}

class Search extends React.Component<IProps> {
  public render() {
    const {
      providersFetch,
      handleUpdateRangeFilter,
      handleUpdateStateFilter,
      dischargesFilter,
      avarageCoveredChargesFilter,
      avarageMedicareChargesFilter,
      stateFilter,
      handleChangePage,
      currentPage,
      fieldsSelection,
      handleFieldsSelectionUpdate
    } = this.props;

    // get total number of items for current query
    const headers = get('meta.response.headers', providersFetch);
    const totalItms = headers && headers.get('x-total-count');

    return (
      <Layout>
        <Row>
          <Col sm={8} lg={6} x-lg={5} style={{ padding: 15 }}>
            <Filters
              handleUpdateStateFilter={handleUpdateStateFilter}
              handleUpdateRangeFilter={handleUpdateRangeFilter}
              stateFilter={stateFilter}
              avarageMedicareChargesFilter={avarageMedicareChargesFilter}
              avarageCoveredChargesFilter={avarageCoveredChargesFilter}
              dischargesFilter={dischargesFilter}
              fieldsSelection={fieldsSelection}
              handleFieldsSelectionUpdate={handleFieldsSelectionUpdate}
            />
          </Col>
          <Col sm={16} lg={18} x-lg={19} style={{ padding: 15 }}>
            <Layout.Content>
              {providersFetch.pending && (
                <div className="spin-wrapper">
                  <Spin tip="Loading..." size="large" />
                </div>
              )}
              {providersFetch.rejected && (
                <Tag color="red">
                  Error! {get('reason.message', providersFetch) || ''}
                </Tag>
              )}
              {providersFetch.fulfilled && (
                <DataTable
                  currentPage={currentPage}
                  providers={providersFetch.value}
                  totalItms={totalItms ? parseInt(totalItms, 10) : undefined}
                  handleChangePage={handleChangePage}
                  fieldsSelection={fieldsSelection}
                />
              )}
            </Layout.Content>
          </Col>
        </Row>
      </Layout>
    );
  }
}

/**
 * Decorate component with react-refetch connect. Will refetch data on each url update
 */
export default connect((props: IProps) => ({
  providersFetch: `${
    ENV_VARS.API_URL
  }/providers${buildQueryParametersFromFilters(props)}`
}))(Search);
