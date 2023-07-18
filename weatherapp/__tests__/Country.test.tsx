import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import axios from 'axios';
import Country from '../Pages/Country';

jest.mock('axios');

describe('Country', () => {
  it('should fetches country data and displays it correctly', async () => {
    const response = {
      data: [
        {
          capital: ['Washington, D.C.'],
          latlng: [38, -77],
          population: 331449281,
          flags: {png: 'https://example.com/flag.png'},
        },
      ],
    };

    axios.get.mockResolvedValue(response);

    const navigation = {navigate: jest.fn()};
    const route = {params: {country: 'United States'}};
    const {getByText, getByTestId} = render(
      <Country navigation={navigation} route={route} />,
    );

    await waitFor(() => {
      expect(getByText('Capital: Washington, D.C.')).toBeDefined();
    });
    expect(getByText('Capital: Washington, D.C.')).toBeDefined();
    expect(getByText('Population: 331449281')).toBeDefined();
    expect(getByText('Latitude: 38')).toBeDefined();
    expect(getByText('Longitude: -77')).toBeDefined();
  });

  it('should navigates to Capital screen when Capital Weather button is pressed', () => {
    const navigation = {navigate: jest.fn()};
    const route = {
      params: {
        country: 'United States',
      },
    };
    const {getByText} = render(
      <Country navigation={navigation} route={route} />,
    );
    const capitalWeatherButton = getByText('Capital Weather');

    fireEvent.press(capitalWeatherButton);

    expect(navigation.navigate).toHaveBeenCalledWith('Capital', {
      capital: 'Washington, D.C.',
    });
  });
});
