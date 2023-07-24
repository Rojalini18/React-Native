import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const PlaylistTracksScreen = ({navigation, route}: any) => {
  const {tracks} = route.params;
  const handleTrackPress = (track: any) => {
    navigation.navigate('SongPlayerScreen', {track});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleTrackPress(item)}>
            <View style={styles.trackItemContainer}>
              <Image
                testID="trackImage-track1"
                source={{uri: item.album.images[0].url}}
                style={styles.trackImage}
              />
              <View style={styles.trackDetailsContainer}>
                <Text testID="Track 1" style={styles.trackName}>
                  {item.name}
                </Text>
                <Text style={styles.artistName}>{item.artists}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
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
  trackItemContainer: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
  },
  trackImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  trackDetailsContainer: {
    width: '75%',
    marginLeft: 15,
  },
  trackName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  artistName: {
    fontSize: 14,
    color: 'gray',
  },
});

export default PlaylistTracksScreen;
