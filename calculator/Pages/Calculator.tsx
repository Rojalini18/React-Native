import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const Calculator = () => {
  const [result, setResult] = useState('');
  const [expression, setExpression] = useState('');

  const handlePress = (value: any) => {
    if (value === '=') {
      try {
        const evaluatedExpression = eval(expression);
        setResult(evaluatedExpression.toString());
        setExpression(evaluatedExpression.toString());
      } catch (error) {
        setResult('Error');
        setExpression('');
      }
    } else if (value === 'C') {
      setResult('');
      setExpression('');
    } else if (value === '←') {
      setExpression(prevExpression => prevExpression.slice(0, -1));
    } else {
      setExpression(prevExpression => prevExpression + value);
    }
  };

  const renderButton = (value: any) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => handlePress(value)}
      activeOpacity={0.7}>
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.result}>{result !== '' ? result : expression}</Text>
      <View style={styles.row}>
        {renderButton('7')}
        {renderButton('8')}
        {renderButton('9')}
        {renderButton('/')}
      </View>
      <View style={styles.row}>
        {renderButton('4')}
        {renderButton('5')}
        {renderButton('6')}
        {renderButton('*')}
      </View>
      <View style={styles.row}>
        {renderButton('1')}
        {renderButton('2')}
        {renderButton('3')}
        {renderButton('-')}
      </View>
      <View style={styles.row}>
        {renderButton('0')}
        {renderButton('.')}
        {renderButton('=')}
        {renderButton('+')}
      </View>
      <View style={styles.row}>
        {renderButton('C')}
        {renderButton('←')}
      </View>
    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  result: {
    color: 'lightyellow',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 24,
    color: 'black',
  },
});
