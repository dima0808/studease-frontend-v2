// A, B, C … Z, then AA, AB — a test with 27 options is not a real test, but the
// row must still render something.
export const answerLetter = (index) => {
  let value = '';
  let n = index;

  do {
    value = String.fromCharCode(65 + (n % 26)) + value;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);

  return value;
};
