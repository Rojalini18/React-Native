import {Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Pages/Login';
import Activity from './Pages/Activity';
import CreateActivity from './Pages/CreateActivity';
import {store} from './redux/store';
import {Provider} from 'react-redux';

const Stack = createNativeStackNavigator();

const App = () => {
  const linking = {
    prefixes: ['strava://', 'https://strava.com'],
    config: {
      screens: {
        Login: {
          path: 'Login',
          parse: {
            state: (state: string) => `-${state}`,
            code: (code: string) => `-${code}`,
            scope: (scope: string) => `-${scope}`,
          },
        },
        Activity: {
          path: 'Activity',
          parse: {
            code: (code: string) => `-${code}`,
          },
        },
      },
    },
  };

  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="Activity"
            component={Activity}
            options={({navigation}) => ({
              headerBackVisible: false,
              headerRight: () => (
                <Button
                  title="Create Activity"
                  color="black"
                  onPress={() => navigation.navigate('CreateActivity')}
                />
              ),
            })}
          />
          <Stack.Screen name="CreateActivity" component={CreateActivity} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
