import * as React from 'react';
import { Slider, Row } from 'antd';
import { SliderValue } from 'antd/lib/slider';

interface IState {
  inputValue: [number, number];
}
export default class IntegerStep extends React.Component {
  state: IState = {
    inputValue: [1, 1000]
  };

  onChange = (value: SliderValue) => {
    console.log(value);

    this.setState({
      inputValue: value
    });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <Row>
        <h3>FIlter:</h3>
        <h4>Number of Total Discharges:</h4>
        <Slider
          range
          defaultValue={[20, 50]}
          onChange={this.onChange}
          min={1}
          value={inputValue}
          max={1000}
        />
        <h4>Average Covered Charges:</h4>
      </Row>
    );
  }
}
