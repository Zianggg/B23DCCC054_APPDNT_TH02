const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

const pad = (n: number) => String(n).padStart(2, '0');

const startOfDay = (ts: number) => {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

/** Số ngày lịch giữa hai mốc (0 = cùng ngày, 1 = hôm qua, …). */
const calendarDaysBetween = (ts: number, now: number) =>
  Math.round((startOfDay(now) - startOfDay(ts)) / DAY);

export const formatClock = (ts: number) => {
  const d = new Date(ts);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export const formatDate = (ts: number) => {
  const d = new Date(ts);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

/** Thời gian ở danh sách chat: "14:05", "Hôm qua", "T3", "02/10". */
export function formatChatTime(ts: number, now = Date.now()) {
  const days = calendarDaysBetween(ts, now);
  if (days <= 0) return formatClock(ts);
  if (days === 1) return 'Hôm qua';
  if (days < 7) return WEEKDAYS[new Date(ts).getDay()];
  const d = new Date(ts);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;
}

/** Thời gian tương đối cho thông báo: "Vừa xong", "5 phút trước", "Hôm qua 09:30". */
export function formatRelativeTime(ts: number, now = Date.now()) {
  const diff = Math.max(0, now - ts);
  if (diff < MINUTE) return 'Vừa xong';
  if (diff < HOUR) return `${Math.floor(diff / MINUTE)} phút trước`;
  const days = calendarDaysBetween(ts, now);
  if (days === 0) return `${Math.floor(diff / HOUR)} giờ trước`;
  if (days === 1) return `Hôm qua lúc ${formatClock(ts)}`;
  if (days < 7) return `${days} ngày trước`;
  return formatDate(ts);
}

/** Trạng thái trực tuyến: "Đang hoạt động" / "Hoạt động 15 phút trước". */
export function formatPresence(
  online: boolean,
  lastSeen: number,
  now = Date.now(),
) {
  if (online) return 'Đang hoạt động';
  const diff = Math.max(0, now - lastSeen);
  if (diff < HOUR)
    return `Hoạt động ${Math.max(1, Math.floor(diff / MINUTE))} phút trước`;
  if (diff < DAY) return `Hoạt động ${Math.floor(diff / HOUR)} giờ trước`;
  return `Hoạt động ${Math.floor(diff / DAY)} ngày trước`;
}

/** Chữ cái đầu của họ tên cuối, ví dụ "Trần Minh Anh" → "MA". */
export function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return parts
    .slice(-2)
    .map(part => part[0])
    .join('')
    .toUpperCase();
}

const VI_DIACRITICS: [RegExp, string][] = [
  [/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a'],
  [/[èéẹẻẽêềếệểễ]/g, 'e'],
  [/[ìíịỉĩ]/g, 'i'],
  [/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o'],
  [/[ùúụủũưừứựửữ]/g, 'u'],
  [/[ỳýỵỷỹ]/g, 'y'],
  [/đ/g, 'd'],
];

/** Chuẩn hoá chuỗi để tìm kiếm không phân biệt hoa thường và dấu tiếng Việt. */
export function normalizeSearch(text: string) {
  let result = text.toLowerCase().trim();
  for (const [pattern, replacement] of VI_DIACRITICS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

export function matchesSearch(query: string, ...fields: string[]) {
  const q = normalizeSearch(query);
  if (!q) return true;
  return fields.some(field => normalizeSearch(field).includes(q));
}
