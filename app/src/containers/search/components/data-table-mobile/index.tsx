import * as React from 'react';
import { IProvider } from '../../types';
import { COLUMNS } from '../data-table';
import './data-table-mobile.css';

interface IProps {
  providers: IProvider[];
}

export default class DataTableMobile extends React.Component<IProps> {
  render() {
    const { providers } = this.props;

    return (
      <div>
        {providers.map(provider => (
          <table className="provider-data" key={provider.Id}>
            <tbody>
              {COLUMNS.map(column => (
                <tr
                  className="provider-data__row"
                  key={column.dataIndex as string}
                >
                  <th className="provider-data__label">{column.title}:</th>
                  <td className="provider-data__value">
                    {provider[column.dataIndex as string]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    );
  }
}
