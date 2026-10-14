export type User = {
  id: string;
  name: string;
  phone: string;
  online: boolean;
  /** Thời điểm hoạt động gần nhất (ms) — chỉ dùng khi offline. */
  lastSeen: number;
};

export type Account = {
  id: string;
  username: string;
  password: string;
  name: string;
  studentId: string;
  email: string;
  phone: string;
  joinedAt: number;
};

/** Thông tin tài khoản đã đăng nhập (không giữ mật khẩu). */
export type CurrentUser = Omit<Account, 'password'>;

export type Message = {
  id: string;
  senderId: string;
  text: string;
  createdAt: number;
};

export type Conversation = {
  id: string;
  userId: string;
  unreadCount: number;
  messages: Message[];
};

export type NotificationType =
  | 'message'
  | 'friend'
  | 'group'
  | 'system'
  | 'security';

export type AppNotification = {
  id: string;
  type: NotificationType;
  content: string;
  createdAt: number;
  read: boolean;
};
