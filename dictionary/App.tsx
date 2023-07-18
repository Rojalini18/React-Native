import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {RandomWord} from './Pages/RandomWord';
import {MoreDetails} from './Pages/MoreDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="RandomWord"
          component={RandomWord}
          options={{title: 'RandomWord'}}
        />
        <Stack.Screen
          name="MoreDetails"
          component={MoreDetails}
          options={{title: 'MoreDetails'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
