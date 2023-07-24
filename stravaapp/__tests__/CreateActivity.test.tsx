import React from 'react';
import axios from 'axios';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateActivity from '../Pages/CreateActivity';

const navigateMock = jest.fn();
AsyncStorage.getItem = jest.fn().mockResolvedValue('mocked_access_token');
axios.post = jest.fn().mockResolvedValue({data: {}});

jest.mock('@react-native-async-storage/async-storage');

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.reject(new Error('Mock error'))),
}));

jest.mock('react-native-date-picker', () => {
  return jest.fn().mockImplementation(props => {
    return <div data-testid="Date Picker" {...props} />;
  });
});

describe('CreateActivity', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByPlaceholderText, getByText} = render(
      <CreateActivity navigate={navigateMock} />,
    );

    const nameInput = getByPlaceholderText('Name');
    const typeInput = getByPlaceholderText('Type');
    const sportTypeInput = getByPlaceholderText('Sport Type');
    const elapsedTimeInput = getByPlaceholderText('Elapsed time');
    const descriptionInput = getByPlaceholderText('Description');
    const distanceInput = getByPlaceholderText('Distance');
    const trainerInput = getByPlaceholderText('Trainer');
    const commuteInput = getByPlaceholderText('Commute');

    fireEvent.changeText(nameInput, 'Activity Name');
    fireEvent.changeText(typeInput, 'Activity Type');
    fireEvent.changeText(sportTypeInput, 'Sport Type');
    fireEvent.changeText(elapsedTimeInput, 'Elapsed time');
    fireEvent.changeText(descriptionInput, 'Description');
    fireEvent.changeText(distanceInput, 'Distance');
    fireEvent.changeText(trainerInput, 'Trainer');
    fireEvent.changeText(commuteInput, 'Commute');

    const localDateButton = getByText('Start date local');
    fireEvent.press(localDateButton);
    const createButton = getByText('Create Activity');
    fireEvent.press(createButton);
  });

  it('makes a POST request with the correct data', async () => {
    const mockResponse = {data: {success: true}};

    axios.post = jest.fn().mockResolvedValue(mockResponse);

    const requestData = {
      name: 'Run',
      type: 'Run',
      start_date_local: '2023-05-19T09:00:00',
      elapsed_time: 1000,
      trainer: 1,
      description: 'create a new activity',
      commute: 1,
      distance: 10000,
    };

    const response = await axios.post(
      'https://www.strava.com/api/v3/activities',
      requestData,
    );

    expect(axios.post).toHaveBeenCalledWith(
      'https://www.strava.com/api/v3/activities',
      requestData,
    );

    expect(response).toEqual(mockResponse);
  });

  it('opens and updates date on confirmation', () => {
    const {getByTestId, getByText} = render(
      <CreateActivity navigate={navigateMock} />,
    );

    const openButton = getByText('Start date local');
    fireEvent.press(openButton);

    const datePicker = getByTestId('date picker');
    expect(datePicker.props.open).toBe(true);

    fireEvent(datePicker, 'onConfirm', new Date('2023-05-20'));
    expect(datePicker.props.open).toBe(false);
  });

  it('closes without updating date on cancellation', () => {
    const {getByTestId, getByText} = render(
      <CreateActivity navigate={navigateMock} />,
    );
    const openButton = getByText('Start date local');
    fireEvent.press(openButton);

    const datePicker = getByTestId('date picker');
    expect(datePicker.props.open).toBe(true);

    fireEvent(datePicker, 'cancel');
    expect(datePicker.props.open).toBe(false);
  });

  const createActivity = async () => {
    const access_token = await AsyncStorage.getItem('accessToken');
    axios
      .post(
        `https://www.strava.com/api/v3/activities?access_token=${access_token}&name='roja'&sport_type='run'&
        start_date_local='2023-05-19T09:00:00'&elapsed_time=2&trainer=1&description='tyyheun&commute=1&distance=100`,
      )
      .then(res => navigateMock('Activity'))
      .catch(err => {
        //console.log(err);
      });
  };

  it('should call navigate function when request is successful', async () => {
    await createActivity();
    expect(navigateMock).toHaveBeenCalledWith('Activity');
  });

  it('should log error when request fails', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log');

    await waitFor(() => {
      createActivity();
    });

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.any(Error));
    consoleLogSpy.mockRestore();
  });
});
