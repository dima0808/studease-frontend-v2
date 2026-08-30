/**
 * Every backend error shares one shape:
 * `{ status, error, message, path }`. Normalise it so callers can branch on
 * `status` without digging through axios internals.
 */
export const toApiError = (error, fallbackMessage = 'Something went wrong') => {
  const status = error?.response?.status ?? null;
  const message =
    error?.response?.data?.message || error?.message || fallbackMessage;

  return { status, message };
};
