import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import Playlist from '../Pages/Playlist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

jest.mock('axios');

const navigationMock = {
  navigate: jest.fn(),
};

describe('Playlist', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays playlists correctly', async () => {
    AsyncStorage.getItem.mockResolvedValue('fakeAccessToken');

    axios.get.mockResolvedValue({
      data: {
        items: [
          {id: 'playlist1', name: 'Playlist 1'},
          {id: 'playlist2', name: 'Playlist 2'},
        ],
      },
    });

    const {findByText} = render(<Playlist navigation={navigationMock} />);

    await waitFor(async () => {
      const playlist1 = await findByText('Playlist 1');
      const playlist2 = await findByText('Playlist 2');
      expect(playlist1).toBeTruthy();
      expect(playlist2).toBeTruthy();
    });
  });

  it('fetches and navigates to playlist tracks correctly', async () => {
    AsyncStorage.getItem.mockResolvedValue('fakeAccessToken');

    axios.get
      .mockResolvedValueOnce({
        data: {
          items: [
            {id: 'playlist1', name: 'Playlist 1'},
            {id: 'playlist2', name: 'Playlist 2'},
          ],
        },
      })
      .mockResolvedValueOnce({
        data: {
          items: [
            {
              track: {
                id: 'track1',
                name: 'Track 1',
                artists: [{name: 'Artist 1'}],
              },
            },
            {
              track: {
                id: 'track2',
                name: 'Track 2',
                artists: [{name: 'Artist 2'}],
              },
            },
          ],
        },
      });

    const {getByText} = render(<Playlist navigation={navigationMock} />);

    await waitFor(async () => {
      const playlist1 = await getByText('Playlist 1');
      fireEvent.press(playlist1);
    });

    await waitFor(async () => {
      expect(axios.get).toHaveBeenCalledWith(
        'https://api.spotify.com/v1/playlists/playlist1/tracks',
        expect.anything(),
      );

      expect(navigationMock.navigate).toHaveBeenCalledWith('PlaylistTracks', {
        tracks: [
          {
            id: 'track1',
            name: 'Track 1',
            artists: 'Artist 1',
            preview_url: null,
            album: undefined,
          },
          {
            id: 'track2',
            name: 'Track 2',
            artists: 'Artist 2',
            preview_url: null,
            album: undefined,
          },
        ],
      });
    });
  });
});
