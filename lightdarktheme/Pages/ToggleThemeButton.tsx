import React from 'react';
import {Switch, StyleSheet, View} from 'react-native';

type Props = {
  isDarkTheme: boolean;
  onToggleTheme: () => void;
};

const ToggleThemeButton: React.FC<Props> = ({isDarkTheme, onToggleTheme}) => {
  const trackColor = {
    false: '#d3d3d3',
    true: '#888888',
  };

  const thumbColor = isDarkTheme ? 'lightgrey' : 'black';

  return (
    <View style={styles.container}>
      <Switch
        value={isDarkTheme}
        onValueChange={onToggleTheme}
        trackColor={trackColor}
        thumbColor={thumbColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 10,
  },
});

export default ToggleThemeButton;
