import React from 'react';
import {View, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authorize, refresh} from 'react-native-app-auth';

const Home = ({navigation}: any) => {
  const config = {
    clientId: '0184245f21d94204b9d35c41f4fe2734',
    clientSecret: '954192e2512e47efabb134f74f0517a1',
    redirectUrl: 'https://sportifyapp.org/callback',
    scopes: [
      'user-read-email',
      'user-library-read',
      'user-read-recently-played',
      'user-top-read',
      'playlist-read-private',
      'playlist-read-collaborative',
      'playlist-modify-public',
    ],
    serviceConfiguration: {
      authorizationEndpoint: 'https://accounts.spotify.com/authorize',
      tokenEndpoint: 'https://accounts.spotify.com/api/token',
      revocationEndpoint: 'https://accounts.spotify.com/api/token',
    },
  };

  const handleLogin = async () => {
    try {
      const result = await authorize(config);
      if (result.accessToken) {
        await AsyncStorage.setItem('token', result.accessToken);
        navigation.navigate('Playlist');
      } else {
        console.log('Access token not found in authorization response.');
      }
    } catch (error) {
      console.log('Authorization error:', error);
    }
  };

  const refreshToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('Acees Token', token);
    if (token) {
      try {
        const result = await refresh(config, {refreshToken: token});
        if (result.accessToken) {
          await AsyncStorage.setItem('token', result.accessToken);
        } else {
          console.log('Access token not found in refresh response.');
        }
      } catch (error) {
        console.log('Token refresh error:', error);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        height: 10,
        width: 180,
        marginLeft: 90,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Button title="Login with Spotify" onPress={handleLogin} />
    </View>
  );
};

export default Home;
