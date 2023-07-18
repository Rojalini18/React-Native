import {render, fireEvent, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../Pages/Login';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@react-native-google-signin/google-signin', () => ({
  __esModule: true,
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(),
    signIn: jest.fn(),
  },
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
}));

describe('Login', () => {
  it('should render Google Sign-In button', () => {
    const {getByTestId} = render(<Login navigation={{navigate: jest.fn()}} />);
    const googleSignInButton = getByTestId('google-signin-button');
    expect(googleSignInButton).toBeTruthy();
  });

  it('should check login status and navigate to Home if user is logged in', async () => {
    const getItem = AsyncStorage.getItem as jest.Mock;
    getItem.mockResolvedValueOnce('true');

    const navigate = jest.fn();
    render(<Login navigation={{navigate}} />);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('Home');
    });
  });

  it('should check login status and not navigate to Home if user is not logged in', async () => {
    const getItem = AsyncStorage.getItem as jest.Mock;
    getItem.mockResolvedValueOnce(null);

    const navigate = jest.fn();
    render(<Login navigation={{navigate}} />);

    await waitFor(() => {
      expect(navigate).not.toHaveBeenCalled();
    });
  });

  it('should set isLoggedIn to true and navigate to Home', async () => {
    AsyncStorage.setItem = jest.fn().mockResolvedValueOnce(0);
    const navigate = jest.fn();

    const {getByTestId} = render(<Login navigation={{navigate}} />);
    const googleSignInButton = getByTestId('google-signin-button');

    fireEvent.press(googleSignInButton);

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('isLoggedIn', 'true');
      expect(navigate).toHaveBeenCalledWith('Home');
    });
  });

  it('should handle login status check error', async () => {
    AsyncStorage.getItem.mockRejectedValueOnce('Async storage error');
    console.error = jest.fn();

    render(<Login navigation={{navigate: jest.fn()}} />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Async storage error');
    });
  });

  it('should log the error in the catch block', async () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    AsyncStorage.setItem.mockRejectedValueOnce(new Error('error'));

    const {getByTestId} = render(<Login navigation={navigation} />);
    const logInButton = getByTestId('google-signin-button');
    await fireEvent.press(logInButton);

    expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('error'));
    consoleErrorSpy.mockRestore();
  });
});
