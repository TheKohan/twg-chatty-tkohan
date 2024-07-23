import { Button } from '@chatty/components';
import { Text, View } from 'react-native';

export const Rooms = () => {
  return (
    <View>
      <Text>Rooms</Text>
      <Button
        variant='primary'
        label='Go to random room'
        onPress={() => console.log('Room clicked')}
      />
    </View>
  );
};
