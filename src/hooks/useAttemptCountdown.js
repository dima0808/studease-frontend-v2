import { useCallback, useEffect, useState } from 'react';
import { parseDate } from '@/utils/parseDate';

const secondsUntil = (deadline) =>
  Math.max(0, Math.round((deadline - Date.now()) / 1000));

/**
 * Runs the exam countdown locally off `endsAt` and exposes a `resync` for the
 * `TIMER` WebSocket message, which arrives roughly every 15s. `TIMER` is a
 * resync, not a tick — driving the display off message arrival would stall the
 * clock between messages and expose any clock skew between server and browser.
 *
 * Resyncing rebases the deadline onto the browser clock, so after the first
 * `TIMER` the countdown is immune to the missing timezone on `endsAt`.
 */
export const useAttemptCountdown = (endsAt) => {
  const [deadline, setDeadline] = useState(null);
  const [seconds, setSeconds] = useState(null);

  useEffect(() => {
    setDeadline(parseDate(endsAt)?.getTime() ?? null);
  }, [endsAt]);

  useEffect(() => {
    if (deadline === null) {
      setSeconds(null);
      return;
    }

    const tick = () => setSeconds(secondsUntil(deadline));
    tick();

    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, [deadline]);

  const resync = useCallback((timeLeft) => {
    setDeadline(Date.now() + timeLeft * 1000);
  }, []);

  return [seconds, resync];
};
