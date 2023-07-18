import React, {useEffect, useRef, useState} from 'react';
import {TextInput, View, StyleSheet, Text} from 'react-native';

interface Props {}

let currentOtpNumber: number = 0;

const Home = (props: Props) => {
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(''));
  const [activeOtpIndex, setActiveOtpInput] = useState(0);
  const inputRef = useRef<TextInput>(null);

  const handleOnChange = (value: string) => {
    let newOtp: string[] = [...otp];
    newOtp[currentOtpNumber] = value.substring(0, 1);

    if (!value) {
      setActiveOtpInput(currentOtpNumber - 1);
    } else if (value.length > 1 && currentOtpNumber < otp.length - 1) {
      let remainingValue = value.substring(1);
      for (let i = currentOtpNumber + 1; i < otp.length; i++) {
        if (remainingValue.length > 0) {
          newOtp[i] = remainingValue.substring(0, 1);
          remainingValue = remainingValue.substring(1);
        } else {
          break;
        }
      }
      setActiveOtpInput(
        currentOtpNumber +
          Math.min(value.length, otp.length - currentOtpNumber),
      );
    } else {
      setActiveOtpInput(currentOtpNumber + 1);
    }

    setOtp(newOtp);
  };

  const handleOnKeyDown = (event: any, index: number) => {
    currentOtpNumber = index;
    if (event.nativeEvent.key === 'Backspace')
      setActiveOtpInput(currentOtpNumber - 1);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  return (
    <View style={styles.container}>
      {otp.map((_, index) => (
        <React.Fragment key={index}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={otp[index]}
            ref={index === activeOtpIndex ? inputRef : null}
            onChangeText={handleOnChange}
            onKeyPress={e => handleOnKeyDown(e, index)}
          />
          {index === otp.length - 1 ? null : <Text>-</Text>}
        </React.Fragment>
      ))}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginLeft: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: 50,
    color: 'black',
    borderWidth: 1,
    borderColor: 'grey',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 2,
    marginLeft: 10,
  },
});
