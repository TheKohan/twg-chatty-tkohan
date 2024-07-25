import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Rooms, Room, Login, SignUp } from '@chatty/screens';
import { RootStackParamList } from '@chatty/types';
import { Header } from '@chatty/components';
import { useAuth } from '@chatty/context';

//@TODO: export this possibly
const Stack = createNativeStackNavigator<RootStackParamList>();

//@TODO error boundary

export const App = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator initialRouteName='Rooms'>
      {!!user ? (
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
          <Stack.Screen
            options={{ header: () => null }}
            name='SignUp'
            component={SignUp}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
