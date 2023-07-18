import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {RandomWord} from '../Pages/RandomWord';

describe('RandomWord', () => {
  it('render the page correctly', () => {
    const {getByPlaceholderText, getByText} = render(<RandomWord />);

    const searchInput = getByPlaceholderText('Search a word...');
    const searchButton = getByText('Search');

    expect(searchInput).toBeDefined();
    expect(searchButton).toBeDefined();
  });

  it('should fetche random word on initial render', async () => {
    const mockResponse = [{word: 'example', definition: 'An instance'}];
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const {getByText} = render(<RandomWord />);
    const wordOfTheDayText = getByText('Word of the day!');

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://dictionary-api-rojalinidas.vercel.app/word',
    );
    await waitFor(() => {
      expect(wordOfTheDayText).toBeDefined();
    });
  });

  it('should perform word search and displays results', async () => {
    const mockResponse = [
      {
        word: 'example',
        meanings: [
          {
            definitions: [{definition: 'An instance'}],
          },
        ],
      },
    ];
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const {getByPlaceholderText, getByText} = render(<RandomWord />);

    const searchInput = getByPlaceholderText('Search a word...');
    const searchButton = getByText('Search');

    fireEvent.changeText(searchInput, 'example');
    fireEvent.press(searchButton);

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.dictionaryapi.dev/api/v2/entries/en/example',
    );
    await waitFor(() => {
      const wordText = getByText('example');
      const definitionText = getByText('An instance');
      expect(wordText).toBeDefined();
      expect(definitionText).toBeDefined();
    });
  });
});
