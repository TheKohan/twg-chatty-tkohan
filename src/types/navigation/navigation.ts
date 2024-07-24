import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Rooms: undefined;
  Room: { roomId: string; roomName: string };
  Login: undefined;
};

export type RoomsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Room'
>;
export type RoomNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Rooms'
>;

export type RoomsRouteProp = RouteProp<RootStackParamList, 'Rooms'>;

export type RoomRouteProp = RouteProp<RootStackParamList, 'Room'>;
