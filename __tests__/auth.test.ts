import { authenticate, validateLogin } from '../src/lib/auth';

describe('validateLogin', () => {
  test('báo lỗi khi để trống cả hai ô', () => {
    expect(validateLogin('', '')).toEqual({
      username: 'Vui lòng nhập tài khoản',
      password: 'Vui lòng nhập mật khẩu',
    });
  });

  test('tài khoản chỉ có khoảng trắng vẫn tính là trống', () => {
    expect(validateLogin('   ', '123456').username).toBeDefined();
  });

  test('không lỗi khi nhập đủ', () => {
    expect(validateLogin('b23dccc054', '123456')).toEqual({});
  });
});

describe('authenticate', () => {
  test('đăng nhập đúng tài khoản mẫu (không phân biệt hoa thường, bỏ khoảng trắng)', () => {
    const result = authenticate('  B23DCCC054 ', '123456');
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.user.username).toBe('b23dccc054');
      expect(result.user).not.toHaveProperty('password');
    }
  });

  test('sai mật khẩu', () => {
    expect(authenticate('b23dccc054', 'sai')).toEqual({
      ok: false,
      error: 'Tài khoản hoặc mật khẩu không đúng',
    });
  });

  test('tài khoản không tồn tại', () => {
    expect(authenticate('khongco', '123456').ok).toBe(false);
  });
});
