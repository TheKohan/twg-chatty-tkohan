import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Rooms, Room } from '@chatty/screens';
import { RootStackParamList } from '@chatty/types';
import { Header } from '@chatty/components';

//@TODO: export this
const Stack = createNativeStackNavigator<RootStackParamList>();

export const App = () => {
  return (
    <Stack.Navigator initialRouteName='Rooms'>
      <Stack.Screen
        options={{ header: Header }}
        name='Rooms'
        component={Rooms}
      />
      <Stack.Screen options={{ header: Header }} name='Room' component={Room} />
    </Stack.Navigator>
  );
};
