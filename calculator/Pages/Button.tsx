import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  isBlue?: boolean;
  isGray?: boolean;
}

const Button: React.FC<ButtonProps> = ({title, onPress, isBlue, isGray}) => {
  return (
    <TouchableOpacity
      style={
        isBlue ? styles.btnBlue : isGray ? styles.btnDark : styles.btnLight
      }
      onPress={onPress}>
      <Text
        style={isBlue || isGray ? styles.smallTextLight : styles.smallTextDark}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnBlue: {
    width: 72,
    height: 72,
    borderRadius: 14,
    backgroundColor: '#678983',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  btnDark: {
    width: 72,
    height: 72,
    borderRadius: 14,
    backgroundColor: '#2E2F38',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  btnLight: {
    width: 72,
    height: 72,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  smallTextLight: {
    fontSize: 32,
    color: '#FFFFFF',
  },
  smallTextDark: {
    fontSize: 32,
    color: '#000000',
  },
});
