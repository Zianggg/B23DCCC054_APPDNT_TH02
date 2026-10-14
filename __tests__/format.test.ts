import {
  formatChatTime,
  formatPresence,
  formatRelativeTime,
  getInitials,
  matchesSearch,
  normalizeSearch,
} from '../src/lib/format';

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
// Thứ Tư 14/10/2026 15:30 giờ máy
const NOW = new Date(2026, 9, 14, 15, 30).getTime();

describe('formatChatTime', () => {
  test('cùng ngày → giờ:phút', () => {
    expect(formatChatTime(new Date(2026, 9, 14, 9, 5).getTime(), NOW)).toBe(
      '09:05',
    );
  });
  test('hôm qua', () => {
    expect(formatChatTime(new Date(2026, 9, 13, 23, 0).getTime(), NOW)).toBe(
      'Hôm qua',
    );
  });
  test('trong tuần → thứ', () => {
    expect(formatChatTime(new Date(2026, 9, 11, 10, 0).getTime(), NOW)).toBe(
      'CN',
    );
  });
  test('cũ hơn một tuần → ngày/tháng', () => {
    expect(formatChatTime(new Date(2026, 8, 2, 10, 0).getTime(), NOW)).toBe(
      '02/09',
    );
  });
});

describe('formatRelativeTime', () => {
  test.each([
    [NOW - 10 * 1000, 'Vừa xong'],
    [NOW - 5 * MINUTE, '5 phút trước'],
    [NOW - 3 * HOUR, '3 giờ trước'],
    [NOW - 3 * DAY, '3 ngày trước'],
  ])('%p → %p', (ts, expected) => {
    expect(formatRelativeTime(ts, NOW)).toBe(expected);
  });
});

describe('formatPresence', () => {
  test('online', () => {
    expect(formatPresence(true, 0, NOW)).toBe('Đang hoạt động');
  });
  test('offline theo phút / giờ / ngày', () => {
    expect(formatPresence(false, NOW - 15 * MINUTE, NOW)).toBe(
      'Hoạt động 15 phút trước',
    );
    expect(formatPresence(false, NOW - 2 * HOUR, NOW)).toBe(
      'Hoạt động 2 giờ trước',
    );
    expect(formatPresence(false, NOW - 3 * DAY, NOW)).toBe(
      'Hoạt động 3 ngày trước',
    );
  });
});

describe('tìm kiếm tiếng Việt', () => {
  test('bỏ dấu và chữ hoa', () => {
    expect(normalizeSearch('Đặng Mai PHƯƠNG')).toBe('dang mai phuong');
  });
  test('gõ không dấu vẫn tìm ra tên có dấu', () => {
    expect(matchesSearch('phuong', 'Đặng Mai Phương')).toBe(true);
    expect(matchesSearch('minh anh', 'Trần Minh Anh')).toBe(true);
    expect(matchesSearch('huy', 'Trần Minh Anh', 'tin nhắn')).toBe(false);
  });
  test('chuỗi rỗng khớp tất cả', () => {
    expect(matchesSearch('  ', 'bất kỳ')).toBe(true);
  });
});

test('getInitials lấy 2 chữ cuối', () => {
  expect(getInitials('Trần Minh Anh')).toBe('MA');
  expect(getInitials('Long')).toBe('L');
});
