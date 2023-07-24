import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';

interface Album {
  id: string;
  name: string;
  images: {url: string}[];
}

interface PlaylistItem {
  id: string;
  name: string;
}

interface TrackItem {
  id: string;
  name: string;
  artists: string;
  album: Album;
  preview_url: string;
}

type RootStackParamList = {
  Playlist: undefined;
  PlaylistTracks: {tracks: TrackItem[]};
};

type PlaylistScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Playlist'
>;

interface PlaylistProps {
  navigation: PlaylistScreenNavigationProp;
}

const Playlist = ({navigation}: PlaylistProps) => {
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistItem | null>(
    null,
  );
  const [tracks, setTracks] = useState<TrackItem[]>([]);

  const fetchPlaylists = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await axios.get(
          'https://api.spotify.com/v1/me/playlists',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const playlistItems: PlaylistItem[] = response.data.items.map(
          (item: any) => ({
            id: item.id,
            name: item.name,
          }),
        );
        setPlaylists(playlistItems);
      }
    } catch (error) {
      console.log('Error fetching playlists:', error);
    }
  };

  const fetchTracks = async (playlistId: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const tracksWithDetails: TrackItem[] = response.data.items.map(
          (item: any) => ({
            id: item.track.id,
            name: item.track.name,
            artists: item.track.artists
              .map((artist: any) => artist.name)
              .join(', '),
            album: {
              id: item.track.album.id,
              name: item.track.album.name,
              images: item.track.album.images,
            },
            preview_url: item.track.preview_url,
            full_audio_url: item.track.external_urls.spotify,
          }),
        );
        setTracks(tracksWithDetails);
      }
    } catch (error) {
      console.log('Error fetching tracks:', error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handlePlaylistPress = (playlist: PlaylistItem) => {
    setSelectedPlaylist(playlist);
    fetchTracks(playlist.id);
    navigation.navigate('PlaylistTracks', {tracks});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={playlists}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.playlistItemContainer}
            onPress={() => handlePlaylistPress(item)}>
            <Text style={styles.playlistItemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContainer}
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
  flatListContainer: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  playlistItemContainer: {
    height: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8,
    gap: 5,
  },
  playlistItemText: {
    fontSize: 16,
    color: 'black',
  },
  playlistStyle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 70,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Playlist;
