import { Layout, Row, Col } from 'antd';
import * as React from 'react';
// import { connect, PromiseState } from 'react-refetch';
import Filters from './components/filter';
import { IFilters, IProvider } from './types';
import DataTable from './components/data-table';

interface IProps
  extends Pick<
    IFilters,
    | 'dischargesFilter'
    | 'avarageCoveredChargesFilter'
    | 'avarageMedicareChargesFilter'
    | 'stateFilter'
  > {
  providers: IProvider[];
}

export default class Search extends React.Component<IProps> {
  public render() {
    const { providers } = this.props;
    console.log(providers);

    return (
      <Layout>
        <Layout.Header>header</Layout.Header>
        <Layout>
          <Row>
            <Col sm={8} lg={6} x-lg={5} style={{ padding: 15 }}>
              <Filters />
            </Col>
            <Col sm={16} lg={18} x-lg={19} style={{ padding: 15 }}>
              <Layout.Content>
                <DataTable providers={this.props.providers} />
              </Layout.Content>
            </Col>
          </Row>
        </Layout>
      </Layout>
    );
  }
}
