/**
 * The API sends dates as `01.09.2026 09:00`. Lists show the day and month only
 * — the year is noise in a list of tests that all close this term.
 */
const split = (value) => {
  if (!value) return null;
  const [date, time = ''] = String(value).trim().split(' ');
  const [day, month, year] = date.split('.');
  if (!day || !month) return null;
  return { day, month, year, time };
};

export const formatShortDate = (value) => {
  const parts = split(value);
  if (!parts) return value ?? '—';
  return parts.time
    ? `${parts.day}.${parts.month} ${parts.time}`
    : `${parts.day}.${parts.month}`;
};

export const formatDay = (value) => {
  const parts = split(value);
  if (!parts) return value ?? '—';
  return `${parts.day}.${parts.month}`;
};

/** Whole minutes between two `dd.MM.yyyy HH:mm` stamps, or null if unknown. */
export const minutesBetween = (from, to) => {
  const start = toDate(from);
  const end = toDate(to);
  if (!start || !end) return null;

  const minutes = Math.round((end - start) / 60000);
  return minutes >= 0 ? minutes : null;
};

function toDate(value) {
  const parts = split(value);
  if (!parts || !parts.year) return null;

  const [hours = '0', minutes = '0'] = parts.time.split(':');
  const date = new Date(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(hours),
    Number(minutes),
  );

  return Number.isNaN(date.getTime()) ? null : date;
}
