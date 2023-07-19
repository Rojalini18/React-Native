import React, {useState} from 'react';
import Button from './Button';
import {View, Text, StyleSheet} from 'react-native';

const Keypad = () => {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleNumberPress = (buttonValue: string) => {
    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue);
    }
  };

  const handleOperationPress = (buttonValue: string) => {
    setOperation(buttonValue);
    setSecondNumber(firstNumber);
    setFirstNumber('');
  };

  const clear = () => {
    setFirstNumber('');
    setSecondNumber('');
    setOperation('');
    setResult(null);
  };

  const firstNumberDisplay = () => {
    if (result !== null) {
      return (
        <Text
          style={
            result < 99999
              ? [styles.screenFirstNumber, {color: '#46D5B2'}]
              : [styles.screenFirstNumber, {fontSize: 50, color: '#46D5B2'}]
          }>
          {result?.toString()}
        </Text>
      );
    }
    if (firstNumber && firstNumber.length < 6) {
      return <Text style={styles.screenFirstNumber}>{firstNumber}</Text>;
    }
    if (firstNumber === '') {
      return <Text style={styles.screenFirstNumber}>{'0'}</Text>;
    }
    if (firstNumber.length > 5 && firstNumber.length < 8) {
      return (
        <Text style={[styles.screenFirstNumber, {fontSize: 70}]}>
          {firstNumber}
        </Text>
      );
    }
    if (firstNumber.length > 7) {
      return (
        <Text style={[styles.screenFirstNumber, {fontSize: 50}]}>
          {firstNumber}
        </Text>
      );
    }
  };

  const getResult = () => {
    switch (operation) {
      case '+':
        var result1 = parseFloat(secondNumber) + parseFloat(firstNumber);
        setResult(result1);
        setFirstNumber('' + result1);
        break;
      case '-':
        var result2 = parseFloat(secondNumber) - parseFloat(firstNumber);
        setResult(result2);
        setFirstNumber('' + result2);
        break;
      case '*':
        var result3 = parseFloat(secondNumber) * parseFloat(firstNumber);
        setResult(result3);
        setFirstNumber('' + result3);
        break;
      case '/':
        var result4 = parseFloat(secondNumber) / parseFloat(firstNumber);
        setResult(result4);
        setFirstNumber('' + result4);
        break;
      case '^':
        var result5 = Math.pow(parseInt(secondNumber), parseInt(firstNumber));
        setResult(result5);
        setFirstNumber('' + result5);
        break;
      case '%':
        var result6 =
          (parseFloat(secondNumber) * parseFloat(firstNumber)) / 100;
        setResult(result6);
        setFirstNumber('' + result6);
        break;
    }
    setOperation('');
    setSecondNumber('');
  };

  return (
    <View style={styles.viewBottom}>
      <View
        style={{
          height: 120,
          width: '90%',
          justifyContent: 'flex-end',
          alignSelf: 'center',
        }}>
        <Text style={styles.screenSecondNumber}>
          {secondNumber}
          <Text style={{color: 'purple', fontSize: 50, fontWeight: '500'}}>
            {operation}
          </Text>
        </Text>
        {firstNumberDisplay()}
      </View>
      <View style={styles.row}>
        <Button title="AC" isGray onPress={clear} />
        <Button title="^" isGray onPress={() => handleOperationPress('^')} />
        <Button title="%" isGray onPress={() => handleOperationPress('%')} />
        <Button title="÷" isBlue onPress={() => handleOperationPress('/')} />
      </View>
      <View style={styles.row}>
        <Button title="7" onPress={() => handleNumberPress('7')} />
        <Button title="8" onPress={() => handleNumberPress('8')} />
        <Button title="9" onPress={() => handleNumberPress('9')} />
        <Button title="x" isBlue onPress={() => handleOperationPress('*')} />
      </View>
      <View style={styles.row}>
        <Button title="4" onPress={() => handleNumberPress('4')} />
        <Button title="5" onPress={() => handleNumberPress('5')} />
        <Button title="6" onPress={() => handleNumberPress('6')} />
        <Button title="-" isBlue onPress={() => handleOperationPress('-')} />
      </View>
      <View style={styles.row}>
        <Button title="1" onPress={() => handleNumberPress('1')} />
        <Button title="2" onPress={() => handleNumberPress('2')} />
        <Button title="3" onPress={() => handleNumberPress('3')} />
        <Button title="+" isBlue onPress={() => handleOperationPress('+')} />
      </View>
      <View style={styles.row}>
        <Button title="." onPress={() => handleNumberPress('.')} />
        <Button title="0" onPress={() => handleNumberPress('0')} />
        <Button
          title="Del"
          onPress={() => setFirstNumber(firstNumber.slice(0, -1))}
        />
        <Button title="=" isBlue onPress={() => getResult()} />
      </View>
    </View>
  );
};

export default Keypad;

const styles = StyleSheet.create({
  row: {
    maxWidth: '100%',
    flexDirection: 'row',
  },
  viewBottom: {
    position: 'absolute',
    bottom: 50,
  },
  screenFirstNumber: {
    fontSize: 96,
    color: '#747477',
    fontWeight: '200',
    alignSelf: 'flex-end',
  },
  screenSecondNumber: {
    fontSize: 40,
    color: '#747477',
    fontWeight: '200',
    alignSelf: 'flex-end',
  },
});
