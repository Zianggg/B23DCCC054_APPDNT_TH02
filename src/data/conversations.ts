import type { Conversation, Message } from '@/types';

import { ME_ID } from './accounts';
import { daysAgo, hoursAgo, minutesAgo } from './time';

let seq = 0;
const msg = (senderId: string, text: string, createdAt: number): Message => ({
  id: `seed-${++seq}`,
  senderId,
  text,
  createdAt,
});

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    userId: 'u1',
    unreadCount: 3,
    messages: [
      msg(
        ME_ID,
        'Minh Anh ơi, bài thực hành React Native nộp hạn khi nào nhỉ?',
        minutesAgo(48),
      ),
      msg(
        'u1',
        'Hạn là tối thứ 6 nha, nộp lên hệ thống của lớp.',
        minutesAgo(40),
      ),
      msg(
        'u1',
        'Nhớ làm đủ 5 màn hình: đăng nhập, home, danh bạ, thông báo, cài đặt.',
        minutesAgo(39),
      ),
      msg('u1', 'Có cần mình gửi file đề không?', minutesAgo(5)),
    ],
  },
  {
    id: 'c2',
    userId: 'u2',
    unreadCount: 1,
    messages: [
      msg('u2', 'Chiều nay đá bóng không ông?', hoursAgo(1)),
      msg(ME_ID, 'Mấy giờ thế?', minutesAgo(50)),
      msg('u2', '5h30 ở sân trường nhé, nhớ mang giày.', minutesAgo(22)),
    ],
  },
  {
    id: 'c3',
    userId: 'u3',
    unreadCount: 0,
    messages: [
      msg('u3', 'Cảm ơn bạn đã gửi tài liệu nhé!', hoursAgo(3)),
      msg(ME_ID, 'Không có gì, có gì chưa hiểu cứ hỏi mình.', hoursAgo(2.8)),
    ],
  },
  {
    id: 'c4',
    userId: 'u4',
    unreadCount: 5,
    messages: [
      msg(ME_ID, 'Huy xem giúp mình lỗi Gradle này với.', hoursAgo(6)),
      msg(
        'u4',
        'Bạn thử xoá thư mục android/build rồi build lại xem.',
        hoursAgo(5.9),
      ),
      msg('u4', 'Hoặc chạy gradlew clean trước.', hoursAgo(5.8)),
      msg('u4', 'Nhớ kiểm tra JAVA_HOME trỏ đúng JDK 17.', hoursAgo(5.8)),
      msg('u4', 'Được chưa?', hoursAgo(4)),
      msg('u4', 'Alo alo 😄', hoursAgo(1.5)),
    ],
  },
  {
    id: 'c5',
    userId: 'u5',
    unreadCount: 0,
    messages: [
      msg('u5', 'Mai nhóm mình họp lúc 9h nhé.', daysAgo(1)),
      msg(ME_ID, 'Ok, mình sẽ chuẩn bị slide.', daysAgo(1)),
    ],
  },
  {
    id: 'c6',
    userId: 'u7',
    unreadCount: 0,
    messages: [
      msg(
        'u7',
        'Bạn ơi cho mình mượn vở ghi môn Cấu trúc dữ liệu với.',
        daysAgo(2),
      ),
      msg(ME_ID, 'Được nha, mai mình mang lên lớp.', daysAgo(2)),
      msg('u7', 'Tuyệt vời, cảm ơn nhiều!', daysAgo(2)),
    ],
  },
  {
    id: 'c7',
    userId: 'u9',
    unreadCount: 2,
    messages: [
      msg('u9', 'Chúc mừng sinh nhật nha 🎉', daysAgo(4)),
      msg('u9', 'Tối nay đi ăn lẩu không?', daysAgo(4)),
    ],
  },
  {
    id: 'c8',
    userId: 'u6',
    unreadCount: 0,
    messages: [
      msg(ME_ID, 'Khải ơi, link tài liệu hôm trước là gì vậy?', daysAgo(9)),
      msg('u6', 'Trang reactnative.dev, mục Getting Started nhé.', daysAgo(9)),
    ],
  },
  {
    id: 'c9',
    userId: 'u12',
    unreadCount: 0,
    messages: [
      msg(
        'u12',
        'Tuần sau có buổi seminar về AI, bạn đăng ký chưa?',
        daysAgo(12),
      ),
      msg(ME_ID, 'Chưa, để mình đăng ký luôn.', daysAgo(12)),
    ],
  },
];

/** Câu trả lời tự động khi người dùng gửi tin (giả lập bạn chat phản hồi). */
export const AUTO_REPLIES = [
  'Ok bạn nhé 👍',
  'Mình đã nhận được tin nhắn rồi.',
  'Haha, chuẩn luôn!',
  'Để mình xem lại rồi báo bạn sau nha.',
  'Cảm ơn bạn nhiều!',
  'Thế à, kể thêm đi 😄',
  'Mai gặp nhau trên lớp nói tiếp nhé.',
];
