import { ACCOUNTS } from '@/data/accounts';
import type { CurrentUser } from '@/types';

export type LoginErrors = { username?: string; password?: string };

/** Kiểm tra dữ liệu nhập: tài khoản và mật khẩu không được để trống. */
export function validateLogin(username: string, password: string): LoginErrors {
  const errors: LoginErrors = {};
  if (!username.trim()) errors.username = 'Vui lòng nhập tài khoản';
  if (!password) errors.password = 'Vui lòng nhập mật khẩu';
  return errors;
}

export type AuthResult =
  | { ok: true; user: CurrentUser }
  | { ok: false; error: string };

/** Đối chiếu với danh sách tài khoản mẫu (không có máy chủ). */
export function authenticate(username: string, password: string): AuthResult {
  const account = ACCOUNTS.find(
    item => item.username.toLowerCase() === username.trim().toLowerCase(),
  );
  if (!account || account.password !== password) {
    return { ok: false, error: 'Tài khoản hoặc mật khẩu không đúng' };
  }
  // Chỉ giữ thông tin hiển thị, bỏ mật khẩu.
  const user: CurrentUser = {
    id: account.id,
    username: account.username,
    name: account.name,
    studentId: account.studentId,
    email: account.email,
    phone: account.phone,
    joinedAt: account.joinedAt,
  };
  return { ok: true, user };
}
