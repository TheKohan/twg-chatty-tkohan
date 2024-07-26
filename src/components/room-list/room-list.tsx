import { RoomsType } from '@chatty/__generated__/graphql';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { RoomItem } from './room-item';
import { View } from 'react-native';
import { Typography } from '../typography';
import { colors } from '@chatty/theme';

export const RoomList: React.FC<{ userRooms: RoomsType }> = ({ userRooms }) => {
  return (
    <>
      {userRooms.rooms && userRooms.rooms.length > 0 ? (
        <FlatList
          data={userRooms.rooms}
          keyExtractor={room => room?.id ?? ''}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({ item }) => (item ? <RoomItem room={item} /> : null)}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Typography variant='h4' color='plum500'>
            No rooms found
          </Typography>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    gap: 12,
    paddingTop: 36,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue100,
  },
});
