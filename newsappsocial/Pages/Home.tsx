import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import axios from 'axios';
import Voice from '@react-native-community/voice';
import Modal from 'react-native-modal';
import LoadingDots from './LoadingDots';

interface INewsArticle {
  title: string;
  description: string;
  imageUrl: string;
  source: string;
  urlToImage: string;
}

const Home = ({navigation}: any) => {
  const [articles, setArticles] = useState<INewsArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [voiceError, setVoiceError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [voiceRecognitionStatus, setVoiceRecognitionStatus] = useState('');
  const [speechVolume, setSpeechVolume] = useState(0);

  const fetchNews = async (query: string) => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=d670eac6fb694a389f73c2e39524bb9b`,
      );

      const articlesWithImage = response.data.articles.map((article: any) => ({
        ...article,
        imageUrl: article.urlToImage,
      }));

      setArticles(articlesWithImage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    fetchNews(searchQuery);
  };

  const handleVoiceSearch = async () => {
    try {
      if (isRecording) {
        await Voice.stop();
        setIsRecording(false);
      } else {
        setVoiceError('');
        setSearchQuery('');
        setIsModalVisible(true);
        setVoiceRecognitionStatus('Listening...');

        Voice.start('en-US');
        setIsRecording(true);
      }
    } catch (error) {
      //console.log(error);
      setIsModalVisible(false);
      setVoiceRecognitionStatus('');
      setVoiceError(
        'Error occurred during voice recognition. Please try again.',
      );
    }
  };

  useEffect(() => {
    const handleSpeechStart = () => {
      setVoiceRecognitionStatus('Listening...');
    };

    const handleSpeechEnd = () => {
      setIsRecording(false);
      setIsModalVisible(false);
    };

    const handleSpeechResults = (e: any) => {
      const spokenText = e.value[0];
      setSearchQuery(spokenText);
      setIsRecording(false);
      setIsModalVisible(false);
      fetchNews(spokenText);
    };

    const handleSpeechError = (e: any) => {
      //console.log(e);
      setIsRecording(false);
      setIsModalVisible(false);
      setVoiceRecognitionStatus('');
      setVoiceError('Unable to recognize speech. Please try again.');
    };

    const handleSpeechVolumeChanged = (event: any) => {
      try {
        const {value} = event;
        //console.log(value);
        setSpeechVolume(value);
      } catch (err) {
        console.log('Speech volume error:', err);
      }
    };

    Voice.onSpeechStart = handleSpeechStart;
    Voice.onSpeechEnd = handleSpeechEnd;
    Voice.onSpeechResults = handleSpeechResults;
    Voice.onSpeechError = handleSpeechError;
    Voice.onSpeechVolumeChanged = handleSpeechVolumeChanged;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Type Something..."
          placeholderTextColor="black"
        />
        <View style={styles.searchBox}>
          <Button
            color="black"
            testID="search-stop-button"
            title={isRecording ? 'Stop' : 'Voice'}
            onPress={handleVoiceSearch}
          />
          <Button title="Search" color="black" onPress={handleSearch} />
        </View>
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <LoadingDots speechVolume={speechVolume} />
          <View style={styles.modalButton}>
            <Button title="Stop" color="black" onPress={handleVoiceSearch} />
          </View>
        </View>
      </Modal>
      {voiceError ? <Text style={styles.errorText}>{voiceError}</Text> : null}
      <FlatList
        data={articles}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({item}) => (
          <TouchableHighlight
            underlayColor="#b8b3cb"
            onPress={() =>
              navigation.navigate('Details', {
                article: {
                  title: item.title,
                  description: item.description,
                  source: item.source,
                  urlToImage: item.urlToImage,
                },
              })
            }>
            <View style={styles.articleContainer}>
              <Image
                source={{uri: item.imageUrl}}
                style={styles.articleImage}
              />
              <Text style={styles.articleTitle}>{item.title}</Text>
              <Text style={styles.articleDescription}>{item.description}</Text>
            </View>
          </TouchableHighlight>
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  searchBox: {
    gap: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    height: 40,
    color: 'black',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  articleContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  articleTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  articleImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
  },
  articleDescription: {
    color: 'black',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalContainer: {
    height: 130,
    backgroundColor: 'lightgrey',
    padding: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButton: {
    height: 40,
    width: 70,
    marginTop: 10,
    marginLeft: 5,
  },
});
