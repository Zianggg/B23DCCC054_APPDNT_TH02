import {
  chatReducer,
  sortConversations,
  type ChatState,
} from '../src/store/chatReducer';
import { notificationReducer } from '../src/store/notificationReducer';
import type { AppNotification, Message } from '../src/types';

const message = (id: string, senderId: string, createdAt: number): Message => ({
  id,
  senderId,
  text: `tin ${id}`,
  createdAt,
});

const initialChat = (): ChatState => ({
  conversations: [
    {
      id: 'c1',
      userId: 'u1',
      unreadCount: 2,
      messages: [message('a', 'u1', 100)],
    },
    {
      id: 'c2',
      userId: 'u2',
      unreadCount: 0,
      messages: [message('b', 'me', 200)],
    },
  ],
});

describe('chatReducer', () => {
  test('gửi tin: thêm vào cuối và xoá số chưa đọc', () => {
    const state = chatReducer(initialChat(), {
      type: 'send',
      conversationId: 'c1',
      message: message('x', 'me', 300),
    });
    const c1 = state.conversations[0];
    expect(c1.messages.map(m => m.id)).toEqual(['a', 'x']);
    expect(c1.unreadCount).toBe(0);
  });

  test('nhận tin khi không mở cuộc trò chuyện → tăng chưa đọc', () => {
    const state = chatReducer(initialChat(), {
      type: 'receive',
      conversationId: 'c2',
      message: message('y', 'u2', 300),
      markAsRead: false,
    });
    expect(state.conversations[1].unreadCount).toBe(1);
  });

  test('nhận tin khi đang mở → vẫn là đã đọc', () => {
    const state = chatReducer(initialChat(), {
      type: 'receive',
      conversationId: 'c1',
      message: message('y', 'u1', 300),
      markAsRead: true,
    });
    expect(state.conversations[0].unreadCount).toBe(0);
  });

  test('markRead giữ nguyên state nếu đã đọc', () => {
    const start = initialChat();
    expect(chatReducer(start, { type: 'markRead', conversationId: 'c2' })).toBe(
      start,
    );
    expect(
      chatReducer(start, { type: 'markRead', conversationId: 'c1' })
        .conversations[0].unreadCount,
    ).toBe(0);
  });

  test('create không tạo trùng cuộc trò chuyện với cùng người', () => {
    const start = initialChat();
    expect(
      chatReducer(start, {
        type: 'create',
        conversationId: 'cx',
        userId: 'u1',
      }),
    ).toBe(start);
    const next = chatReducer(start, {
      type: 'create',
      conversationId: 'c-u3',
      userId: 'u3',
    });
    expect(next.conversations).toHaveLength(3);
  });

  test('sortConversations: bỏ cuộc trò chuyện rỗng, mới nhất lên đầu', () => {
    const withEmpty = chatReducer(initialChat(), {
      type: 'create',
      conversationId: 'c-u3',
      userId: 'u3',
    });
    expect(sortConversations(withEmpty.conversations).map(c => c.id)).toEqual([
      'c2',
      'c1',
    ]);
  });
});

describe('notificationReducer', () => {
  const items: AppNotification[] = [
    { id: 'n1', type: 'message', content: 'a', createdAt: 1, read: false },
    { id: 'n2', type: 'system', content: 'b', createdAt: 2, read: true },
    { id: 'n3', type: 'friend', content: 'c', createdAt: 3, read: false },
  ];

  test('đánh dấu một thông báo đã đọc', () => {
    const next = notificationReducer(items, { type: 'markRead', id: 'n1' });
    expect(next.map(n => n.read)).toEqual([true, true, false]);
  });

  test('đổi trạng thái đã đọc/chưa đọc', () => {
    const next = notificationReducer(items, { type: 'toggleRead', id: 'n2' });
    expect(next[1].read).toBe(false);
  });

  test('đánh dấu tất cả đã đọc', () => {
    const next = notificationReducer(items, { type: 'markAllRead' });
    expect(next.every(n => n.read)).toBe(true);
    expect(notificationReducer(next, { type: 'markAllRead' })).toBe(next);
  });
});
