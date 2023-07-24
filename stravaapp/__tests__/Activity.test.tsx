import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {render, waitFor} from '@testing-library/react-native';
import Activity from '../Pages/Activity';
import axios from 'axios';

jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage');
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest
    .fn()
    .mockResolvedValue('323df7d34ead1aa4ec9baf06b37c6da024ba980a'),
}));

describe('Activity', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('it should navigates to Login screen when access_token is null', async () => {
    const navigateMock = jest.fn();
    AsyncStorage.getItem.mockResolvedValueOnce(null);

    const {rerender} = render(<Activity navigation={{navigate: jest.fn()}} />);
    await waitFor(() => expect(AsyncStorage.getItem).toBeCalledTimes(1));
    expect(navigateMock).toBeCalledWith('Login');
  });

  it('it should sets error to true and logs the error message when API call fails', async () => {
    const error = new Error('API error');
    axios.get.mockRejectedValueOnce(error);

    const consoleSpy = jest.spyOn(console, 'log');
    render(<Activity navigation={{navigate: jest.fn()}} />);
    await waitFor(() => expect(consoleSpy).toHaveBeenCalledWith('err', error));
    consoleSpy.mockRestore();
  });

  it('should render the ScrollView with data', () => {
    const data = [
      {
        name: 'Activity 1',
        sport_type: 'Run',
        distance: '5 km',
        average_speed: '10 km/h',
        max_speed: '15 km/h',
      },
    ];

    const {getAllByTestId} = render(
      <ScrollView>
        {data.map((el, index) => (
          <View
            key={index}
            style={{
              flex: 1,
              width: 350,
              backgroundColor: 'whitesmoke',
              borderRadius: 2,
              borderWidth: 1,
              marginTop: 5,
              marginBottom: 5,
              padding: 10,
              gap: 2,
            }}
            testID="scrollView">
            <Text style={{color: 'black', fontSize: 15}}>Name: {el.name}</Text>
            <Text style={{color: 'black', fontSize: 15}}>
              Sports Type: {el.sport_type}
            </Text>
            <Text style={{color: 'black', fontSize: 15}}>
              Distance: {el.distance}
            </Text>
            <Text style={{color: 'black', fontSize: 15}}>
              Average Speed: {el.average_speed}
            </Text>
            <Text style={{color: 'black', fontSize: 15}}>
              Max Speed: {el.max_speed}
            </Text>
          </View>
        ))}
      </ScrollView>,
    );

    const scrollView = getAllByTestId('scrollView');
    expect(scrollView.length).toBe(1);
  });

  it('should display activity data when loading is false', async () => {
    const mockData = [
      {
        name: 'Activity 1',
        sport_type: 'Running',
        distance: 5,
        average_speed: 10,
        max_speed: 15,
      },
      {
        name: 'Activity 2',
        sport_type: 'Cycling',
        distance: 10,
        average_speed: 20,
        max_speed: 25,
      },
    ];

    axios.get.mockResolvedValueOnce({data: mockData});
    const {getByText} = render(<Activity navigation={{navigate: jest.fn()}} />);
    await waitFor(() => expect(getByText('Name: Activity 1')).toBeTruthy());
    expect(getByText('Name: Activity 2')).toBeTruthy();
  });
});
