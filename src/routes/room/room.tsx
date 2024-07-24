import { RoomNavigationProp, RoomRouteProp } from '@chatty/app';
import { Button } from '@chatty/components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';

export const Room = () => {
  const navigation = useNavigation<RoomNavigationProp>();
  const { params } = useRoute<RoomRouteProp>();

  return (
    <View style={{ flex: 1 }}>
      <Text>Room {params.roomId}</Text>
      <Button
        variant='primary'
        label='Go to rooms'
        onPress={() => navigation.navigate('Rooms')}
      />
    </View>
  );
};
