import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Pages/Home';
import Country from './Pages/Country';
import Capital from './Pages/Capital';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
        <Stack.Screen
          name="Country"
          component={Country}
          options={{title: 'Country'}}
        />
        <Stack.Screen
          name="Capital"
          component={Capital}
          options={{title: 'Capital'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
