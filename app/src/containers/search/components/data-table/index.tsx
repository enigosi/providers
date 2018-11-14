import * as React from 'react';
import { Table, Pagination } from 'antd';
import { debounce } from 'lodash/fp';
import { IProvider } from '../../types';
import DataTableMobile from '../data-table-mobile';
import { COLUMNS, RESULTS_PER_PAGE } from '../../consts';

const LARGE_ENOUGH_FOR_TABLE_SCREEN_SIZE = 1400;

interface IProps {
  providers: IProvider[];
  totalItms?: number;
  handleChangePage: (page: number) => void;
  currentPage: number;
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
    const { providers, totalItms, handleChangePage, currentPage } = this.props;
    const { isLargeEnoughForTable } = this.state;
    return (
      <div>
        {isLargeEnoughForTable ? (
          <Table
            size="small"
            dataSource={providers}
            columns={COLUMNS}
            rowKey="Id"
            pagination={false}
          />
        ) : (
          <DataTableMobile providers={providers} />
        )}
        <Pagination
          current={currentPage}
          total={totalItms || 0}
          onChange={handleChangePage}
          pageSize={RESULTS_PER_PAGE}
        />
      </div>
    );
  }
}
