import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Result from '../Pages/Result';

const navigate = jest.fn();

describe('Result', () => {
  it('should renders correct score and pie chart', () => {
    const state = ['A', 'B', 'C', 'D', 'E'];
    const {getByText, getByTestId} = render(
      <Result navigation={navigate} route={{params: {state}}} />,
    );

    const scoreText = getByTestId('got-answer');
    const pieChart = getByTestId('pie-chart');

    expect(scoreText).toBeTruthy();
    expect(pieChart).toBeTruthy();
  });

  it('should renders questions and answers correctly', () => {
    const state = ['A', 'B', 'C', 'D', 'E'];
    const {getAllByTestId} = render(
      <Result navigation={navigate} route={{params: {state}}} />,
    );

    const questions = getAllByTestId('question');
    const answers = getAllByTestId('answer');

    expect(questions.length).toBe(5);
    expect(answers.length).toBe(5);
  });

  it(' should navigate retry button to Question screen with id 1', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(
      <Result navigation={navigationMock} route={{params: {state: []}}} />,
    );

    const retryButton = getByText('Retry');
    fireEvent.press(retryButton);

    expect(navigationMock.navigate).toHaveBeenCalledWith('Question', {id: 1});
  });

  it('should navigate exit button to home screen', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(
      <Result navigation={navigationMock} route={{params: {state: []}}} />,
    );

    const exitButton = getByText('Exit');
    fireEvent.press(exitButton);

    expect(navigationMock.navigate).toHaveBeenCalledWith('Home');
  });
});
