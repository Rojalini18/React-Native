import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {act, create} from 'react-test-renderer';
import {Linking} from 'react-native';
import Login from '../Pages/Login';
import axios from 'axios';

jest.mock('axios');
jest.useFakeTimers();
const navigateMock = jest.fn();

describe('Login', () => {
  it('should call handleAuth when Log In button is pressed', () => {
    const {getByTestId} = render(<Login navigation={{navigate: jest.fn()}} />);
    const button = getByTestId('submitButton');
    fireEvent.press(button);
  });

  it('should handle authorization catch error', async () => {
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

    const mockAuthorize = jest.requireMock('react-native-app-auth').authorize;
    mockAuthorize.mockImplementation(() => {
      throw new Error('Authorization failed');
    });

    const {getByTestId} = render(<Login navigation={{navigate: jest.fn()}} />);
    const button = getByTestId('submitButton');

    fireEvent.press(button);

    await waitFor(() => {
      expect(mockAuthorize).toHaveBeenCalled();
    });

    expect(mockConsoleLog).toHaveBeenCalledWith(
      new Error('Authorization failed'),
    );

    mockConsoleLog.mockRestore();
  });

  it('navigates to Activity screen when access_token is not null', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(
      '323df7d34ead1aa4ec9baf06b37c6da024ba980a',
    );

    let root;
    await act(async () => {
      root = create(<Login navigation={{navigate: jest.fn()}} />);
    });
    await waitFor(() => {});
    expect(navigateMock).toHaveBeenCalledWith('Activity');
  });

  it('navigates to "Activity" after 1000ms if access token is not null', async () => {
    const {getByText} = render(<Login navigation={{navigate: jest.fn()}} />);

    fireEvent.press(getByText('Log In'));
    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('Activity');
    });
  });

  it('registers event listener and handles initial URL with code', async () => {
    const axiosPostMock = jest.spyOn(axios, 'post').mockResolvedValueOnce({
      data: {
        expires_at: 'mocked-expires-at',
        access_token: 'mocked-access-token',
      },
    });
    const AsyncStorageSetItemMock = jest.spyOn(AsyncStorage, 'setItem');

    const initialURL =
      'https://www.example.com?param1=value1&code=mocked-code&param2=value2';

    Linking.getInitialURL.mockResolvedValueOnce(initialURL);

    const {unmount} = render(<Login navigation={{navigate: jest.fn()}} />);

    expect(Linking.addEventListener).toHaveBeenCalledWith(
      'url',
      expect.any(Function),
    );

    await Promise.resolve();

    expect(axiosPostMock).toHaveBeenCalledWith(
      'https://www.strava.com/oauth/token',
      {
        client_id: '107403',
        client_secret: '221e7b9c2ce92e5ef4de740b22d9eef422180c5d',
        code: 'mocked-code',
        grant_type: 'authorization_code',
      },
    );

    expect(AsyncStorageSetItemMock).toHaveBeenCalledWith(
      'expiresAt',
      'mocked-expires-at',
    );
    expect(AsyncStorageSetItemMock).toHaveBeenCalledWith(
      'accessToken',
      'mocked-access-token',
    );

    expect(navigateMock).toHaveBeenCalledWith('Activity');

    unmount();
    expect(Linking.removeEventListener).toHaveBeenCalledWith(
      'url',
      expect.any(Function),
    );
  });

  it('handles error during API request', async () => {
    const axiosPostMock = jest
      .spyOn(axios, 'post')
      .mockRejectedValueOnce(new Error('API error'));
    const consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const initialURL =
      'https://www.example.com?param1=value1&code=mocked-code&param2=value2';
    Linking.getInitialURL.mockResolvedValueOnce(initialURL);
    const {unmount} = render(<Login navigation={{navigate: jest.fn()}} />);

    await Promise.resolve();

    expect(axiosPostMock).toHaveBeenCalledWith(
      'https://www.strava.com/oauth/token',
      {
        client_id: '107403',
        client_secret: '221e7b9c2ce92e5ef4de740b22d9eef422180c5d',
        code: 'mocked-code',
        grant_type: 'authorization_code',
      },
    );

    expect(consoleErrorMock).toHaveBeenCalledWith(new Error('API error'));
    unmount();
  });
});
