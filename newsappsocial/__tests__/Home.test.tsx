import React from 'react';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import Voice from '@react-native-community/voice';
import Home from '../Pages/Home';
import axios from 'axios';

jest.mock('axios');
const navigate = jest.fn();

jest.mock('@react-native-community/voice', () => {
  return {
    start: jest.fn(),
    stop: jest.fn(),
    destroy: jest.fn().mockResolvedValue(0),
    onSpeechStart: jest.fn(),
    onSpeechEnd: jest.fn(),
    onSpeechResults: jest.fn(),
    onSpeechError: jest.fn(),
    onSpeechVolumeChanged: jest.fn(),
    removeAllListeners: jest.fn(),
  };
});

jest.mock('react-native-modal', () => {
  const Modal = ({isVisible, children}: any) => {
    return isVisible ? <>{children}</> : null;
  };
  return Modal;
});

describe('Home', () => {
  it('renders the component', () => {
    const {getByPlaceholderText, getByText} = render(<Home />);

    const searchInput = getByPlaceholderText('Type Something...');
    expect(searchInput).toBeTruthy();

    const searchButton = getByText('Search');
    expect(searchButton).toBeTruthy();
  });

  it('fires the handleSearch function when the search button is pressed', () => {
    const {getByText, getByPlaceholderText} = render(<Home />);
    const searchInput = getByPlaceholderText('Type Something...');

    fireEvent.changeText(searchInput, 'example');
    fireEvent.press(getByText('Search'));
  });

  it('stops voice recognition on stop button click', () => {
    const {getByText, getByTestId} = render(<Home />);
    const voiceButton = getByText('Voice');

    fireEvent.press(voiceButton);

    const stopButton = getByTestId('search-stop-button');
    fireEvent.press(stopButton);
  });
  it('fetches news articles and sets them in state', async () => {
    const mockedResponse = {
      data: {
        articles: [
          {
            title: 'Article 1',
            description: 'Description 1',
            urlToImage: 'image-url-1',
            source: {name: 'Source 1'},
          },
          {
            title: 'Article 2',
            description: 'Description 2',
            urlToImage: 'image-url-2',
            source: {name: 'Source 2'},
          },
        ],
      },
    };
    axios.get.mockResolvedValueOnce(mockedResponse);

    const {getByText, getByPlaceholderText} = render(
      <Home navigation={{navigate: jest.fn()}} />,
    );

    const searchInput = getByPlaceholderText('Type Something...');
    fireEvent.changeText(searchInput, 'hello');

    const searchButton = getByText('Search');
    fireEvent.press(searchButton);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'https://newsapi.org/v2/everything?q=hello&apiKey=d670eac6fb694a389f73c2e39524bb9b',
      );
    });
  });

  it('should set up event listeners and clean up on unmount', () => {
    const {unmount} = render(<Home />);

    expect(Voice.onSpeechStart).not.toBeNull();
    expect(Voice.onSpeechEnd).not.toBeNull();
    expect(Voice.onSpeechResults).not.toBeNull();
    expect(Voice.onSpeechError).not.toBeNull();
    expect(Voice.onSpeechVolumeChanged).not.toBeNull();

    Voice.onSpeechStart();
    Voice.onSpeechEnd();

    const spokenText = 'example query';
    Voice.onSpeechResults({value: [spokenText]});
    Voice.onSpeechError({});
    Voice.onSpeechVolumeChanged({value: 0.5});

    unmount();
  });
});
