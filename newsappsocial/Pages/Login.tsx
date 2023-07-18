import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}: any) => {
  GoogleSignin.configure({
    webClientId:
      '622920294066-nhkoooe0pvjg0lt4eccdg7414e2kdhvd.apps.googleusercontent.com',
  });

  const signInWithGoogleAsync = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      //const userInfo = await GoogleSignin.signIn();
      //const googleCredential = auth.GoogleAuthProvider.credential(
      //userInfo.idToken,
      //);
      //const user = await auth().signInWithCredential(googleCredential);
      //console.log(user);
      await AsyncStorage.setItem('isLoggedIn', 'true');
      navigation.navigate('Home');
    } catch (error: any) {
      // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //   console.log('User cancelled the login flow.');
      // } else if (error.code === statusCodes.IN_PROGRESS) {
      //   console.log('Sign in is in progress already.');
      // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //   console.log('Play services not available or outdated.');
      // } else {
      //   console.log('Error occurred:', error.message);
      // }
      console.error(error);
    }
  };

  const checkLoginStatus = async () => {
    try {
      const loginStatus = await AsyncStorage.getItem('isLoggedIn');
      if (loginStatus === 'true') {
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <GoogleSigninButton
        testID="google-signin-button"
        onPress={signInWithGoogleAsync}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
      /> */}
      <Button
        title="Log In"
        testID="google-signin-button"
        onPress={signInWithGoogleAsync}
      />
    </View>
  );
};

export default Login;
