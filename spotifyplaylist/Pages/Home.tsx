import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {exchangeCodeForToken} from '../Pages/SpotifyService';

const Home = ({navigation}: any) => {
  const authorizeUrl = 'https://accounts.spotify.com/authorize';
  const clientId = '4f15ffccd0d8446d8d86253c8baae7ad';
  const redirectUri = 'myspotify';
  const scopes = [
    'user-read-email',
    'user-library-read',
    'user-read-recently-played',
    'user-top-read',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
  ];

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    if (token) {
      navigation.navigate('Playlist');
    }
  };

  const handleRedirect = async (event: WebViewMessageEvent) => {
    const code = event.nativeEvent.data;
    console.log('Received code:', code);

    try {
      const tokens = await exchangeCodeForToken(code);
      console.log('Received tokens:', tokens);

      if (tokens.access_token) {
        await AsyncStorage.setItem('token', tokens.access_token);
        navigation.navigate('Playlist');
      } else {
        console.log('Access token not found in token response.');
      }
    } catch (error) {
      console.log('Token exchange error:', error);
    }
  };

  const handleLogin = () => {
    const authUrl = `${authorizeUrl}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scopes=${scopes}`;
    return <WebView source={{uri: authUrl}} onMessage={handleRedirect} />;
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
