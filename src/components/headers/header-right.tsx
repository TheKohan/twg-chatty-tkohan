import { borders, colors } from '@chatty/theme';
import React, { type FC } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '../icon';
import type { RoomParams } from './header';
import Ionicons from '@expo/vector-icons/Ionicons';

type HeaderRightProps = {
  roomParams: RoomParams | null;
  onLogout: () => void;
};

export const HeaderRight: FC<HeaderRightProps> = ({ roomParams, onLogout }) => (
  <View style={styles.iconContainer}>
    {roomParams ? (
      <>
        <Icon.phone />
        <Icon.videocall />
      </>
    ) : (
      <>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Ionicons name='log-out-outline' size={30} color={colors.plum500} />
        </TouchableOpacity>
        <Icon.search />
        <Icon.rooms />
      </>
    )}
  </View>
);

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoutButton: {
    backgroundColor: colors.white,
    borderRadius: 100,
    padding: 8,
  },
});
