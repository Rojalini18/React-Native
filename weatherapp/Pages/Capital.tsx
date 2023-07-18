import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import axios from 'axios';

interface IWeather {
  temperature: number;
  weather_icons: any;
  wind_speed: number;
  precip: number;
}

const Capital = ({route}: any) => {
  const capital = route.params.capital;
  const [data, setData] = useState<IWeather>({
    temperature: 0,
    weather_icons: [],
    wind_speed: 0,
    precip: 0,
  });

  const fetchData = () => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=8ff1a824a5edf0f0c3a174b1bf2f757c&query=${capital}`,
      )
      .then((response: any) => setData(response.data.current))
      .catch((error: any) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.weatherContainer}>
        <Image
          style={styles.weatherIcon}
          source={{uri: `${data.weather_icons}`}}
        />
        <Text style={styles.detailText}>Temperature: {data.temperature}</Text>
        <Text style={styles.detailText}>Wind Speed: {data.wind_speed}</Text>
        <Text style={styles.detailText}>Precip: {data.precip}</Text>
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
  weatherContainer: {
    width: 300,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    padding: 5,
  },
  weatherIcon: {
    width: 70,
    height: 50,
    marginTop: 5,
    marginBottom: 10,
  },
  detailText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default Capital;
