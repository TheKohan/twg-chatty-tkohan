import { RoomsNavigationProp } from '@chatty/app';
import { Button } from '@chatty/components';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';

export const Rooms = () => {
  const navigation = useNavigation<RoomsNavigationProp>();

  return (
    <View style={{ flex: 1 }}>
      <Text>Rooms</Text>
      <Button
        variant='primary'
        label='Go to random room'
        onPress={() => navigation.navigate('Room', { roomId: 21 })}
      />
    </View>
  );
};
