import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import axios from 'axios';
import Capital from '../Pages/Capital';

jest.mock('axios');

describe('Capital', () => {
  it('should fetches weather data and displays it correctly', async () => {
    const response = {
      data: {
        current: {
          temperature: 25,
          weather_icons: ['https://example.com/weather-icon.png'],
          wind_speed: 10,
          precip: 5,
        },
      },
    };

    axios.get.mockResolvedValue(response);

    const route = {params: {capital: 'Washington, D.C.'}};
    const {getByText, getByTestId} = render(<Capital route={route} />);

    await waitFor(() => {
      expect(getByText('Temperature: 25')).toBeDefined();
      expect(getByText('Wind Speed: 10')).toBeDefined();
      expect(getByText('Precip: 5')).toBeDefined();

      const weatherIcon = getByTestId('weather-icon');
      expect(weatherIcon.props.source.uri).toBe(
        'https://example.com/weather-icon.png',
      );
      expect(() => getByTestId('loading')).toThrowError();
    });
  });

  it('should handles API error correctly', async () => {
    const error = new Error('API request failed');
    axios.get.mockRejectedValue(error);

    const route = {params: {capital: 'Washington, D.C.'}};
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Capital route={route} />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(error);
    });

    consoleSpy.mockRestore();
  });
});
