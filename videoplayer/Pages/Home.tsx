import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import RNPickerSelect from 'react-native-picker-select';

const Home = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volmute, setVolMute] = useState(false);
  const [videoVolume, setVideoVolume] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState<any>(false);
  const [speed, setSpeed] = useState('1');
  const [selectedSpeed, setSelectedSpeed] = useState('1'); // Default speed is set to 1x
  const [quality, setQuality] = useState('720'); // Default quality is set to 720p
  const [lastTapTime, setLastTapTime] = useState(0);
  const videoRef = useRef(null);

  const handleTap = (event: any) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300; // Adjust the delay between taps as needed

    if (now - lastTapTime < DOUBLE_TAP_DELAY) {
      // Double tap detected
      const {locationX} = event.nativeEvent;

      if (locationX > Dimensions.get('window').width / 2) {
        // Tapped on the right side of the screen for fast forward
        if (currentTime >= 10) {
          const newTime = currentTime + 15;
          videoRef.current.seek(newTime);
          setCurrentTime(newTime);
        }
      } else {
        // Tapped on the left side of the screen for fast backward
        if (currentTime >= 10) {
          const newTime = currentTime - 15;
          videoRef.current.seek(newTime);
          setCurrentTime(newTime);
        }
      }
    }
    setLastTapTime(now);
  };

  const toggleFullScreen = () => {
    if (isFullScreen) {
      Orientation.unlockAllOrientations();
      Orientation.lockToPortrait();
    } else {
      Orientation.unlockAllOrientations();
      Orientation.lockToLandscape();
    }
    setIsFullScreen(!isFullScreen);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const skipBackward = () => {
    if (videoRef.current && currentTime >= 30) {
      const newTime = currentTime - 30;
      videoRef.current.seek(newTime);
      setCurrentTime(newTime);
    }
  };

  const skipForward = () => {
    if (videoRef.current) {
      const newTime = currentTime + 30;
      videoRef.current.seek(newTime);
      setCurrentTime(newTime);
    }
  };

  const handleProgress = (data: any) => {
    setCurrentTime(data.currentTime);
  };

  const handlePickerChange = (itemValue: any) => {
    setSelectedSpeed(itemValue);
    setIsModalVisible(false);
    setSpeed(itemValue);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSpeed(selectedSpeed);
  };

  const videoDuration = 600;
  const progress = (currentTime / videoDuration) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        testID="video-screen"
        onPress={handleTap}
        style={styles.backgroundVideo}
        activeOpacity={1}>
        <Video
          ref={videoRef}
          source={{
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          }}
          style={styles.backgroundVideo}
          resizeMode="cover"
          paused={!isPlaying}
          onProgress={handleProgress}
          muted={videoVolume === 0}
          volume={videoVolume}
          rate={parseFloat(selectedSpeed)}
          //fullscreenAutorotate={true}
          //resizeMode="contain"
        />
        <View style={styles.controlOverlay}>
          <TouchableOpacity
            onPress={() => {
              if (volmute === true) {
                setVolMute(false);
                setVideoVolume(1);
              } else {
                setVolMute(true);
                setVideoVolume(0);
              }
            }}
            style={styles.controlButton}>
            <Image
              testID="volume-button"
              style={styles.controlIcon}
              source={require('../assets/Sound.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipBackward} style={styles.controlButton}>
            <Image
              testID="skipBackwardButton"
              style={styles.controlIcon}
              source={require('../assets/backArrow.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={togglePlayPause}
            style={styles.controlButton}>
            <Image
              testID="playPauseButton"
              style={styles.controlIcon}
              source={
                isPlaying
                  ? require('../assets/Pause.png')
                  : require('../assets/Play.png')
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipForward} style={styles.controlButton}>
            <Image
              testID="skipForwardButton"
              style={styles.controlIcon}
              source={require('../assets/forwarfArrow.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={openModal} style={styles.controlButton}>
            <Image
              testID="settingsButton"
              style={styles.controlIcon}
              source={require('../assets/Settings.png')}
            />
          </TouchableOpacity>
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={closeModal}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                onPress={closeModal}
                testID="modal-close-button">
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
              <Text style={styles.modalText}>Playback Settings</Text>
              {/* <Text style={styles.playBackSpeedText}>Playback Speed- {speed}</Text> */}
              {/* <TextInput
              style={styles.input}
              value={quality}
              onChangeText={handleQualityChange}
              placeholder="Quality"
            /> */}
              {/* <TextInput
              style={styles.input}
              value={speed}
              onChangeText={handleSpeedChange}
              placeholder="Speed"
            /> */}
              <RNPickerSelect
                style={pickerStyles}
                value={selectedSpeed}
                onValueChange={handlePickerChange}
                items={[
                  {label: '0.5x', value: '0.5'},
                  {label: '1x', value: '1'},
                  {label: '1.5x', value: '1.5'},
                  {label: '2x', value: '2'},
                ]}
              />
              <RNPickerSelect
                style={pickerStyles}
                value={setQuality}
                onValueChange={handlePickerChange}
                items={[
                  {label: '1080p', value: '1080'},
                  {label: '720p', value: '720'},
                  {label: '144p', value: '144'},
                ]}
              />
            </View>
          </Modal>
          <TouchableOpacity
            onPress={toggleFullScreen}
            style={styles.controlButton}>
            <Image
              testID="fullScreenButton"
              style={styles.controlIcon}
              source={require('../assets/FullScreen.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground} />
          <View
            style={[styles.progressBarForeground, {width: `${progress}%`}]}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    width: '100%',
    height: Dimensions.get('window').width * 0.5625, // 16:9 aspect ratio
  },
  controlOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  controlButton: {
    padding: 8,
  },
  controlIcon: {
    width: 24,
    height: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  modalText: {
    fontSize: 24,
    color: '#FFF',
    marginBottom: 20,
  },
  playBackSpeedText: {
    fontSize: 15,
    color: '#FFF',
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  progressBarContainer: {
    width: '100%',
    height: 5,
    backgroundColor: '#808080', // Grey for full video part
  },
  progressBarBackground: {
    flex: 1,
    backgroundColor: '#C4C4C4', // Light grey for loaded part
  },
  progressBarForeground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: '#FF0000', // Red for watched part
  },
});

const pickerStyles = StyleSheet.create({
  inputAndroid: {
    width: 200,
    height: 40,
    marginLeft: 80,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
});
