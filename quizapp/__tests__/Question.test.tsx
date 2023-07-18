import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Question from '../Pages/Question';

const navigation = {
  navigate: jest.fn(),
};
const mockRoute = {params: undefined};

describe('Question', () => {
  it('should render the component', () => {
    render(<Question navigation={navigation} route={mockRoute} />);
  });

  it('should navigate to the next question when the "Next" button is pressed', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const {getByTestId} = render(
      <Question navigation={navigation} route={{params: {id: 1}}} />,
    );
    const nextButton = getByTestId('Next');

    fireEvent.press(nextButton);
    expect(navigation.navigate).toHaveBeenCalledWith('Question', {id: 2});
  });

  it('should navigate to the prev question when the "Prev" button is pressed', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const {getByTestId} = render(
      <Question navigation={navigation} route={{params: {id: 2}}} />,
    );
    const prevButton = getByTestId('Prev');

    fireEvent.press(prevButton);
    expect(navigation.navigate).toHaveBeenCalledWith('Question', {id: 1});
  });

  it('should navigate to the result screen when the "Submit" button is pressed', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const {getByTestId} = render(
      <Question navigation={navigation} route={{params: {id: 5}}} />,
    );
    const submitButton = getByTestId('submitBtn');

    fireEvent.press(submitButton);
    expect(navigation.navigate).toHaveBeenCalledWith('Result', {
      state: Array(5).fill([]),
    });
  });
});
