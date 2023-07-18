import {
  Text,
  View,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';

export const RandomWord = ({navigation}: any) => {
  interface IRandomWord {
    word: string;
    definition: string;
  }
  const [randomWord, setRandomWord] = useState<IRandomWord[]>([]);
  const [word, setWord] = useState('');
  const [data, setdata] = useState([]);

  const handleNavigate = (el: any) => {
    navigation.navigate('MoreDetails', {
      meanings: el.meanings,
      word: el.word,
      phonetic: el.phonetic,
    });
  };

  const fetchData = () => {
    fetch(`https://dictionary-api-rojalinidas.vercel.app/word`)
      .then((response: any) => response.json())
      .then((response: any) => setRandomWord(response))
      .catch((error: any) => console.log(error));
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  const handleSearchword = () => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((response: any) => response.json())
      .then((response: any) => {
        if (response.title === 'No Definitions Found') {
          Alert.alert(response.title, 'No word found');
        } else {
          setdata(response);
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search a word..."
          placeholderTextColor="black"
          style={styles.input}
          onChangeText={setWord}
        />
        <Button title="Search" color="black" onPress={handleSearchword} />
      </View>
      <View style={styles.wordContainer}>
        {data.length === 0 ? (
          <View style={styles.wordOfTheDayContainer}>
            <Text style={styles.wordOfTheDayText}>Word of the day!</Text>
            {randomWord.map((el: any) => {
              return (
                <View style={styles.definitionContainer} key={Date.now()}>
                  <Text style={styles.wordText}>{el.word}: </Text>
                  <Text style={styles.definitionText}>{el.definition}</Text>
                </View>
              );
            })}
          </View>
        ) : (
          <View style={styles.resultsContainer}>
            {data.map((el: any, index: number) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.resultItemContainer}
                  onPress={() => handleNavigate(el)}>
                  <Text style={styles.wordText}>{el.word}</Text>
                  <Text style={styles.definitionText}>
                    {el.meanings[0].definitions[0].definition}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 25,
    gap: 10,
  },
  searchContainer: {
    width: 200,
    flexDirection: 'row',
    marginTop: 30,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 180,
    height: 36,
    color: 'black',
    borderWidth: 2,
    paddingLeft: 10,
  },
  wordContainer: {
    marginTop: 30,
    alignItems: 'flex-start',
  },
  wordOfTheDayContainer: {
    alignItems: 'center',
    alignContent: 'center',
    borderWidth: 2,
    padding: 5,
    gap: 5,
  },
  wordOfTheDayText: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
  definitionContainer: {
    justifyContent: 'center',
  },
  wordText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  definitionText: {
    color: 'black',
    fontSize: 15,
  },
  resultsContainer: {
    gap: 35,
  },
  resultItemContainer: {
    borderWidth: 2,
    padding: 5,
    gap: 5,
  },
});
 


