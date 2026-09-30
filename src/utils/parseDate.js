/**
 * Server timestamps are `dd.MM.yyyy HH:mm[:ss]` in *server local time* — no
 * offset, no `Z`. There is nothing in the payload to resolve that against, so
 * we parse as browser-local and treat the result as an estimate. For the
 * countdown the estimate is corrected by the first WebSocket `TIMER` resync,
 * which carries an absolute `timeLeft`.
 */
export const parseDate = (str) => {
  if (typeof str !== 'string') return null;

  const [datePart, timePart = ''] = str.trim().split(' ');
  const [day, month, year] = datePart.split('.').map(Number);
  const [hours = 0, minutes = 0, seconds = 0] = timePart.split(':').map(Number);

  if (![day, month, year, hours, minutes, seconds].every(Number.isFinite)) {
    return null;
  }

  return new Date(year, month - 1, day, hours, minutes, seconds);
};
