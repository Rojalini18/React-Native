import {ScrollView, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Activity = ({navigation}: any) => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);

  const fetchData = async () => {
    console.log('Fetching data');
    const access_token = await AsyncStorage.getItem('accessToken');

    if (access_token !== null) {
      axios
        .get('https://www.strava.com/api/v3/athlete/activities', {
          headers: {Authorization: `Bearer ${access_token}`},
        })
        .then(res => {
          setdata(res.data);
          setloading(false);
        })
        .catch(err => {
          seterror(true);
          console.error('err', err);
        });
    } else {
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        color: 'black',
        backgroundColor: 'whitesmoke',
      }}>
      {loading ? (
        <View>
          <Text
            testID="loadingText"
            style={{
              color: 'black',
              fontSize: 30,
              marginTop: 10,
              fontWeight: 'bold',
            }}>
            Loading...
          </Text>
        </View>
      ) : (
        <ScrollView>
          {data.map((el: any, index: number) => {
            return (
              <View
                key={index}
                testID="scrollView"
                style={{
                  flex: 1,
                  width: 350,
                  backgroundColor: 'whitesmoke',
                  borderRadius: 2,
                  borderWidth: 1,
                  marginTop: 5,
                  marginBottom: 5,
                  padding: 10,
                  gap: 2,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                  }}>
                  Name: {el.name}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                  }}>
                  Sports Type: {el.sport_type}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                  }}>
                  Distance: {el.distance}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                  }}>
                  Average Speed: {el.average_speed}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                  }}>
                  Max Speed: {el.max_speed}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default Activity;
