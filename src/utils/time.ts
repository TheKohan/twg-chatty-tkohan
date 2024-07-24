import { DateTime, DurationLikeObject } from 'luxon';

export const timeAgo = (dateTime: Date) => {
  const now = DateTime.now();
  const dt = DateTime.fromJSDate(dateTime);

  const diff: DurationLikeObject = now
    .diff(dt, ['months', 'days', 'hours', 'minutes', 'seconds'])
    .toObject();

  if (diff.months && diff.months >= 1) {
    return `${Math.floor(diff.months)}mo ago`;
  } else if (diff.days && diff.days >= 1) {
    return `${Math.floor(diff.days)}d ago`;
  } else if (diff.hours && diff.hours >= 1) {
    return `${Math.floor(diff.hours)}h ago`;
  } else if (diff.minutes && diff.minutes >= 1) {
    return `${Math.floor(diff.minutes)}m ago`;
  } else {
    return 'just now';
  }
};
