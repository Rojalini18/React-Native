import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Cart from '../Pages/Cart';

jest.mock('react-native-vector-icons/FontAwesome', () => ({
  FontAwesome: 'FontAwesome',
}));

describe('Cart', () => {
  it('should render the component correctly', () => {
    const {getByTestId} = render(<Cart />);
    expect(getByTestId('shopping-cart')).toHaveTextContent('FontAwesome');
  });
});
