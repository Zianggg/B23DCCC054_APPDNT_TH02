import type { Account } from '@/types';

import { daysAgo } from './time';

/** ID của người dùng hiện tại trong mọi cuộc trò chuyện. */
export const ME_ID = 'me';

/** Tài khoản mẫu dùng để đăng nhập (không có máy chủ). */
export const ACCOUNTS: Account[] = [
  {
    id: ME_ID,
    username: 'b23dccc054',
    password: '123456',
    name: 'Sinh viên B23DCCC054',
    studentId: 'B23DCCC054',
    email: 'b23dccc054@example.com',
    phone: '0912 345 678',
    joinedAt: daysAgo(420),
  },
  {
    id: ME_ID,
    username: 'admin',
    password: 'admin123',
    name: 'Quản trị viên',
    studentId: 'ADMIN',
    email: 'admin@example.com',
    phone: '0987 654 321',
    joinedAt: daysAgo(900),
  },
];

export const DEMO_ACCOUNT = ACCOUNTS[0];
