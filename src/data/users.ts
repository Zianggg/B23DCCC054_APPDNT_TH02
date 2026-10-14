import type { User } from '@/types';

import { daysAgo, hoursAgo, minutesAgo } from './time';

export const USERS: User[] = [
  {
    id: 'u1',
    name: 'Trần Minh Anh',
    phone: '0901 111 222',
    online: true,
    lastSeen: minutesAgo(0),
  },
  {
    id: 'u2',
    name: 'Lê Hoàng Nam',
    phone: '0902 222 333',
    online: true,
    lastSeen: minutesAgo(0),
  },
  {
    id: 'u3',
    name: 'Phạm Thu Hà',
    phone: '0903 333 444',
    online: false,
    lastSeen: minutesAgo(15),
  },
  {
    id: 'u4',
    name: 'Nguyễn Đức Huy',
    phone: '0904 444 555',
    online: true,
    lastSeen: minutesAgo(0),
  },
  {
    id: 'u5',
    name: 'Vũ Ngọc Lan',
    phone: '0905 555 666',
    online: false,
    lastSeen: hoursAgo(2),
  },
  {
    id: 'u6',
    name: 'Đỗ Quang Khải',
    phone: '0906 666 777',
    online: false,
    lastSeen: daysAgo(1),
  },
  {
    id: 'u7',
    name: 'Hoàng Bảo Ngọc',
    phone: '0907 777 888',
    online: true,
    lastSeen: minutesAgo(0),
  },
  {
    id: 'u8',
    name: 'Bùi Tiến Dũng',
    phone: '0908 888 999',
    online: false,
    lastSeen: minutesAgo(32),
  },
  {
    id: 'u9',
    name: 'Đặng Mai Phương',
    phone: '0909 999 000',
    online: true,
    lastSeen: minutesAgo(0),
  },
  {
    id: 'u10',
    name: 'Ngô Thanh Tùng',
    phone: '0910 000 111',
    online: false,
    lastSeen: daysAgo(3),
  },
  {
    id: 'u11',
    name: 'Lý Gia Hân',
    phone: '0911 222 444',
    online: false,
    lastSeen: hoursAgo(5),
  },
  {
    id: 'u12',
    name: 'Trịnh Văn Long',
    phone: '0912 444 666',
    online: true,
    lastSeen: minutesAgo(0),
  },
  {
    id: 'u13',
    name: 'Mai Khánh Linh',
    phone: '0913 666 888',
    online: false,
    lastSeen: hoursAgo(9),
  },
  {
    id: 'u14',
    name: 'Cao Nhật Minh',
    phone: '0914 888 000',
    online: false,
    lastSeen: daysAgo(6),
  },
];

export const USERS_BY_ID: Record<string, User> = Object.fromEntries(
  USERS.map(user => [user.id, user]),
);
