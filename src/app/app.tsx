import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Rooms, Room, Login } from '@chatty/screens';
import { RootStackParamList } from '@chatty/types';
import { Header } from '@chatty/components';

//@TODO: export this possibly
const Stack = createNativeStackNavigator<RootStackParamList>();

//@TODO error boundary

export const App = () => {
  const isAuth = false; //For now

  return (
    <Stack.Navigator initialRouteName='Rooms'>
      {isAuth ? (
        <>
          <Stack.Screen
            options={{
              header: Header,
            }}
            name='Rooms'
            component={Rooms}
          />
          <Stack.Screen
            options={{
              header: Header,
            }}
            name='Room'
            component={Room}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            options={{ header: () => null }}
            name='Login'
            component={Login}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
