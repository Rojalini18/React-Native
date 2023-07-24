import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import SongPlayerScreen from '../Pages/SongPlayerScreen';
import TrackPlayer from 'react-native-track-player';

jest.mock('react-native-track-player', () => ({
  useProgress: jest.fn(() => ({
    duration: 200,
    position: 100,
  })),
  add: jest.fn(),
  play: jest.fn(),
  pause: jest.fn(),
  seekTo: jest.fn(),
  remove: jest.fn(),
}));

describe('SongPlayerScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders track details correctly', () => {
    const track = {
      id: 'track1',
      name: 'Track 1',
      artists: 'Artist 1',
      album: {
        images: [{url: 'https://example.com/track1.jpg'}],
      },
      preview_url: 'https://example.com/track1.mp3',
    };

    const {getByText, getByTestId} = render(
      <SongPlayerScreen
        navigation={mockNavigation}
        route={{params: {track}}}
      />,
    );

    const trackName = getByText('Track 1');
    const artistName = getByText('Artist 1');
    const trackImage = getByTestId('trackImage');

    expect(trackName).toBeTruthy();
    expect(artistName).toBeTruthy();
    expect(trackImage.props.source.uri).toBe('https://example.com/track1.jpg');
  });

  it('toggles play correctly', async () => {
    const track = {
      id: 'track1',
      name: 'Track 1',
      artists: 'Artist 1',
      album: {
        images: [{url: 'https://example.com/track1.jpg'}],
      },
      preview_url: 'https://example.com/track1.mp3',
    };

    const {getByTestId} = render(
      <SongPlayerScreen
        navigation={mockNavigation}
        route={{params: {track}}}
      />,
    );

    const playPauseButton = getByTestId('playPauseButton');
    fireEvent.press(playPauseButton);

    await waitFor(() => {
      expect(TrackPlayer.play).toHaveBeenCalledTimes(1);
    });
  });

  it('toggles pause correctly', async () => {
    const track = {
      id: 'track1',
      name: 'Track 1',
      artists: 'Artist 1',
      album: {
        images: [{url: 'https://example.com/track1.jpg'}],
      },
      preview_url: 'https://example.com/track1.mp3',
    };

    const {getByTestId} = render(
      <SongPlayerScreen
        navigation={mockNavigation}
        route={{params: {track}}}
      />,
    );

    const playPauseButton = getByTestId('playPauseButton');
    fireEvent.press(playPauseButton);

    await waitFor(() => {
      expect(TrackPlayer.play).toHaveBeenCalledTimes(1);
    });

    fireEvent.press(playPauseButton);

    await waitFor(() => {
      expect(TrackPlayer.pause).toHaveBeenCalledTimes(1);
    });
  });

  it('seeks correctly', async () => {
    const track = {
      id: 'track1',
      name: 'Track 1',
      artists: 'Artist 1',
      album: {
        images: [{url: 'https://example.com/track1.jpg'}],
      },
      preview_url: 'https://example.com/track1.mp3',
    };

    const {getByTestId} = render(
      <SongPlayerScreen
        navigation={mockNavigation}
        route={{params: {track}}}
      />,
    );

    const slider = getByTestId('slider');
    fireEvent(slider, 'slidingComplete', 150);

    await new Promise(resolve => setTimeout(resolve, 100));
    expect(TrackPlayer.seekTo).toHaveBeenCalledWith(150);
  });
});
