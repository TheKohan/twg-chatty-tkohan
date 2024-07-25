import { borders, colors } from '@chatty/theme';
import React, { FC, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Icon } from '../icon';

export const TypingIndicator: FC = () => {
  const dot1 = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot3 = useSharedValue(0);

  useEffect(() => {
    const animateDot = (dot: Animated.SharedValue<number>, delay: number) => {
      dot.value = withRepeat(
        withSequence(
          withTiming(2, { duration: 300, easing: Easing.ease }),
          withTiming(-2, { duration: 300, easing: Easing.ease })
        ),
        -1,
        true
      );
    };
    setTimeout(() => animateDot(dot1, 0), 0);
    setTimeout(() => animateDot(dot2, 150), 150);
    setTimeout(() => animateDot(dot3, 300), 300);
  }, []);

  const animatedStyleDot1 = useAnimatedStyle(() => ({
    transform: [{ translateY: dot1.value }],
  }));

  const animatedStyleDot2 = useAnimatedStyle(() => ({
    transform: [{ translateY: dot2.value }],
  }));

  const animatedStyleDot3 = useAnimatedStyle(() => ({
    transform: [{ translateY: dot3.value }],
  }));

  return (
    <View style={styles.container}>
      <Icon.profile width={24} height={24} />
      <View style={styles.bubble}>
        <Animated.View style={[styles.dot, animatedStyleDot1]} />
        <Animated.View style={[styles.dot, animatedStyleDot2]} />
        <Animated.View style={[styles.dot, animatedStyleDot3]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
  },
  bubble: {
    backgroundColor: colors.white,
    borderRadius: borders.sm,
    borderBottomLeftRadius: 0,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.blue300,
    marginHorizontal: 4,
  },
});
