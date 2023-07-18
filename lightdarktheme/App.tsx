import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {lightTheme, darkTheme, Theme} from './Pages/Theme';
import ToggleThemeButton from './Pages/ToggleThemeButton';

type RootStackParamList = {
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const theme: Theme = isDarkTheme ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  return (
    <NavigationContainer theme={theme}>
      <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} />
      <SafeAreaView
        style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
        <View style={styles.content}>
          <ToggleThemeButton
            isDarkTheme={isDarkTheme}
            onToggleTheme={toggleTheme}
          />
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
