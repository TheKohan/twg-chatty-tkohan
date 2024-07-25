import { RoomsType } from '@chatty/__generated__/graphql';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { RoomItem } from './room-item';

export const RoomList: React.FC<{ userRooms: RoomsType }> = ({ userRooms }) => {
  return (
    <FlatList
      data={userRooms.rooms}
      keyExtractor={room => room?.id ?? ''}
      contentContainerStyle={styles.flatListContainer}
      renderItem={({ item }) => (item ? <RoomItem room={item} /> : null)}
    />
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    gap: 12,
    paddingTop: 36,
  },
});
