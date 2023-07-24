import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import PlaylistTracks from '../Pages/PlaylistTracks';

describe('PlaylistTracks', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the list of tracks correctly', async () => {
    const tracks = [
      {
        id: 'track1',
        name: 'Track 1',
        artists: 'Artist 1',
        album: {
          images: [{url: 'https://example.com/track1.jpg'}],
        },
      },
    ];

    const {getByTestId} = render(
      <PlaylistTracks navigation={mockNavigation} route={{params: {tracks}}} />,
    );

    const track1Name = getByTestId('Track 1');
    expect(track1Name).toBeTruthy();

    const track1Image = getByTestId('trackImage-track1');
    expect(track1Image.props.source.uri).toBe('https://example.com/track1.jpg');
  });

  it('should navigate to SongPlayerScreen when a track is pressed', async () => {
    const tracks = [
      {
        id: 'track1',
        name: 'Track 1',
        artists: 'Artist 1',
        album: {
          images: [{url: 'https://example.com/track1.jpg'}],
        },
      },
    ];

    const {getByText} = render(
      <PlaylistTracks navigation={mockNavigation} route={{params: {tracks}}} />,
    );

    const track1Name = getByText('Track 1');
    fireEvent.press(track1Name);

    await new Promise(resolve => setTimeout(resolve, 100));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('SongPlayerScreen', {
      track: tracks[0],
    });
  });
});
