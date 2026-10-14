import type { Conversation, Message } from '@/types';

export type ChatState = { conversations: Conversation[] };

export type ChatAction =
  | { type: 'send'; conversationId: string; message: Message }
  | {
      type: 'receive';
      conversationId: string;
      message: Message;
      markAsRead: boolean;
    }
  | { type: 'markRead'; conversationId: string }
  | { type: 'create'; conversationId: string; userId: string };

const updateConversation = (
  state: ChatState,
  id: string,
  update: (conversation: Conversation) => Conversation,
): ChatState => ({
  conversations: state.conversations.map(item =>
    item.id === id ? update(item) : item,
  ),
});

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'send':
      return updateConversation(state, action.conversationId, item => ({
        ...item,
        // Người dùng trả lời thì coi như đã đọc hết.
        unreadCount: 0,
        messages: [...item.messages, action.message],
      }));
    case 'receive':
      return updateConversation(state, action.conversationId, item => ({
        ...item,
        unreadCount: action.markAsRead ? 0 : item.unreadCount + 1,
        messages: [...item.messages, action.message],
      }));
    case 'markRead': {
      const target = state.conversations.find(
        item => item.id === action.conversationId,
      );
      if (!target || target.unreadCount === 0) return state;
      return updateConversation(state, action.conversationId, item => ({
        ...item,
        unreadCount: 0,
      }));
    }
    case 'create':
      if (state.conversations.some(item => item.userId === action.userId))
        return state;
      return {
        conversations: [
          ...state.conversations,
          {
            id: action.conversationId,
            userId: action.userId,
            unreadCount: 0,
            messages: [],
          },
        ],
      };
    default:
      return state;
  }
}

export const lastMessageOf = (
  conversation: Conversation,
): Message | undefined =>
  conversation.messages[conversation.messages.length - 1];

/** Cuộc trò chuyện có tin nhắn, mới nhất lên đầu. */
export function sortConversations(conversations: Conversation[]) {
  return conversations
    .filter(item => item.messages.length > 0)
    .sort(
      (a, b) =>
        (lastMessageOf(b)?.createdAt ?? 0) - (lastMessageOf(a)?.createdAt ?? 0),
    );
}
