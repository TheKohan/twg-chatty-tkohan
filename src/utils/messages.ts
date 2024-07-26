import { Message } from '@chatty/__generated__/graphql';

export const getUserNameFromMessages = (myId: string, messages: Message[]) => {
  const otherUser = messages.find(m => m.user?.id !== myId);
  const firstName = otherUser?.user?.firstName ?? '';
  const lastName = otherUser?.user?.lastName ?? '';
  return firstName && lastName ? `${firstName} ${lastName}` : 'Unknown user';
};
