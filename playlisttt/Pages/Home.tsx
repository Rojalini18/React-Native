import React, {useEffect} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authorize, refresh} from 'react-native-app-auth';

const Home = ({navigation}: any) => {
  const config = {
    clientId: '348e7c5f28da4e8f8c74c6e75d43bd15',
    clientSecret: '66fe37994ae644b892b5b8fe05e08d28',
    redirectUrl: 'com.playlisttt:/oauth',
    scopes: [
      'user-read-email',
      'playlist-modify-public',
      'user-read-private',
      'playlist-read-private',
      'playlist-read-collaborative',
    ],
    serviceConfiguration: {
      authorizationEndpoint: 'https://accounts.spotify.com/authorize',
      tokenEndpoint: 'https://accounts.spotify.com/api/token',
    },
  };

  const handleLogin = async () => {
    try {
      const result = await authorize(config);
      //console.log(result);
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

  // const refreshToken = async () => {
  //   const token = await AsyncStorage.getItem('token');
  //   console.log('Acees Token', token);
  //   if (token) {
  //     try {
  //       const result = await refresh(config, {refreshToken: token});
  //       if (result.accessToken) {
  //         await AsyncStorage.setItem('token', result.accessToken);
  //       } else {
  //         console.log('Access token not found in refresh response.');
  //       }
  //     } catch (error) {
  //       console.log('Token refresh error:', error);
  //     }
  //   }
  // };

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.navigate('Playlist');
      }
    };
    checkToken();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Button title="Login with Spotify" onPress={handleLogin} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 10,
    width: 180,
    marginLeft: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
