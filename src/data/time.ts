/** Mốc thời gian khi mở app — dữ liệu mẫu tính lùi từ đây để luôn "mới". */
const NOW = Date.now();
const MINUTE = 60 * 1000;

export const minutesAgo = (minutes: number) => NOW - minutes * MINUTE;
export const hoursAgo = (hours: number) => minutesAgo(hours * 60);
export const daysAgo = (days: number) => hoursAgo(days * 24);
