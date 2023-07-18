import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import axios from 'axios';

interface ICountry {
  capital: string;
  latlng: number[];
  population: number;
  flags: any;
}

const Country = ({navigation, route}: any) => {
  const {country} = route.params;
  const [countryData, setCountryData] = useState<ICountry>({
    capital: '',
    latlng: [],
    population: 0,
    flags: {},
  });

  const fetchData = () => {
    axios
      .get(`https://restcountries.com/v3.1/name/${country}`)
      .then((response: any) => setCountryData(response.data[1]))
      .catch((error: any) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.countryContainer}>
        <Image
          style={styles.flagImage}
          source={{uri: `${countryData.flags.png}`}}
        />
        <Text style={styles.detailText}>Capital: {countryData.capital[0]}</Text>
        <Text style={styles.detailText}>
          Population: {countryData.population}
        </Text>
        <Text style={styles.detailText}>Latitude: {countryData.latlng[0]}</Text>
        <Text style={styles.detailText}>
          Longitude: {countryData.latlng[1]}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Capital Weather"
          onPress={() =>
            navigation.navigate('Capital', {capital: countryData.capital})
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -120,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 8,
    textAlign: 'center',
    color: 'black',
    marginBottom: 20,
  },
  countryContainer: {
    width: 300,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    padding: 5,
  },
  flagImage: {
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
  buttonContainer: {
    width: 300,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
});

export default Country;
