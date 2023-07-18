import {Text, View, StyleSheet} from 'react-native';
import React from 'react';

export const MoreDetails = ({route}: any) => {
  const {meanings, word, phonetic} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.wordContainer}>
        <Text style={styles.wordText}>{word}</Text>
        <Text style={styles.phoneticText}>Pronunciation: {phonetic}</Text>
      </View>
      <View style={styles.meaningsContainer}>
        {meanings.map((el: any, index: number) => {
          return (
            <View key={index} style={styles.meaningContainer}>
              <Text style={styles.partOfSpeechText}>{el.partOfSpeech}:</Text>
              <Text style={styles.definitionText}>
                {el.definitions[0].definition} Example:{' '}
                {el.definitions[0].example}
              </Text>
            </View>
          );
        })}
      </View>
      <View style={styles.soundContainer}>
        <Text style={styles.playSoundText}>Play Sound</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    gap: 10,
  },
  wordContainer: {
    borderWidth: 2,
    padding: 5,
    gap: 5,
  },
  wordText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  phoneticText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  meaningsContainer: {
    borderWidth: 2,
    padding: 5,
    gap: 5,
  },
  meaningContainer: {
    marginBottom: 15,
  },
  partOfSpeechText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  definitionText: {
    color: 'black',
    fontSize: 16,
  },
  soundContainer: {
    borderWidth: 2,
    alignItems: 'center',
    textAlign: 'center',
    padding: 15,
    height: 60,
  },
  playSoundText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
