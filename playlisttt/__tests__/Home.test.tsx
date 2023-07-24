import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authorize} from 'react-native-app-auth';
import Home from '../Pages/Home';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('react-native-app-auth', () => ({
  authorize: jest.fn(),
}));

const navigationMock = {
  navigate: jest.fn(),
};

describe('Home', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('should render the "Login with Spotify" button', () => {
    const {getByText} = render(<Home />);
    expect(getByText('Login with Spotify')).toBeTruthy();
  });

  it('calls authorize function and navigates to Playlist when successful', async () => {
    authorize.mockResolvedValue({
      accessToken: 'fakeAccessToken',
      refreshToken: 'fakeRefreshToken',
    });

    const {getByText} = render(<Home navigation={navigationMock} />);

    fireEvent.press(getByText('Login with Spotify'));

    await new Promise(r => setTimeout(r, 0));

    expect(authorize).toHaveBeenCalledWith({
      clientId: '348e7c5f28da4e8f8c74c6e75d43bd15',
      clientSecret: '66fe37994ae644b892b5b8fe05e08d28',
      redirectUrl: 'com.playlisttt:/oauth',
      scopes: [
        'user-read-email',
        'playlist-modify-public',
        'user-read-private',
        'playlist-read-private',
        'playlist-read-collaborative',
      ],
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
      },
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'token',
      'fakeAccessToken',
    );
    expect(navigationMock.navigate).toHaveBeenCalledWith('Playlist');
  });

  it('navigates to Playlist when token exists', async () => {
    AsyncStorage.getItem.mockResolvedValue('fakeAccessToken');

    render(<Home navigation={navigationMock} />);
    await waitFor(() => {
      expect(navigationMock.navigate).toHaveBeenCalledWith('Playlist');
    });
  });

  it('logs error message when authorization fails', async () => {
    authorize.mockRejectedValue(new Error('Authorization error'));

    const {getByText} = render(<Home navigation={navigationMock} />);

    fireEvent.press(getByText('Login with Spotify'));

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith(
        'Authorization error:',
        expect.any(Error),
      );
    });
  });

  it('logs error message when authorization fails', async () => {
    authorize.mockResolvedValue({});

    const {getByText} = render(<Home navigation={navigationMock} />);
    fireEvent.press(getByText('Login with Spotify'));

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith(
        'Access token not found in authorization response.',
      );
    });
  });
});
