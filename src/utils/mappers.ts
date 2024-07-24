import { Message, UserType } from '@chatty/__generated__/graphql';
import { IChatMessage, User } from 'react-native-gifted-chat';

export const mapToGiftedMessages = (messages: Message[]): IChatMessage[] => {
  return messages.map(message => {
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
  });
};

export const mapUserToGifted = (user?: UserType | null) => {
  if (!user) return undefined;

  return {
    _id: user.id ?? '',
    name: user.firstName ?? '',
    avatar: user.email ?? '',
  } satisfies User;
};
