import * as React from 'react';
import { Table } from 'antd';
import { debounce } from 'lodash/fp';
import { ColumnProps } from 'antd/lib/table';
import { IProvider } from '../../types';
import DataTableMobile from '../data-table-mobile';

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

const LARGE_ENOUGH_FOR_TABLE_SCREEN_SIZE = 1400;

interface IProps {
  providers: IProvider[];
}
interface IState {
  isLargeEnoughForTable: boolean;
}

export default class DataTable extends React.Component<IProps> {
  state: IState = {
    isLargeEnoughForTable: false
  };

  debouncedHandleWindowResize = debounce(200, () =>
    this.setState({
      isLargeEnoughForTable:
        window.innerWidth >= LARGE_ENOUGH_FOR_TABLE_SCREEN_SIZE
    })
  );

  componentDidMount() {
    this.debouncedHandleWindowResize();
    window.addEventListener('resize', this.debouncedHandleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedHandleWindowResize);
  }

  render() {
    const { providers } = this.props;
    const { isLargeEnoughForTable } = this.state;

    if (isLargeEnoughForTable) {
      return (
        <Table
          size="small"
          dataSource={providers}
          columns={COLUMNS}
          rowKey="Id"
        />
      );
    }
    return <DataTableMobile providers={providers} />;
  }
}
