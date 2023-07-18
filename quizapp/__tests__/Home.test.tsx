import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Home from '../Pages/Home';

jest.mock('react-native-paper', () => {
  const RealModule = jest.requireActual('react-native-paper');
  const MockedModule = {
    ...RealModule,
    Portal: ({children}: any) => <div>{children}</div>,
  };
  return MockedModule;
});

describe('Home', () => {
  it('should render the page correctly', () => {
    const {getByText, getByPlaceholderText} = render(<Home />);
    const pageTitle = getByText('Welcome to the page!');
    const nameInput = getByPlaceholderText('Name');
    const emailInput = getByPlaceholderText('Email ID');
    const ageInput = getByPlaceholderText('Age');
    const phoneNumberInput = getByPlaceholderText('Phone Number');
    const submitButton = getByText('Submit');

    expect(pageTitle).toBeTruthy();
    expect(nameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(ageInput).toBeTruthy();
    expect(phoneNumberInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it('should displays error message if any field is empty', () => {
    const {getByPlaceholderText, getByText} = render(<Home />);
    const submitButton = getByText('Submit');

    fireEvent.press(submitButton);

    const errorMessage = getByText('Please fill in all fields.');
    expect(errorMessage).toBeTruthy();
  });

  it('should navigates to the question screen if all fields are filled', () => {
    const mockNavigate = jest.fn();
    const {getByText, getByPlaceholderText} = render(
      <Home navigation={{navigate: mockNavigate}} />,
    );

    const nameInput = getByPlaceholderText('Name');
    const emailInput = getByPlaceholderText('Email ID');
    const ageInput = getByPlaceholderText('Age');
    const phoneNumberInput = getByPlaceholderText('Phone Number');
    const submitButton = getByText('Submit');

    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'john.doe@example.com');
    fireEvent.changeText(ageInput, '25');
    fireEvent.changeText(phoneNumberInput, '1234567890');
    fireEvent.press(submitButton);

    expect(mockNavigate).toHaveBeenCalledWith('Question', {name: 'John Doe'});
  });

  test('calls setLanguage function with the selected language', () => {
    const mockSetLanguage = jest.fn();
    const {getByTestId} = render(<Home setLanguage={mockSetLanguage} />);
    const hindiRadioButton = getByTestId('englishLang');

    fireEvent(hindiRadioButton, 'press');

    expect(mockSetLanguage).toHaveBeenCalledWith('English');
  });
});
