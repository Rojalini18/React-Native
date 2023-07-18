import React from 'react';
import {render} from '@testing-library/react-native';
import LoadingDots from '../Pages/LoadingDots';

describe('LoadingDots component', () => {
  it('renders each animated dot', () => {
    const speechVolume = 0.5;
    const {getByTestId} = render(<LoadingDots speechVolume={speechVolume} />);

    const dot1 = getByTestId('loading-dot-1');
    const dot2 = getByTestId('loading-dot-2');
    const dot3 = getByTestId('loading-dot-3');

    expect(dot1).toBeTruthy();
    expect(dot2).toBeTruthy();
    expect(dot3).toBeTruthy();
  });
});
