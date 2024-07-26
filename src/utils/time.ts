import { DateTime } from 'luxon';

export const timeAgoFromUTC = (date: DateTime) => {
  const now = DateTime.utc();
  const diff = now.diff(date, [
    'years',
    'months',
    'days',
    'hours',
    'minutes',
    'seconds',
  ]);

  if (diff.years >= 1) return `${Math.floor(diff.years)}y ago`;
  if (diff.months >= 1) return `${Math.floor(diff.months)}mo ago`;
  if (diff.days >= 1) return `${Math.floor(diff.days)}d ago`;
  if (diff.hours >= 1) return `${Math.floor(diff.hours)}h ago`;
  if (diff.minutes >= 1) return `${Math.floor(diff.minutes)}m ago`;
  return 'just now';
};

export const dateTimeFromUTCString = (dateString: string) => {
  return DateTime.fromFormat(dateString, 'yyyy-MM-dd HH:mm:ss', {
    zone: 'utc',
  });
};
