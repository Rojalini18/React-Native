import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const screen = Dimensions.get('window');
const formatNumber = (number: number) => `0${number}`.slice(-2);

const getRemaining = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return {minutes: formatNumber(minutes), seconds: formatNumber(seconds)};
};

const createArray = (length: number) => {
  const arr = [];
  let i = 0;
  while (i < length) {
    arr.push(i.toString());
    i += 1;
  }

  return arr;
};

const AVAILABLE_MINUTES = createArray(10);
const AVAILABLE_SECONDS = createArray(60);

const App: React.FC = () => {
  const [remainingSeconds, setRemainingSeconds] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedMinutes, setSelectedMinutes] = useState('0');
  const [selectedSeconds, setSelectedSeconds] = useState('5');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (remainingSeconds === 0 && isRunning) {
      stop();
    }
  }, [remainingSeconds, isRunning]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const start = () => {
    setRemainingSeconds(
      parseInt(selectedMinutes, 10) * 60 + parseInt(selectedSeconds, 10),
    );
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setRemainingSeconds(prevRemainingSeconds => prevRemainingSeconds - 1);
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setRemainingSeconds(5);
    setIsRunning(false);
  };

  const renderPickers = () => (
    <View style={styles.pickerContainer}>
      <RNPickerSelect
        style={pickerStyles}
        placeholder={{label: 'Select minutes', value: null}}
        onValueChange={(itemValue: any) => setSelectedMinutes(itemValue)}
        items={AVAILABLE_MINUTES.map(value => ({
          label: value,
          value: value,
        }))}
      />
      <Text style={styles.pickerItem}>Minutes</Text>
      <RNPickerSelect
        style={pickerStyles}
        placeholder={{label: 'Select seconds', value: null}}
        onValueChange={(itemValue: any) => setSelectedSeconds(itemValue)}
        items={AVAILABLE_SECONDS.map(value => ({
          label: value,
          value: value,
        }))}
      />
      <Text style={styles.pickerItem}>Seconds</Text>
    </View>
  );

  const {minutes, seconds} = getRemaining(remainingSeconds);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {isRunning ? (
        <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
      ) : (
        renderPickers()
      )}
      {isRunning ? (
        <TouchableOpacity
          onPress={stop}
          style={[styles.button, styles.buttonStop]}>
          <Text style={[styles.buttonText, styles.buttonTextStop]}>Stop</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={start} style={styles.button}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07121B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 10,
    borderColor: '#89AAFF',
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonStop: {
    borderColor: '#FF851B',
  },
  buttonText: {
    fontSize: 45,
    color: '#89AAFF',
  },
  buttonTextStop: {
    color: '#FF851B',
  },
  timerText: {
    color: '#fff',
    fontSize: 90,
  },
  picker: {
    width: 50,
    ...Platform.select({
      android: {
        color: '#fff',
        backgroundColor: '#07121B',
        marginLeft: 10,
      },
    }),
  },
  pickerItem: {
    color: '#fff',
    fontSize: 20,
  },
  pickerContainer: {
    gap: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const pickerStyles = StyleSheet.create({
  inputAndroid: {
    width: 20,
    height: 40,
    marginLeft: 40,
    marginBottom: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
});
