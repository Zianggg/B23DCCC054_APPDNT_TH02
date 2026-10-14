import * as React from 'react';

import { ME_ID } from '@/data/accounts';
import { AUTO_REPLIES, CONVERSATIONS } from '@/data/conversations';
import type { Conversation, Message } from '@/types';

import { chatReducer, sortConversations } from './chatReducer';

type ChatStateValue = {
  conversations: Conversation[];
  /** Đã lọc cuộc trò chuyện rỗng và sắp xếp theo tin nhắn mới nhất. */
  sortedConversations: Conversation[];
  totalUnread: number;
  typing: Record<string, boolean>;
};

type ChatActionsValue = {
  sendMessage: (conversationId: string, text: string) => void;
  markAsRead: (conversationId: string) => void;
  /** Trả về id cuộc trò chuyện với người dùng, tạo mới nếu chưa có. */
  openConversationWithUser: (userId: string) => string;
  /** Cuộc trò chuyện đang mở — tin nhắn đến sẽ không bị tính là chưa đọc. */
  setActiveConversation: (conversationId: string | null) => void;
};

const ChatStateContext = React.createContext<ChatStateValue | null>(null);
const ChatActionsContext = React.createContext<ChatActionsValue | null>(null);

let messageSeq = 0;
const createMessage = (senderId: string, text: string): Message => ({
  id: `m-${Date.now()}-${++messageSeq}`,
  senderId,
  text,
  createdAt: Date.now(),
});

const TYPING_DELAY = 700;
const REPLY_DELAY = 2200;

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(chatReducer, {
    conversations: CONVERSATIONS,
  });
  const [typing, setTyping] = React.useState<Record<string, boolean>>({});

  // Bản mới nhất của state cho các callback ổn định (timer, openConversationWithUser).
  const stateRef = React.useRef(state);
  React.useEffect(() => {
    stateRef.current = state;
  }, [state]);
  const activeIdRef = React.useRef<string | null>(null);
  const timersRef = React.useRef(
    new Map<string, ReturnType<typeof setTimeout>[]>(),
  );

  React.useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach(list => list.forEach(clearTimeout));
  }, []);

  const scheduleAutoReply = React.useCallback((conversationId: string) => {
    const timers = timersRef.current;
    timers.get(conversationId)?.forEach(clearTimeout);
    const typingTimer = setTimeout(() => {
      setTyping(prev => ({ ...prev, [conversationId]: true }));
    }, TYPING_DELAY);
    const replyTimer = setTimeout(() => {
      const conversation = stateRef.current.conversations.find(
        c => c.id === conversationId,
      );
      if (!conversation) return;
      const text =
        AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
      dispatch({
        type: 'receive',
        conversationId,
        message: createMessage(conversation.userId, text),
        markAsRead: activeIdRef.current === conversationId,
      });
      setTyping(prev => ({ ...prev, [conversationId]: false }));
      timers.delete(conversationId);
    }, REPLY_DELAY);
    timers.set(conversationId, [typingTimer, replyTimer]);
  }, []);

  const actions = React.useMemo<ChatActionsValue>(
    () => ({
      sendMessage: (conversationId, text) => {
        const trimmed = text.trim();
        if (!trimmed) return;
        dispatch({
          type: 'send',
          conversationId,
          message: createMessage(ME_ID, trimmed),
        });
        scheduleAutoReply(conversationId);
      },
      markAsRead: conversationId =>
        dispatch({ type: 'markRead', conversationId }),
      openConversationWithUser: userId => {
        const existing = stateRef.current.conversations.find(
          c => c.userId === userId,
        );
        if (existing) return existing.id;
        const conversationId = `c-${userId}`;
        dispatch({ type: 'create', conversationId, userId });
        return conversationId;
      },
      setActiveConversation: conversationId => {
        activeIdRef.current = conversationId;
      },
    }),
    [scheduleAutoReply],
  );

  const value = React.useMemo<ChatStateValue>(
    () => ({
      conversations: state.conversations,
      sortedConversations: sortConversations(state.conversations),
      totalUnread: state.conversations.reduce(
        (sum, item) => sum + item.unreadCount,
        0,
      ),
      typing,
    }),
    [state.conversations, typing],
  );

  return (
    <ChatActionsContext.Provider value={actions}>
      <ChatStateContext.Provider value={value}>
        {children}
      </ChatStateContext.Provider>
    </ChatActionsContext.Provider>
  );
}

export function useChatState() {
  const context = React.useContext(ChatStateContext);
  if (!context)
    throw new Error('useChatState phải dùng bên trong <ChatProvider>');
  return context;
}

export function useChatActions() {
  const context = React.useContext(ChatActionsContext);
  if (!context)
    throw new Error('useChatActions phải dùng bên trong <ChatProvider>');
  return context;
}
