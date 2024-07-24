import { useQuery } from '@apollo/client';
import { RoomsNavigationProp } from '@chatty/types';
import { Button } from '@chatty/components';
import { GET_ROOMS } from '@chatty/graphql';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';

export const Rooms = () => {
  const navigation = useNavigation<RoomsNavigationProp>();
  const { loading, error, data } = useQuery(GET_ROOMS);

  return (
    <View style={{ flex: 1 }}>
      <Text>Rooms</Text>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error!</Text>}
      {data && <Text>{JSON.stringify(data)}</Text>}
      <Button
        variant='primary'
        label='Go to random room'
        onPress={() => navigation.navigate('Room', { roomId: 21 })}
      />
    </View>
  );
};
