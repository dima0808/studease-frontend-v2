/**
 * The gauge mark — four rectangles of unequal height reading as a measurement
 * gauge. It replaces the gradient wordmark everywhere: sidebar, sign-in and
 * every attempt screen. Fills `currentColor`, so the lockup sets the accent.
 */
const GaugeMark = ({ size = 20, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="currentColor"
    className={className}
    aria-hidden="true"
    style={{ display: 'block' }}
  >
    <rect x="0" y="14" width="4" height="14" />
    <rect x="8" y="7" width="4" height="21" />
    <rect x="16" y="0" width="4" height="28" />
    <rect x="24" y="10" width="4" height="18" />
  </svg>
);

export default GaugeMark;
