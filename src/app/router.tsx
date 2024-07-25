import { Header } from '@chatty/components';
import { Login, Room, Rooms, SignUp } from '@chatty/screens';
import { RootStackParamList } from '@chatty/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC } from 'react';

const Stack = createNativeStackNavigator<RootStackParamList>();

type RouterProps = {
  isAuthenticated: boolean;
};

export const Router: FC<RouterProps> = ({ isAuthenticated }) => {
  return (
    <Stack.Navigator initialRouteName='Rooms'>
      {!!isAuthenticated ? (
        // For more sophisticated routing setup you could make some
        // config and map it here, but it's overkill for 4 routes
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
