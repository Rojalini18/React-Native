import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './Pages/Home';
import Playlist from './Pages/Playlist';
import PlaylistTracks from './Pages/PlaylistTracks';
import SongPlayerScreen from './Pages/SongPlayerScreen';
import TrackPlayer from 'react-native-track-player';

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState('Playlist');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loginStatus = await AsyncStorage.getItem('isLoggedIn');
        if (loginStatus === 'true') {
          setInitialRoute('Playlist');
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    TrackPlayer.setupPlayer().then(() => {
      console.log('TrackPlayer is ready');
    });
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        {/* <Stack.Navigator> */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Login Screen'}}
        />
        <Stack.Screen
          name="Playlist"
          component={Playlist}
          options={{title: 'Spotify Playlists'}}
        />
        <Stack.Screen
          name="PlaylistTracks"
          component={PlaylistTracks}
          options={{title: 'Playlist Tracks'}}
        />
        <Stack.Screen
          name="SongPlayerScreen"
          component={SongPlayerScreen}
          options={{title: 'SongPlayer Screen'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
