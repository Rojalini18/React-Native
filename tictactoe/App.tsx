import {StyleSheet, View} from 'react-native';
import Home from './Pages/Home';

function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})