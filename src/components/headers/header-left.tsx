import type { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from '../icon';
import { Typography } from '../typography';
import type { RoomParams } from './header';
import { Button } from '../button';

type HeaderLeftProps = {
  routeName: string;
  roomParams: RoomParams | null;
  back?: boolean;
  onBack?: () => void;
};

export const HeaderLeft: FC<HeaderLeftProps> = ({
  back,
  onBack = () => {},
  routeName,
  roomParams,
}) => (
  <View style={styles.container}>
    {back ? (
      <Button variant='icon' icon='back' onPress={onBack} />
    ) : (
      <Typography variant='h1' color='plum500'>
        {routeName}
      </Typography>
    )}
    {roomParams && <RoomInfo roomParams={roomParams} />}
  </View>
);

type RoomInfoProps = {
  roomParams: RoomParams;
};

const RoomInfo: FC<RoomInfoProps> = ({ roomParams }) => (
  <View style={styles.roomInfoContainer}>
    <Icon.profile width={44} height={44} />
    <View style={styles.roomInfoTextContainer}>
      <Typography
        numberOfLines={1}
        ellipsizeMode='tail'
        variant='h4-header'
        color='plum500'
      >
        {roomParams.roomName}
      </Typography>
      <Typography variant='bodyText' color='white'>
        Active now
      </Typography>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  roomInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  roomInfoTextContainer: {
    flex: 1,
    marginLeft: 8,
  },
});
