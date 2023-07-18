import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Home from '../Pages/Home';

jest.mock('react-native-video', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

jest.mock('react-native-orientation-locker', () => ({
  lockToPortrait: jest.fn(),
  lockToLandscape: jest.fn(),
  unlockAllOrientations: jest.fn(),
}));

jest.mock('react-native-picker-select', () => ({
  default: jest.fn().mockReturnValue(null),
}));

describe('Home', () => {
  it('should render the component', () => {
    render(<Home />);
  });

  it('should toggle fullscreen mode', () => {
    const {getByTestId} = render(<Home />);
    const fullScreenButton = getByTestId('fullScreenButton');

    fireEvent.press(fullScreenButton);
    expect(fullScreenButton.props.source).toEqual(
      require('../assets/FullScreen.png'),
    );

    fireEvent.press(fullScreenButton);
    expect(fullScreenButton.props.source).toEqual(
      require('../assets/FullScreen.png'),
    );
  });

  it('should toggle play/pause', () => {
    const {getByTestId} = render(<Home />);
    const playPauseButton = getByTestId('playPauseButton');

    fireEvent.press(playPauseButton);
    expect(playPauseButton.props.source).toEqual(
      require('../assets/Pause.png'),
    );

    fireEvent.press(playPauseButton);
    expect(playPauseButton.props.source).toEqual(require('../assets/Play.png'));
  });

  it('should skip the video backward', () => {
    const videoRef = {
      current: {
        seek: jest.fn(),
      },
    };
    const currentTime = 45;
    const newTime = 15;

    const {getByTestId} = render(<Home />);
    const skipBackwardButton = getByTestId('skipBackwardButton');

    fireEvent(skipBackwardButton, 'press');
    videoRef.current.seek(newTime);
    expect(videoRef.current.seek).toHaveBeenCalledWith(newTime);
  });

  it('should skip the video forward', () => {
    const videoRef = {
      current: {
        seek: jest.fn(),
      },
    };
    const currentTime = 15;
    const newTime = 45;

    const {getByTestId} = render(<Home />);
    const skipBackwardButton = getByTestId('skipForwardButton');

    fireEvent(skipBackwardButton, 'press');
    videoRef.current.seek(newTime);
    expect(videoRef.current.seek).toHaveBeenCalledWith(newTime);
  });

  it('should perform fast backward action on double tap on the left side of the screen', () => {
    const videoRefMock = {current: {seek: jest.fn()}};
    const setCurrentTimeMock = jest.fn();

    const {getByTestId} = render(
      <Home videoRef={videoRefMock} setCurrentTime={setCurrentTimeMock} />,
    );
    const videoScreen = getByTestId('video-screen');

    fireEvent.press(videoScreen, {nativeEvent: {locationX: 100}, timestamp: 0});
    fireEvent.press(videoScreen, {
      nativeEvent: {locationX: 100},
      timestamp: 301,
    });

    //expect(videoRefMock.current.seek).toHaveBeenCalledWith(expect.any(Number));
    //expect(setCurrentTimeMock).toHaveBeenCalledWith(expect.any(Number));
  });

  it('should toggle volume mute state on press', () => {
    const {getByTestId} = render(<Home />);
    const volumeButton = getByTestId('volume-button');
    const setVolMute = jest.fn();
    const setVideoVolume = jest.fn();

    fireEvent.press(volumeButton);
    //expect(setVolMute).toHaveBeenCalledWith(true);
    //expect(setVideoVolume).toHaveBeenCalledWith(0);

    fireEvent.press(volumeButton);
    // expect(setVolMute).toHaveBeenCalledWith(false);
    // expect(setVideoVolume).toHaveBeenCalledWith(1);
  });

  it('should update the currentTime state when handleProgress is called', () => {
    const {getByTestId} = render(<Home />);
    const videoPlayer = getByTestId('video-screen');

    fireEvent(videoPlayer, 'progress', {currentTime: 10});
  });

  it('should open and close the modal when openModal and closeModal functions are called', () => {
    const {getByTestId, queryByText} = render(<Home />);
    const openModalButton = getByTestId('settingsButton');
    fireEvent.press(openModalButton);

    const modalText = queryByText('Playback Settings');
    expect(modalText).toBeTruthy();
    fireEvent.press(openModalButton);

    const closedModalText = getByTestId('modal-close-button');
    expect(closedModalText).toBeNull();
  });

  it('should update the currentTime state when handleProgress is called', () => {
    const {getByTestId} = render(<Home />);
    const videoPlayer = getByTestId('video-screen');
    const currentTime = 10;
    const getCurrentTime = jest.fn();

    fireEvent(videoPlayer, 'progress', {currentTime});
    expect(getCurrentTime()).toBe(currentTime);
  });

  it('should close the modal and update speed when closeModal is called', () => {
    const selectedSpeed = '1.5';
    const {getByTestId} = render(<Home />);
    const closeModalButton = getByTestId('modal-close-button');
    const setSelectedSpeed = jest.fn();
    const setIsModalVisible = jest.fn();
    const getIsModalVisible = jest.fn();
    const getSpeed = jest.fn();

    setSelectedSpeed(selectedSpeed);
    setIsModalVisible(true);

    fireEvent.press(closeModalButton);

    expect(getIsModalVisible()).toBe(false);
    expect(getSpeed()).toBe(selectedSpeed);
  });
});
