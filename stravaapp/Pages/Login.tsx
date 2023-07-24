import {Button, Linking, View} from 'react-native';
import {useEffect} from 'react';
import {authorize} from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = ({navigation}: any) => {
  const config = {
    clientId: '107403',
    clientSecret: '221e7b9c2ce92e5ef4de740b22d9eef422180c5d',
    redirectUrl: 'strava://strava.com',
    serviceConfiguration: {
      authorizationEndpoint: 'https://www.strava.com/oauth/mobile/authorize',
      tokenEndpoint:
        'https://www.strava.com/oauth/token?client_id=107403&client_secret=221e7b9c2ce92e5ef4de740b22d9eef422180c5d',
    },
    scopes: ['activity:read_all,activity:write'],
  };

  const handleAuth = async () => {
    try {
      const result = await authorize(config);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const linking = Linking.addEventListener('url', deepLink);
    Linking.getInitialURL().then(url => {
      if (url) {
        deepLink({url});
      }
    });
    return () => {
      linking.remove();
    };
  }, [handleAuth]);

  const deepLink = async (url: any) => {
    const code = url.url.split('=')[2].split('&')[0];
    const data = {
      client_id: '107403',
      client_secret: '221e7b9c2ce92e5ef4de740b22d9eef422180c5d',
      code,
      grant_type: 'authorization_code',
    };
    console.log(code);
    console.log(url);
    if (code) {
      axios
        .post('https://www.strava.com/oauth/token', data)
        .then((res: any) => {
          AsyncStorage.setItem('expiresAt', res.data.expires_at);
          AsyncStorage.setItem('accessToken', res.data.access_token);
          navigation.navigate('Activity');
        })
        .catch((err: any) => console.error(err));
    }
  };
  const accessToken = async () => {
    const access_token = await AsyncStorage.getItem('accessToken');
    const expires_at = await AsyncStorage.getItem('expires_at');
    const expires_at_stringified = JSON.stringify(expires_at);

    if (access_token !== null) {
      setTimeout(() => {
        navigation.navigate('Activity');
      }, 1000);
    } else {
      navigation.navigate('Login');
    }
  };
  useEffect(() => {
    accessToken();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{height: 100, width: 100}}>
        <Button
          testID="submitButton"
          title="Log In"
          onPress={() => handleAuth()}></Button>
      </View>
    </View>
  );
};

export default Login;
