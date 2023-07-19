import {StyleSheet, Text, View} from 'react-native';
import Keypad from './Pages/Keypad';

export default function App() {
  return (
    <View style={[styles.container, {backgroundColor: 'black'}]}>
      <View style={styles.toolbar}>
        <Text style={styles.title}>Calculator</Text>
      </View>
      <Keypad />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 40,
    textAlign: 'left',
    paddingStart: 20,
  },
  toolbar: {
    marginTop: 10,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});
