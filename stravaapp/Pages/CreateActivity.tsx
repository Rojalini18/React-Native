import {StyleSheet, View, TextInput, Button} from 'react-native';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';

const CreateActivity = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [sport_type, setsport_type] = useState('');
  const [start_date_local, setstart_date_local] = useState(new Date());
  const [elapsed_time, setelapsed_time] = useState(0);
  const [description, setDescription] = useState('');
  const [distance, setDistance] = useState(0);
  const [trainer, setTrainer] = useState(0);
  const [commute, setCommute] = useState(0);
  const [open, setOpen] = useState(false);

  const createActivityy = async () => {
    const access_token = await AsyncStorage.getItem('accessToken');
    axios
      .post(
        `https://www.strava.com/api/v3/activities?access_token=${access_token}&name=${name}&sport_type=${type}&start_date_local=${start_date_local}&elapsed_time=${elapsed_time}&trainer=${trainer}&description=${description}&commute=${commute}&distance=${distance}`,
      )
      .then(res => navigation.navigate('Activity'))
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
      }}>
      <View
        style={{
          width: 350,
          backgroundColor: 'whitesmoke',
          borderColor: 'lightgrey',
          borderWidth: 1,
          borderRadius: 2,
          padding: 20,
          gap: 10,
        }}>
        <TextInput
          style={styles.inputbox}
          placeholder="Name"
          placeholderTextColor="black"
          onChangeText={(e: any) => setName(e)}
        />
        <TextInput
          style={styles.inputbox}
          placeholder="Type"
          placeholderTextColor="black"
          onChangeText={(e: any) => setType(e)}
        />
        <TextInput
          style={styles.inputbox}
          placeholder="Sport Type"
          placeholderTextColor="black"
          onChangeText={(e: any) => setsport_type(e)}
        />
        <TextInput
          style={styles.inputbox}
          placeholder="Elapsed time"
          placeholderTextColor="black"
          onChangeText={(e: any) => setelapsed_time(e)}
        />
        <TextInput
          style={styles.inputbox}
          placeholder="Description"
          placeholderTextColor="black"
          onChangeText={(e: any) => setDescription(e)}
        />
        <TextInput
          style={styles.inputbox}
          placeholder="Distance"
          placeholderTextColor="black"
          onChangeText={(e: any) => setDistance(e)}
        />
        <TextInput
          style={styles.inputbox}
          placeholder="Trainer"
          placeholderTextColor="black"
          onChangeText={(e: any) => setTrainer(e)}
        />
        <TextInput
          style={styles.inputbox}
          placeholder="Commute"
          placeholderTextColor="black"
          onChangeText={(e: any) => setCommute(e)}
        />
        <Button
          title="Start date local"
          onPress={() => setOpen(true)}
          color="black"
        />
        <Button
          title="Create Activity"
          color="black"
          onPress={() => createActivityy()}
          disabled={
            !name ||
            !type ||
            !sport_type ||
            !start_date_local ||
            !description ||
            !elapsed_time ||
            !distance ||
            !trainer ||
            !commute
          }
        />
      </View>
      <DatePicker
        testID="date picker"
        modal
        open={open}
        date={start_date_local}
        onConfirm={date => {
          setOpen(false);
          setstart_date_local(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

export default CreateActivity;

const styles = StyleSheet.create({
  inputbox: {
    width: '100%',
    color: 'black',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 2,
    padding: 5,
  },
});
