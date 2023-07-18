import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Posts} from './Pages/Posts';
import RawJSON from './Pages/RawJSON';

const stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name="Posts" component={Posts} />
        <stack.Screen name="Raw_JSON" component={RawJSON} />
      </stack.Navigator>
    </NavigationContainer>
  );
}
