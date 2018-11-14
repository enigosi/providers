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

export interface IProps
  extends Pick<
    IFilters,
    | 'dischargesFilter'
    | 'avarageCoveredChargesFilter'
    | 'avarageMedicareChargesFilter'
    | 'stateFilter'
  > {
  providersFetch: PromiseState<IProvider[]>;
  handleUpdateRangeFilter: (
    filterName: IRangeFilters,
    value: IRangeFilterValue
  ) => void;
  handleUpdateStateFilter: (value: string) => void;
  handleChangePage: (page: number) => void;
  currentPage: number;
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
      currentPage
    } = this.props;
    console.log({
      providersFetch,
      handleUpdateRangeFilter,
      handleUpdateStateFilter,
      dischargesFilter,
      avarageCoveredChargesFilter,
      avarageMedicareChargesFilter,
      stateFilter
    });
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
            />
          </Col>
          <Col sm={16} lg={18} x-lg={19} style={{ padding: 15 }}>
            <Layout.Content>
              {providersFetch.pending && <Spin tip="Loading..." size="large" />}
              {providersFetch.rejected && (
                <Tag color="red">{providersFetch.reason}</Tag>
              )}
              {providersFetch.fulfilled && (
                <DataTable
                  currentPage={currentPage}
                  providers={providersFetch.value}
                  totalItms={totalItms ? parseInt(totalItms, 10) : undefined}
                  handleChangePage={handleChangePage}
                />
              )}
            </Layout.Content>
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default connect((props: IProps) => ({
  providersFetch: `https://codingchalangeapi.now.sh/providers${buildQueryParametersFromFilters(
    props
  )}`
}))(Search);
