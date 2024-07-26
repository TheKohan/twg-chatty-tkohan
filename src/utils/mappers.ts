import type { Message, UserType } from '@chatty/__generated__/graphql';
import type { IChatMessage, User } from 'react-native-gifted-chat';

export const mapToGiftedMessage = (message: Message): IChatMessage => {
  return {
    _id: message.id ?? '',
    text: message.body ?? '',
    createdAt: new Date(message.insertedAt ?? ''),
    user: {
      _id: message.user?.id ?? '',
      name: message.user?.firstName ?? '',
      avatar: message.user?.email ?? '',
    },
  } satisfies IChatMessage;
};

export const mapUserToGifted = (user?: UserType | null) => {
  if (!user) return undefined;

  return {
    _id: user.id ?? '',
    name: user.firstName ?? '',
    avatar: user.email ?? '',
  } satisfies User;
};
