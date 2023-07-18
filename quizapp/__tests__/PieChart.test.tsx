import React from 'react';
import {render} from '@testing-library/react-native';
import PieChart from '../Pages/PieChart';

describe('PieChart', () => {
  it('should renders correctly with given chart colour percentage', () => {
    const {getByTestId} = render(<PieChart chartColourPercentage={50} />);
    const svgElement = getByTestId('svg-element');

    expect(svgElement).toBeTruthy();
  });

  it('should renders the path element with correct dynamic path', () => {
    const chartColourPercentage = 60;
    const {getByTestId} = render(
      <PieChart chartColourPercentage={chartColourPercentage} />,
    );
    const pathElement = getByTestId('path-element');
    expect(pathElement.props.d).toBeCloseTo(1);
  });
});
