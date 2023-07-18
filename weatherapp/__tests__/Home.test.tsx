import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Home from '../Pages/Home';

describe('Home', () => {
  it('should renders correctly', () => {
    const {getByText, getByPlaceholderText} = render(<Home />);

    expect(getByText('Welcome to the App!')).toBeDefined();
    expect(getByPlaceholderText('Search For Country...')).toBeDefined();
    expect(getByText('Search')).toBeDefined();
  });

  it('should navigates to Country screen when Search button is pressed with valid data', () => {
    const navigation = {navigate: jest.fn()};
    const {getByText, getByPlaceholderText} = render(
      <Home navigation={navigation} />,
    );
    const input = getByPlaceholderText('Search For Country...');

    fireEvent.changeText(input, 'Canada');
    fireEvent.press(getByText('Search'));

    expect(navigation.navigate).toHaveBeenCalledWith('Country', {
      country: 'Canada',
    });
  });

  it('should disables Search button when input is empty', () => {
    const {getByText} = render(<Home />);
    const searchButton = getByText('Search');

    expect(searchButton.props.disabled).toBe(true);
  });
});
