import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

interface LoadingDotsProps {
  speechVolume: number;
}

const LoadingDots = ({speechVolume}: LoadingDotsProps) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    const normalizedVolume = Math.max(speechVolume, 0);
    const startAnimation = () => {
      const speed = 1000 / (normalizedVolume + 0.1);
      animation.setValue(0);
      Animated.timing(animation, {
        toValue: 1,
        duration: speed,
        useNativeDriver: true,
      }).start();
    };
    startAnimation();
  }, [speechVolume, animation]);

  const dot1ScaleX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.1, 0.6],
  });

  const dot2ScaleX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.8],
  });

  const dot3ScaleX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.dot, {transform: [{scaleX: dot1ScaleX}]}]}
        testID="loading-dot-1"
      />
      <Animated.View
        style={[styles.dot, {transform: [{scaleX: dot2ScaleX}]}]}
        testID="loading-dot-2"
      />
      <Animated.View
        style={[styles.dot, {transform: [{scaleX: dot3ScaleX}]}]}
        testID="loading-dot-3"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: 'black',
    marginHorizontal: 5,
  },
});

export default LoadingDots;
