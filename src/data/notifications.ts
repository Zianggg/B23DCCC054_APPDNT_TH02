import type { AppNotification } from '@/types';

import { daysAgo, hoursAgo, minutesAgo } from './time';

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    type: 'message',
    content: 'Trần Minh Anh đã gửi cho bạn 3 tin nhắn mới.',
    createdAt: minutesAgo(5),
    read: false,
  },
  {
    id: 'n2',
    type: 'friend',
    content: 'Mai Khánh Linh đã gửi cho bạn lời mời kết bạn.',
    createdAt: minutesAgo(35),
    read: false,
  },
  {
    id: 'n3',
    type: 'group',
    content: 'Bạn được thêm vào nhóm "Lập trình di động - Nhóm 5".',
    createdAt: hoursAgo(2),
    read: false,
  },
  {
    id: 'n4',
    type: 'security',
    content: 'Tài khoản của bạn vừa đăng nhập trên một thiết bị Android mới.',
    createdAt: hoursAgo(5),
    read: false,
  },
  {
    id: 'n5',
    type: 'message',
    content: 'Nguyễn Đức Huy đã nhắc đến bạn trong một tin nhắn.',
    createdAt: hoursAgo(8),
    read: true,
  },
  {
    id: 'n6',
    type: 'system',
    content: 'ChatApp đã cập nhật phiên bản 1.0 với giao diện mới.',
    createdAt: daysAgo(1),
    read: true,
  },
  {
    id: 'n7',
    type: 'friend',
    content: 'Cao Nhật Minh đã chấp nhận lời mời kết bạn của bạn.',
    createdAt: daysAgo(2),
    read: false,
  },
  {
    id: 'n8',
    type: 'group',
    content: 'Nhóm "CLB Bóng đá" có 12 tin nhắn mới.',
    createdAt: daysAgo(3),
    read: true,
  },
  {
    id: 'n9',
    type: 'system',
    content: 'Hãy bật thông báo để không bỏ lỡ tin nhắn quan trọng.',
    createdAt: daysAgo(5),
    read: true,
  },
  {
    id: 'n10',
    type: 'security',
    content: 'Mật khẩu của bạn đã được thay đổi thành công.',
    createdAt: daysAgo(14),
    read: true,
  },
];
