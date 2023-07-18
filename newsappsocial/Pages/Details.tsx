import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';

const Details = ({route}: any) => {
  const {article} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{article.title}</Text>
      <Image
        testID="article-image"
        source={{uri: article.urlToImage}}
        style={styles.articleImage}
      />
      <ScrollView contentContainerStyle={styles.descriptionContainer}>
        <Text style={styles.description}>{article.description}</Text>
      </ScrollView>
      <Text style={styles.source}>{article.source.name}</Text>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionContainer: {
    color: 'black',
    flexGrow: 1,
  },
  description: {
    color: 'black',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  articleImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  source: {
    color: 'black',
    fontSize: 14,
    fontStyle: 'italic',
  },
});
