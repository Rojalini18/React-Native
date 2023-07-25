import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Calculator from '../Pages/Calculator';

describe('Calculator', () => {
  it('displays the entered expression', () => {
    const {getByText} = render(<Calculator />);
    const pressNumber = (number: any) => fireEvent.press(getByText(number));

    pressNumber('2');
    pressNumber('+');
    pressNumber('3');

    expect(getByText('2+3')).toBeDefined();
  });

  it('displays the evaluated result after pressing "="', () => {
    const {getByText} = render(<Calculator />);
    const pressNumber = (number: any) => fireEvent.press(getByText(number));

    pressNumber('+');
    pressNumber('3');
    pressNumber('=');

    expect(getByText('5')).toBeDefined();
  });

  it('clears the expression after pressing "C"', () => {
    const {getByText} = render(<Calculator />);
    const pressNumber = (number: any) => fireEvent.press(getByText(number));

    pressNumber('2');
    pressNumber('+');
    pressNumber('3');
    pressNumber('C');

    expect(getByText('')).toBeDefined();
  });

  it('removes the last entered character with the back button', () => {
    const {getByText} = render(<Calculator />);
    const pressNumber = (number: any) => fireEvent.press(getByText(number));

    pressNumber('2');
    pressNumber('+');
    pressNumber('3');
    pressNumber('4');
    pressNumber('←');

    expect(getByText('2+3')).toBeDefined();
  });

  it('displays "Error" for invalid expressions', () => {
    const {getByText} = render(<Calculator />);
    const pressNumber = (number: any) => fireEvent.press(getByText(number));

    pressNumber('2');
    pressNumber('+');
    pressNumber('+');
    pressNumber('3');
    pressNumber('=');

    expect(getByText('Error')).toBeDefined();
  });
});
