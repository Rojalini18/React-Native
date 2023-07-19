import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface PlaylistItem {
  id: string;
  name: string;
}

const Playlist = () => {
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);

  const fetchPlaylists = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      if (token) {
        const response = await axios.get(
          'https://api.spotify.com/v1/me/playlists',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setPlaylists(response.data.items);
      }
    } catch (error) {
      console.log('Error fetching playlists:', error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 18, color: 'black'}}>Playlist Page</Text>
      <FlatList
        data={playlists}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Text>{item.name}</Text>}
      />
    </View>
  );
};

export default Playlist;
