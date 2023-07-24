import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import Slider from '@react-native-community/slider';

const SongPlayerScreen = ({navigation, route}: any) => {
  const {track} = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const progress = useProgress();

  useEffect(() => {
    const setupAndPlayTrack = async () => {
      await TrackPlayer.add({
        id: track.id,
        url: track.preview_url, // for small audio
        //url: track.full_audio_url, // for full song
        title: track.name,
        artist: track.artists,
        artwork: track.album.images[0].url,
      });
      await TrackPlayer.play();
      setIsPlaying(true);
    };

    setupAndPlayTrack();

    return () => {
      //TrackPlayer.stop();
      TrackPlayer.remove(track.id);
    };
  }, [track]);

  const handlePlayPause = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrev = () => {};

  const handleNext = () => {};

  const handleSeek = async (value: number) => {
    await TrackPlayer.seekTo(value);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri: track.album.images[0].url}}
        style={styles.trackImage}
      />
      <View style={styles.trackDetailsContainer}>
        <Text style={styles.trackName}>{track.name}</Text>
        <Text style={styles.artistName}>{track.artists}</Text>
      </View>
      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={handlePrev}>
          <Image
            source={require('../assets/Prev.png')}
            style={styles.controlImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause}>
          <Image
            source={
              isPlaying
                ? require('../assets/Pause.png')
                : require('../assets/Play.png')
            }
            style={styles.controlImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
          <Image
            source={require('../assets/Next.png')}
            style={styles.controlImage}
          />
        </TouchableOpacity>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={progress.duration} 
        value={progress.position} 
        onSlidingComplete={handleSeek}
        minimumTrackTintColor="#000"
        maximumTrackTintColor="#888"
        thumbTintColor="#000"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackImage: {
    width: 250,
    height: 250,
    marginTop: -50,
  },
  trackDetailsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  trackName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  artistName: {
    fontSize: 15,
    color: 'gray',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    width: '100%',
  },
  controlImage: {
    width: 30,
    height: 30,
  },
  slider: {
    width: '80%',
    marginTop: 30,
  },
});

export default SongPlayerScreen;
