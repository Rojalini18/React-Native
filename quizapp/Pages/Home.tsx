import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';

const Home = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [language, setLanguage] = useState('English');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (name === '' || email === '' || age === '' || phoneNumber === '') {
      setError('Please fill in all fields.');
    } else {
      setError('');
      navigation.navigate('Question', {name});
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the page!</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor={'black'}
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email ID"
          placeholderTextColor={'black'}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          placeholderTextColor={'black'}
          keyboardType="numeric"
          value={age}
          onChangeText={text => setAge(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor={'black'}
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
        />
        <View style={styles.languageContainer}>
          <Text style={styles.languageLabel}>Select Language:</Text>
          <View style={styles.languageOptions}>
            <RadioButton
              testID="englishLang"
              value="English"
              status={language === 'English' ? 'checked' : 'unchecked'}
              onPress={() => setLanguage('English')}
              color="#000"
            />
            <Text style={styles.languageText}>English</Text>
            {/* <RadioButton
              value="Hindi"
              status={language === 'Hindi' ? 'checked' : 'unchecked'}
              onPress={() => setLanguage('Hindi')}
              color="#000"
            />
            <Text style={styles.languageText}>Hindi</Text>
            <RadioButton
              value="Odia"
              status={language === 'Odia' ? 'checked' : 'unchecked'}
              onPress={() => setLanguage('Odia')}
              color="#000"
            />
            <Text style={styles.languageText}>Odia</Text> */}
          </View>
        </View>
        {error !== '' && <Text style={styles.errorText}>{error}</Text>}
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    height: 50,
    width: '100%',
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  languageContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 12,
  },
  languageLabel: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  languageOptions: {
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    color: 'black',
    marginLeft: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
