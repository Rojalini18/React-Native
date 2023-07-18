import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';

const Home = ({navigation}: any) => {
  const [data, setData] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to the App!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search For Country..."
          placeholderTextColor={'black'}
          onChangeText={setData}
        />
        <View style={styles.buttonContainer}>
          <Button
            disabled={data === ''}
            title="Search"
            onPress={() => navigation.navigate('Country', {country: data})}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -150,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 8,
    textAlign: 'center',
    color: 'black',
    marginBottom: 20,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 35,
    color: 'black',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
  },
  buttonContainer: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
});

export default Home;
