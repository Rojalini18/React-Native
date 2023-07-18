import React from 'react';
import {Svg, Circle, Path} from 'react-native-svg';

type IPieChart = {
  chartColourPercentage: number;
};

const PieChart = ({chartColourPercentage}: IPieChart) => {
  const radius = 100;
  const chartColor = chartColourPercentage / 100;

  return (
    <Svg width={200} height={200} testID="svg-element">
      <Circle
        cx={100}
        cy={100}
        r={radius}
        fill="#ee1c25"
        testID="circle-element"
      />
      <Path
        testID="path-element"
        d={`M ${100} ${100} L ${100} 0 A ${radius} ${radius} 0 ${
          chartColor > 0.5 ? 1 : 0
        } 1 ${100 + radius * Math.sin(2 * Math.PI * chartColor)} ${
          100 - radius * Math.cos(2 * Math.PI * chartColor)
        } Z`}
        fill="#00bc22"
        transform={`rotate(-90 ${100} ${100})`}
      />
    </Svg>
  );
};

export default PieChart;
